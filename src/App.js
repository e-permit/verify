import React, { useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import PermitView from "./PermitView";
import { validatePermit } from "./utils";

function App() {
  const [permit, setPermit] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [locale, setLocale] = useState();
  async function verifyPermit() {
    try {
      const jws = window.location.hash.substring(1);
      const res = await validatePermit(jws);
      if(res.ok){
        setLocale(res.locale);
        setPermit(res.permit);
      }else{
        setError(res.errorCode);
      }
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
      setError("An error has occured");
    }
  }
  useEffect(() => verifyPermit(), []);

  if (loading) {
    return <CircularProgress />;
  } else if (permit) {
    return <PermitView permit={permit} locale={locale} />;
  } else {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }
}

export default App;
