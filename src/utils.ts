import Ajv from "ajv"
//import rs from "jsrsasign";

const ajv = new Ajv();

export async function verifyPermit(qrCode: string) {

   
     

    const schemaRes = await fetch("/verify/schema.json");
    const schema = await schemaRes.json();

    const parseQrCodeResult = parseQrCode(qrCode, schema);
    if (!parseQrCodeResult.ok) {
        return { ok: false, errorCode: "invalid_format" };
    }

    //const { header, payload, jws } = parseQrCodeResult;
    const {  payload } = parseQrCodeResult;

    const permitData = getPermit(payload);
    const authoritiesRes = await fetch("/verify/authorities.json");
    const authorities = await authoritiesRes.json();
    const issuer = authorities[permitData.issuer];
    const issued_for = authorities[permitData.issued_for];

    const permitRes = await fetch(`${getUri(issuer)}/verify/${qrCode}` )
    const permit = await permitRes.json();
    permit.issuer = issuer.name;
    permit.issued_for = issued_for.name;
    if(permitRes.ok) {
        return { ok: true, permit };
    }
   else {
    // const publicJwkResult = getPublicJwk(authorityConfig, permit.issuer, header.kid);
    // if (!publicJwkResult.ok) {
    //     return { ok: false, errorCode: "invalid_key" };
    // }
    // const pubKey = rs.KEYUTIL.getKey(publicJwkResult.jwk);
    // const isValid = rs.KJUR.jws.JWS.verify(jws!, pubKey as rs.RSAKey, [header.alg]);
    // if (!isValid) {
    //     return { ok: false, errorCode: "invalid_signature" };
    // }
    // const locale = authorityConfig.locale || "en";
    // const localeR = await fetch(`/verify/locale/${locale}.json`);
    // const localeContent = await localeR.json();
   }
   

    
}

export function parseQrCode(qrCode: string, schema: any) {
    const arr = qrCode.split(".");
    const header = JSON.parse(base64url_decode(arr[0]));

    const payload = JSON.parse(base64url_decode(arr[1]));

    const validate = ajv.compile(schema);
    const valid = validate({
        header: header,
        payload: payload,
        sig: arr[2]
    });

    if (!valid) {
        console.log("Validation error");
        console.error(validate.errors);
        return { ok: false };
    }
    return {
        ok: true,
        payload: payload,
        header: header,
        jws: `${arr[1]}.${arr[2]}.${arr[3]}`
    };
}

export function getPublicJwk(authorityConfig: any, issuer: string, kid: string) {
    const trustedAuthority = authorityConfig.trusted_authorities
        .find((x: any) => x.code === issuer);
    if (!trustedAuthority || Object.keys(trustedAuthority).length === 0) {
        return { ok: false };
    }
    const publicKey = trustedAuthority.keys.find((x: any) => x.kid === kid);
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
        year: claims[2],
        type: claims[3],
        issued_at: payload.iat,
        expire_at: payload.exp,
        plate_number: payload.pn,
        company_name: payload.cn
    }
    return permit;
}

export function getUri(authority: any) {
    return process.env.NODE_ENV === "development" ?
        authority["test-url"]:
        authority["prod-url"];
}


function base64url_decode(value: string): string {
    const m = value.length % 4;
    return atob(
        value.replace(/-/g, '+')
            .replace(/_/g, '/')
            .padEnd(value.length + (m === 0 ? 0 : 4 - m), '=')
    );
}