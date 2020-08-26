const rs = require("jsrsasign");
const { getCredential, decodeCred } = require("./utils");
const base64url = require("base64-url");
const privateJwk = {
     
};
const p = {
  iss: "ua",
  aud: "tr",
  sub: "92BB2722",
  exp: 1602288000,
  iat: 1602287000,
  ct: "biliteral",
  cid: "1111111111111111111111111",
  cy: "2020",
  oid: "1111111111111111111111111",
  on: "ABC ORG ssk",
  res: "aa"
};
const h = {
  alg: "ES256",
  kid: "1"
};

const authority = {
  id: "tr",
  title: "Türkiye Cumhuriyeti",
  titles: {
    iss: "Belgeyi Veren Ülke",
    aud: "Doğrulayan Ülke ",
    sub: "Plaka",
    iat: "Düzenleme Tarihi",
    exp: "Geçerlilik Tarihi",
    ct: "Belge Tipi",
    cy: "Belge Yılı",
    cid: "Belge Seri No",
    oid: "Firma No",
    on: "Firma Adı",
    res: "Kısıtlamalar",
    invalid_signature_message: "İmza geçerli değil, kontrol edin!",
    valid_signature_message: "İmza geçerli",
    ct_biliteral: "İki taraflı",
    ct_tarnsit: "Transit Geçiş",
    ct_3rdcountry: "Üçüncü Ülke"
  },
  authorities: [
    {
      id: "ua",
      title: "Ukrayna",
      keys: [
        {
          kty: "EC",
          use: "sig",
          kid: "1",
          crv: "P-256",
          x: "oPmyssan_NrAlsAEuFig2FdwJmWtnfsso2rfN3wclC8",
          y: "Sw5kgoB7fgQq7AYn7vRzOyG-g7___cp-4BHbzBQNCEU",
          alg: "ES256"
        }
      ]
    },
    {
      id: "tr",
      title: "Türkiye Cumhuriyeti",
      keys: [
        {
          kty: "EC",
          use: "sig",
          kid: "1",
          crv: "P-256",
          x: "kKUBDGuy-smxA6omYlXBotSzPVB6qKI2jRe1x9U4_kE",
          y: "5q8JKBbFoiNuDDibs7h5zIohNvDiG70UJKq4E4n51Kg",
          alg: "ES256"
        }
      ]
    }
  ]
};

function encodeJwt(jwt) {
  const parsedJwt = jwt.split(".");
  const header = JSON.parse(base64url.decode(parsedJwt[0]));
  const payload = JSON.parse(base64url.decode(parsedJwt[1]));
  const sig = parsedJwt[2];
  var credStr = "1";
  credStr += ":" + header.alg;
  credStr += ":" + header.kid;
  credStr += ":" + payload.iss;
  credStr += ":" + payload.aud;
  credStr += ":" + payload.sub;
  credStr += ":" + payload.iat;
  credStr += ":" + payload.exp;
  credStr += ":" + payload.cid;
  credStr += ":" + payload.ct;
  credStr += ":" + payload.cy;
  credStr += ":" + payload.oid;
  credStr += ":" + sig;
  return credStr;
}
describe("Utils", () => {
  beforeEach(async () => {
  });
  it("Encode decode test", async () => {
    
    /*const key = rs.KEYUTIL.getKey(privateJwk);
    var sJWS = rs.KJUR.jws.JWS.sign(
      "ES256",
      JSON.stringify({ alg: "ES256", kid: "1" }),
      JSON.stringify(p),
      key
    );
    const cred = {
      header: h,
      payload: p,
      sig: sJWS.split(".")[2]
    };*/
    
    const cred = "1:ES256:1:tr:ua:06BB2545:1600905600:1608768000:A1425687426242555:biliteral:2020:A1425687426242555:AKANLAR ULUSLAR ARASI TASIMACILIK LIMITED SIRKETI::QyHj-hBjzLKAShccaPUGI-284hIpRAScpukhn0JIwVUCAHRDWR8Vkkm6pJTEGR1IxPF4MwfYdjWwYkau--Ds0Q";
    const r = await getCredential(cred, authority, []);

  });
});


