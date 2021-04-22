const rs = require("jsrsasign");
const base64url = require("base64-url");
const AUTHORITIES_URL = "/verify/authorities.json";

export async function validatePermit(jws) {
    const arr = jws.split(".");
    const header = JSON.parse(base64url.decode(arr[0]));
    const payload = base64url.decode(arr[1]);
    const claims = payload.split("#");
    const permit = {
        issuer: claims[0],
        issued_for: claims[1],
        permit_year: claims[2],
        permit_type: claims[3],
        permit_id: claims[4],
        issued_at: claims[5],
        plate_number: claims[6],
        company_name: claims[7],
        serial_number: `${claims[0].toUpperCase()}-${claims[1].toUpperCase()}-${claims[2]}-${claims[3]}-${claims[4]}`
    }
    const res = await fetch(AUTHORITIES_URL);
    const authoritiesResult = await res.json();
    const AUD_URI = authoritiesResult.authorities.find((x) => x.code === permit.issued_for).uri;
    const audRes = await fetch(AUD_URI);
    const authority = await audRes.json();
    /*const issuer = authority.authorities.find((x) => x.code === permit.issuer);
    if (!issuer || Object.keys(issuer).length === 0) {
        return { result: { isValid: false, errorCode: "iss_notfound" }, locale: authority.locale };
    }
    const publicJwk = issuer.keys.find((x) => x.kid === header.kid);
    if (!publicJwk || Object.keys(publicJwk).length === 0) {
        return { result: { isValid: false, errorCode: "jwk_notfound" }, locale: authority.locale };
    }
    const pubKey = rs.KEYUTIL.getKey(publicJwk);
    const isValid = rs.KJUR.jws.JWS.verify(jws, pubKey, [header.alg]);
    if (!isValid) {
        return { result: { isValid: false, errorCode: "invalid_signature" }, locale: authority.locale };
    }*/
    
    return { result: { isValid: true, permit: permit }, locale: authority.locale };
}