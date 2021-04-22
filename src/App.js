import React, { useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import PermitView from "./PermitView";
import { validatePermit } from "./utils";

function App() {
  const [jwsResult, setJwsResult] = useState();
  const [locale, setLocale] = useState();
  async function verifyPermit() {
    var url = window.location.pathname;
    const jws = url.substring(url.lastIndexOf('/') + 1);
    const res = await validatePermit(jws);  
    setLocale(res.locale);
    setJwsResult(res.result);
  }
  useEffect(() => verifyPermit(), []);

  if (!jwsResult) {
    return <CircularProgress />;
  } else if (jwsResult.isValid) {
    return <PermitView permit={jwsResult.permit} locale={locale} />;
  } else {
    return (
      <Alert severity="error">
        {locale[jwsResult.errorCode + "_message"]}
      </Alert>
    );
  }
}

export default App;
