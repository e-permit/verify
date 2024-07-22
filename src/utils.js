import Ajv from "ajv"
const ajv = new Ajv();
const rs = require("jsrsasign");
const base64url = require("base64-url");
const AUTHORITIES_URL = "/verify/authorities.json";

export async function validatePermit(qrCode) {
    const schemaRes = await fetch("/verify/schema.json");
    console.log(schemaRes);
    const schema = await schemaRes.json();
    const parseQrCodeResult = parseQrCode(qrCode, schema);
    if (!parseQrCodeResult.ok) {
        return { ok: false, errorCode: "invalid_format" };
    }

    const { version, header, payload, jws } = parseQrCodeResult;
    const permit = getPermit(payload);
    const authoritiesRes = await fetch(AUTHORITIES_URL);
    const authoritiesJson = await authoritiesRes.json();
    const authorities = authoritiesJson.authorities;
    const authoritiyUri = getUri(version, authorities, permit.issued_for);
    const authorityConfigRes = await fetch(authoritiyUri);
    const authorityConfig = await authorityConfigRes.json();
    const publicJwkResult = getPublicJwk(authorityConfig, permit.issuer, header.kid);
    if(!publicJwkResult.ok){
        return { ok: false, errorCode: "invalid_key" };
    }
    const pubKey = rs.KEYUTIL.getKey(publicJwkResult.jwk);
    const isValid = rs.KJUR.jws.JWS.verify(jws, pubKey, [header.alg]);
    if (!isValid) {
        return { ok: false, errorCode: "invalid_signature" };
    }
    const locale = authorityConfig.locale || "en";
    const localeR = await fetch(`/verify/locale/${locale}.json`);
    const localeContent = await localeR.json();

    return { ok: true, permit: permit, locale: localeContent, demo: version === "0" };
}

export function parseQrCode(qrCode, schema) {
    const arr = qrCode.split(".");
    const header = JSON.parse(base64url.decode(arr[1]));
    const payload = JSON.parse(base64url.decode(arr[2]));
    const validate = ajv.compile(schema);
    const valid = validate({
        version: arr[0],
        header: header,
        payload: payload,
        sig: arr[3]
    });

    if (!valid) {
        console.log("Validation error");
        console.error(validate.errors);
        return { ok: false };
    }
    return {
        ok: true,
        version: arr[0],
        payload: payload,
        header: header,
        jws: `${arr[1]}.${arr[2]}.${arr[3]}`
    };
}

export function getPublicJwk(authorityConfig, issuer, kid) {
    const trustedAuthority = authorityConfig.trusted_authorities
        .find((x) => x.code === issuer);
    if (!trustedAuthority || Object.keys(trustedAuthority).length === 0) {
        return { ok: false };
    }
    const publicKey = trustedAuthority.keys.find((x) => x.kid === kid);
    if (!publicKey) {
        return { ok: false };
    }
    return { ok: true, jwk: publicKey };
}

export function getPermit(payload) {
    const claims = payload.id.split("-");
    const permit = {
        id: payload.id,
        issuer: claims[0],
        issued_for: claims[1],
        year: claims[2],
        type: claims[3],
        issued_at: payload.iat,
        expire_at: payload.exp,
        plate_number: payload.pn,
        company_name: payload.cn
    }
    return permit;
}

export function getUri(v, authorities, issuedFor) {
    let AUD_URI;
    const aud = authorities.find((x) => x.code === issuedFor);
    if (v === "0") {
        AUD_URI = aud.demo_uri;
    } else if (v === "1") {
        AUD_URI = aud.uri;
    }
    return AUD_URI;
}
