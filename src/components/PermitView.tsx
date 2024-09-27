import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { verifyPermit } from "../utils";
import PermitDetails from "./PermitDetails";
import Alert from "./Alert";

export default function PermitView() {
  const { qrCode } = useParams();
  const [result, setResult] = useState<any>(undefined);
  useEffect(() => {
    const verify = async () => {
      const data = await verifyPermit(qrCode!);
      console.log("data", data)
      setResult(data);
    };

    verify().catch(() => {
      setResult({ ok: false });
      console.error("");
    });
  }, []);
  if (!result) {
    return <>Verifying... </>;
  } else {
    if (result.ok) {
      return <PermitDetails permit={result.permit} offline={result.offline}/>;
    } else if (result.errorCode === "invalid_key") {
      return <Alert title="INVALID KEY"/>;
    } else if (result.errorCode === "invalid_signature") {
      return <Alert title="INVALID SIGNATURE"/>;
    } else if (result.errorCode === "permit_not_found") {
      return <Alert title="PERMIT NOT FOUND"/>;
    } else {
      return <Alert title="UNKNOWN ERROR"/>;
    }
  }
}
