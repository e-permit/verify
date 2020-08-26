import React, { useEffect, useState } from "react";
import { getCredential } from "../utils";
import { Alert } from "@material-ui/lab";
import CredentialView from "./CredentialView";
import { CircularProgress } from "@material-ui/core";

export default function ScanResult(props) {
  const [state, setState] = useState();
  useEffect(() => {
    async function getResult() {
      try {
        const result = await getCredential(
          props.data,
          props.authority,
          props.revocations
        );
        setState(result);
      }
      catch (error) {
        alert(error);
      }
    }
    getResult();
  }, [props]);
  if (!state) {
    return <CircularProgress />;
  } else if (state.isValid) {
    return <CredentialView cred={state.cred} authority={props.authority} />;
  }  else {
    return (
      <Alert severity="error">
        {props.authority.titles.invalid_signature_message}
      </Alert>
    );
  }
}

/*if (state.isValid) {
    return (
      <List className={classes.root}>
        <ListItem>
          <ListItemText
            primary="Issuer"
            secondary={
              <div className={classes.root}>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item>
                    <img
                      alt="Flag"
                      src={`https://www.countryflags.io/${state.cred.issuer_code}/flat/32.png`}
                    />
                  </Grid>
                  <Grid item>{state.cred.issuer_title}</Grid>
                </Grid>
              </div>
            }
          />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText
            primary="Issuance Date"
            secondary={<div className={classes.root}>{state.cred.iatDate}</div>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Expiration Date"
            secondary={<div className={classes.root}>{state.cred.expDate}</div>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Vehicle Registration Plate"
            secondary={<div className={classes.root}>{state.cred.vrp}</div>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Organization"
            secondary={
              <div className={classes.root}>
                {state.cred.org_id}-{state.cred.org_name}
              </div>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Type - Year"
            secondary={
              <div className={classes.root}>
                {state.cred.cred_type}-{state.cred.cred_year}
              </div>
            }
          />
        </ListItem>
      </List>
    );
  }
  }*/
