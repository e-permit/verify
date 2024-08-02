import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { verifyPermit } from "../utils";
import PermitDetails from "./PermitDetails";

export default function PermitView() {
  const { qrCode } = useParams();
  const [result, setResult] = useState<any>(undefined);
  useEffect(() => {
    const verify = async () => {
      const data = await verifyPermit(qrCode!);
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
      return <>Invalid Key </>;
    } else if (result.errorCode === "invalid_signature") {
      return <>Invalid Signature...</>;
    } else {
      return <>Unknown Error
      <br />
      result: {JSON.stringify(result)}</>;
    }
  }
}
