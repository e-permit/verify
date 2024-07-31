// import { Button } from "primereact/button";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router";

export default function ScannerView() {
  const navigate = useNavigate();

  async function success(result: any) {
    navigate(`/permits/${result}`);
  }

  return (
    <Scanner
      onScan={(result) => {
        if (result) {
          success(result[0].rawValue);
        }
      }}
      classNames={{ container: "h-full", video: "h-full" }}
      formats={["qr_code"]}
      styles={{
        container: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        video: {
          maxWidth: "100vw",
          maxHeight: "100vh",
        },
      }}
    ></Scanner>
  );
}
