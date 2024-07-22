import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function Scan() {
    const [scanResult, setScanResult] = useState<string | null>(null);

    useEffect(() => {
        const config = {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        };
        const scanner = new Html5QrcodeScanner('reader', config , false);

        let isScanning = true;

        scanner.render(success, error);

        function success(result: any) {
            if (isScanning) {
                scanner.clear();
                setScanResult(result);
                isScanning = false; 
            }
        }

        function error(err: any) {
            console.warn(err);
        }
    }, []);

    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">QR Scanning Code</h1>
            {scanResult ? (
                <div>
                    <p>Success: <a href={scanResult}>{scanResult}</a></p>
                </div>
            ) : (
                <div>
                    <div id="reader"></div>
                </div>
            )}
        </div>
    );
}