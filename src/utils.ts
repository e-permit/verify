import Ajv from "ajv";
import rs from "jsrsasign";

const ajv = new Ajv();

export async function verifyPermit(qrCode: string) {
  const schemaRes = await fetch("/verify/schema.json");
  const schema = await schemaRes.json();
  const parseQrCodeResult = parseQrCode(qrCode, schema);
  if (!parseQrCodeResult.ok) {
    return { ok: false, errorCode: "invalid_format" };
  }

  const { header, payload, jws } = parseQrCodeResult;

  const permitData = getPermit(payload);

  const authoritiesRes = await fetch("/verify/authorities.json");
  const authorities = await authoritiesRes.json();
  const configRes = await fetch("/verify/config.json");
  const config = await configRes.json();
  const issuer = authorities[permitData.issuer];
  let permit = undefined;
  let offline = false;
  try {
    const permitRes = await fetch(`${getUri(issuer)}/verify/${qrCode}`);
    console.log(permitRes);
    if (permitRes.ok) {
      permit = await permitRes.json();
    } else {
      return { ok: false, errorCode: "permit_not_found" };
    }
  } catch {
    (offline = true), (permit = permitData);
    const publicJwkResult = await getPublicJwk(getUri(issuer), header.kid);
    if (!publicJwkResult.ok) {
      return { ok: false, errorCode: "invalid_key" };
    }
    const pubKey = rs.KEYUTIL.getKey(publicJwkResult.jwk);
    try {
      const isValid = rs.KJUR.jws.JWS.verify(jws, pubKey as rs.RSAKey, [
        header.alg,
      ]);
      if (!isValid) {
        return { ok: false, errorCode: "invalid_signature" };
      }
    } catch (err) {
      console.error("verification error:", err);
    }
  }

  permit.issuer_name = issuer.name;
  permit.issued_for_name = authorities[permitData.issued_for].name;
  permit.permit_type_name = config["permit-types"][permit.permit_type.toString()];

  return { ok: true, offline, permit };
}

export function parseQrCode(qrCode: string, schema: any) {
  const arr = qrCode.split(".");
  const header = JSON.parse(base64url_decode(arr[0]));

  const payload = JSON.parse(base64url_decode(arr[1]));

  const validate = ajv.compile(schema);
  const valid = validate({
    header: header,
    payload: payload,
    sig: arr[2],
  });

  if (!valid) {
    console.error("Validation error", validate.errors);
    return { ok: false };
  }
  return {
    ok: true,
    payload: payload,
    header: header,
    jws: `${arr[0]}.${arr[1]}.${arr[2]}`,
  };
}

export async function getPublicJwk(url: string, kid: string) {
  const configRes = await fetch(url);
  const config = await configRes.json();
  const publicKey = config.keys.find((x: any) => x.kid === kid);
  if (!publicKey) {
    return { ok: false };
  }
  return { ok: true, jwk: publicKey };
}

export function getPermit(payload: any) {
  const claims = payload.id.split("-");
  const permit = {
    id: payload.id,
    issuer: claims[0],
    issued_for: claims[1],
    permit_year: claims[2],
    permit_type: claims[3],
    issued_at: payload.iat,
    expires_at: payload.exp,
    plate_number: payload.pn,
    company_name: payload.cn,
  };
  return permit;
}

export function getUri(authority: any) {
  return process.env.NODE_ENV === "development"
    ? authority["test-url"]
    : authority["prod-url"];
}

function base64url_decode(value: string): string {
  const m = value.length % 4;
  return atob(
    value
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(value.length + (m === 0 ? 0 : 4 - m), "=")
  );
}
