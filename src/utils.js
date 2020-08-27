import Ajv from "ajv";
import * as schema from "./schema.json";
const rs = require("jsrsasign");
const base64url = require("base64-url");
const ajv = new Ajv();
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

export async function getCredential(cred, authority, revocations) {
  const arr = cred.split(".");
  const version = arr[0];
  if (version === "v1") {
    const jws = arr[1] + "." + arr[2] + "." + arr[3];
    const header = JSON.parse(base64url.decode(arr[1]));
    const payload = JSON.parse(base64url.decode(arr[2]));
    const validate = ajv.compile(schema);
    const valid = validate({ header: header, payload: payload, sig: arr[3] });
    if (!valid) {
      alert(JSON.stringify(validate.errors));
      return { isValid: false, errorCode: "invalid_cred" };
    }
    if (!(payload.aud === authority.id || payload.iss === authority.id)) {
      return { isValid: false, errorCode: "invalid_aud" };
    }
    const clockTimestamp = Math.floor(Date.now() / 1000);
    if (clockTimestamp >= payload.exp) {
      return { isValid: false, errorCode: "invalid_exp" };
    }
    const issuer = authority.authorities.find((x) => x.id === payload.iss);
    if (!issuer || Object.keys(issuer).length === 0) {
      return { isValid: false, errorCode: "iss_notfound" };
    }
    const publicJwk = issuer.keys.find((x) => x.kid === header.kid);
    if (!publicJwk || Object.keys(publicJwk).length === 0) {
      return { isValid: false, errorCode: "jwk_notfound" };
    }
    const pubKey = rs.KEYUTIL.getKey(publicJwk);
    const isValid = rs.KJUR.jws.JWS.verify(jws, pubKey, [header.alg]);
    if (!isValid) {
      return { isValid: false, errorCode: "invalid_signature" };
    }
    if (revocations.some((x) => x.cid === payload.cid)) {
      return { isValid: false, errorCode: "revoked_cred" };
    }
    const convertedCred = convertPayload(payload, authority);
    return { isValid: true, cred: convertedCred };
  }
  throw Error("Version is not supported");
}
/*export async function getCredential(encodedCred, authority, revocations) {
  const cred = decodeCred(encodedCred);
  var validate = ajv.compile(schema);
  var valid = validate(cred);
  if (!valid) {
    alert(JSON.stringify(validate.errors));
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
  const sigBase64 = base64url.encode(cred.sig, "binary");
  const sJws = `${headerBase64}.${payloadBase64}.${sigBase64}`;
  const isValid = rs.KJUR.jws.JWS.verify(sJws, pubKey, [cred.header.alg]);
  if (!isValid) {
    return { isValid: false, errorCode: "invalid_signature" };
  }
  if (revocations.some((x) => x.cred_id === cred.payload.cred_id)) {
    return { isValid: false, errorCode: "revoked_cred" };
  }
  const convertedCred = convertPayload(cred.payload, authority);
  return { isValid: true, cred: convertedCred };
}


export function decodeCred(credStr) {
  const cred = { header: {}, payload: {} };
  cred.header.alg = "ES256";
  cred.header.kid = credStr.substring(1, 2);
  cred.sig = credStr.substring(2, 66);
  cred.payload.iss = credStr.substring(66, 68);
  cred.payload.aud = credStr.substring(68, 70);
  cred.payload.iat = credStr.substring(70, 80);
  cred.payload.exp = credStr.substring(80, 90);
  cred.payload.cid = credStr.substring(90, 100);
  cred.payload.ct = credStr.substring(100, 101);
  cred.payload.cy = credStr.substring(101, 105);
  const decoded = credStr.substring(105).split(":");
  cred.payload.sub = decoded[0];
  cred.payload.oid = decoded[1];
  if (decoded[2]) {
    cred.payload.on = decoded[2];
  }
  if (decoded[3]) {
    cred.payload.res = decoded[3];
  }
  return cred;
}*/


