const rs = require("jsrsasign");
const { getUri, getPermit, getPublicJwk, parseQrCode, validatePermit } = require("./utils");
const exampleQrCode = "0.eyJhbGciOiJFUzI1NiIsImtpZCI6IjEifQ.eyJpZCI6IlVaLVRSLTIwMjEtMS0xIiwiaWF0IjoiMjcvNS8yMDIxIiwiZXhwIjoiMzEvMS8yMDIyIiwicG4iOiJkIiwiY24iOiJkIn0.I8-dgCtal8ajgAIIaL2NLvFUboCrnIfoqz__1doK_Q1-kIoPgYbbfqm8BDfXk9INdPAUyc1R-FvQrVsgr3D2Cw";

describe("Utils", () => {
    beforeEach(() => {
        fetch.resetMocks()
    });
    it("getUri demo_uri", () => {
        const u = getUri("0", [{ code: "TR", demo_uri: "http://demo_uri", uri: "http://uri" }], "TR");
        expect(u).toBe("http://demo_uri");
    });
    it("getUri uri", () => {
        const u = getUri("1", [{ code: "TR", demo_uri: "http://demo_uri", uri: "http://uri" }], "TR");
        expect(u).toBe("http://uri");
    });
    it("getPermit", () => {
        const payload = {
            id: "TR-UZ-2021-1-1",
            iat: "03/03/2021",
            exp: "31/01/2021",
            pn: "06",
            cn: "ABC"
        }
        const permit = getPermit(payload);
        expect(permit.company_name).toBe(payload.cn);
        expect(permit.expire_at).toBe(payload.exp);
        expect(permit.id).toBe(payload.id);
        expect(permit.issued_at).toBe(payload.iat);
        expect(permit.issued_for).toBe("UZ");
        expect(permit.issuer).toBe("TR");
        expect(permit.plate_number).toBe(payload.pn);
        expect(permit.type).toBe("1");
        expect(permit.year).toBe("2021");
    });

    it("validatePermit", async () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '1' }));
        fetch.mockResponseOnce(JSON.stringify({ authorities: [{ code: "TR", demo_uri: "http://demo_uri", uri: "http://uri" }] }));
        fetch.mockResponseOnce(JSON.stringify({
            trusted_authorities: [{
                code: "UZ", keys: [{
                    "kty": "EC",
                    "crv": "P-256",
                    "x": "SWSJNOnsgtT1lRiR2MNlpj1duhKKOsxFKj7-l6WYSH0",
                    "y": "23bHUMmZMqnzTC0CTyfE-uww7w-p8w8joVehSQ0SfRU",
                    "use": "sig",
                    "kid": "1",
                    "alg": "ES256"
                }]
            }]
        }));
        fetch.mockResponseOnce(JSON.stringify({ data: '1' }))
        const r = await validatePermit(exampleQrCode);
        expect(r.ok).toBeTruthy();
    })
});