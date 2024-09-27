# E-Permit Verification


## Flow
1. Click on the “Scan” button on the main screen of the app.
2. If permissions to access the camera have been granted, the camera is turned on and the QR code is scanned.
3. When the scan is complete, the app reads the QR code and retrieves the schema to validate its format. The QR code is validated against the schema.
4. The app retrieves the permission data from the QR code.
5. The app attempts to verify the permission by sending a request to the URL of the organization granting the permission.
6. If the verification request succeeds, the permit details are displayed.
7. If the request fails, an error message is shown indicating problems such as permission not found or connectivity issues.


## Online Verification

The online verification process consists of specific steps to verify the permit information. First, an HTTP GET request is made via ` issuer.url ` using the QR code. If the request is successful, the permit data is retrieved in JSON format and checked for validity. If an error occurs during the request, for example if the network connection is lost or the server cannot be accessed, the result is returned with the appropriate error codes. For example, the error code ` permit_not_found ` is returned if the permit data cannot be retrieved, or ` invalid_format ` if there is a format error or validation problem. This is done to verify that the permit contains valid and correct information.

## Offline Verification

During the internet connection check, the ` verifyPermit ` function sends a fetch request to the specified URL to get the permit information. If an error occurs during this request - for example, if there is no network connection or the server is unreachable - a catch block is entered and the offline variable is set to true. In this case, the permit data is assigned directly to ` permitData `. For offline validation, the validity of the `JWS (JSON Web Signature)` is checked. The public ` JWK (JSON Web Key) ` information is retrieved from the issuer using the ` getPublicJwk ` function and this key is converted into a key object with the ` rs.KJUR.jws.JWS.verify ` function. Then, the validity of the JWS is verified using the ` rs.KJUR.jws.JWS.verify ` function. If the signature is valid, the permit data is returned with additional information (e.g. ` issuer_name `, ` issued_for_name `, ` permit_type_name `). However, if the JWS validation fails, an ` invalid_signature ` error is returned.

