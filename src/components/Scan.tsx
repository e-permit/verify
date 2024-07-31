import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Scan() {
    const navigate = useNavigate();

    useEffect(() => {
        const config = {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        };
        const scanner = new Html5QrcodeScanner('reader', config, false);
        

        let isScanning = true;

        scanner.render(success, error);

        async function success(result: any) {
            if (isScanning) {
                scanner.clear();
                navigate(`/permits/${result}`)
                isScanning = false;
            }
        }

        function error(err: any) {
            console.warn(err);
        }
    }, []);

    return (
      <div className="">
        <h1 className="text-3xl font-bold">E-PERMIT VERIFICATION</h1>
        <div>
          <div id="reader"></div>
        </div>
      </div>
    );
}