import Ajv from "ajv";
import * as schema from "./schema.json";
const rs = require("jsrsasign");
const base64url = require("base64-url");

const ajv = new Ajv();
export async function getCredential(encodedCred, authority, revocations) {
  const cred = decodeCred(encodedCred);
  console.log(JSON.stringify(cred.payload));
  console.log(JSON.stringify(cred.header));
  var validate = ajv.compile(schema);
  var valid = validate(cred);
  if (!valid) {
    console.log(validate.errors);
    return { isValid: false, errorCode: "invalid_cred" };
  }
  if (
    !(cred.payload.aud === authority.id || cred.payload.iss === authority.id)
  ) {
    return { isValid: false, errorCode: "invalid_aud" };
  }
  const clockTimestamp = Math.floor(Date.now() / 1000);
  if (clockTimestamp >= cred.payload.exp) {
    return { isValid: false, errorCode: "invalid_exp" };
  }
  const issuer = authority.authorities.find((x) => x.id === cred.payload.iss);
  if (!issuer || Object.keys(issuer).length === 0) {
    return { isValid: false, errorCode: "iss_notfound" };
  }
  const publicJwk = issuer.keys.find((x) => x.kid === cred.header.kid);
  if (!publicJwk || Object.keys(publicJwk).length === 0) {
    return { isValid: false, errorCode: "jwk_notfound" };
  }
  const pubKey = rs.KEYUTIL.getKey(publicJwk);
  const headerBase64 = base64url.encode(JSON.stringify(cred.header));
  const payloadBase64 = base64url.encode(JSON.stringify(cred.payload));
  const sigBase64 = cred.sig;
  const sJws = `${headerBase64}.${payloadBase64}.${sigBase64}`;
  const isValid = rs.KJUR.jws.JWS.verify(sJws, pubKey, [cred.header.alg]);
  if (!isValid) {
    console.log(sJws);
    return { isValid: false, errorCode: "invalid_signature" };
  }
  if (revocations.some((x) => x.cred_id === cred.payload.cred_id)) {
    return { isValid: false, errorCode: "revoked_cred" };
  }
  const convertedCred = convertPayload(cred.payload, authority);
  return { isValid: true, cred: convertedCred };
}

function convertPayload(payload, authority) {
  const iatDate = new Date(payload.iat * 1000).toLocaleDateString();
  const expDate = new Date(payload.exp * 1000).toLocaleDateString();
  const issuer = authority.authorities.find((x) => x.id === payload.iss);
  const verifier = authority.authorities.find((x) => x.id === payload.aud);
  const c = {
    iatDate,
    expDate,
    issuer_code: issuer.id,
    issuer_name: issuer.title,
    verifier_code: verifier.id,
    verifier_name: verifier.title,
    sub: payload.sub,
    cred_id: payload.cid,
    cred_type: authority.titles["ct_" + payload.ct],
    cred_year: payload.cy,
    org_id: payload.oid
  };
  if (payload.on) {
    c.org_name = payload.on;
  }
  if (payload.res) {
    c.restrictions = payload.res;
  }

  return c;
}

export function decodeCred(credStr) {
  const decoded = credStr.split(":");
  const cred = {};
  cred.header = {};
  cred.payload = {};
  cred.header.alg = decoded[1];
  cred.header.kid = decoded[2];
  cred.payload.iss = decoded[3];
  cred.payload.aud = decoded[4];
  cred.payload.sub = decoded[5];
  cred.payload.iat = decoded[6];
  cred.payload.exp = decoded[7];
  cred.payload.cid = decoded[8];
  cred.payload.ct = decoded[9];
  cred.payload.cy = decoded[10];
  cred.payload.oid = decoded[11];
  if (decoded[12]) {
    cred.payload.on = decoded[12];
  }
  if (decoded[13]) {
    cred.payload.res = decoded[13];
  }
  cred.sig = decoded[14];
  return cred;
}
