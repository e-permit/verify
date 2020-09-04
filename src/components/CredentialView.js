import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`
  }
}));

export default function CredentialView(props) {
  const classes = useStyles();
  const  locale = props.locale;
  const {
    exp,
    iat,
    iss,
    aud,
    sub,
    cid,
    ct,
    cy,
    comid,
    comn,
    res
  } = props.cred;
  const iatDate = new Date(iat * 1000).toLocaleDateString();
  const expDate = new Date(exp * 1000).toLocaleDateString();
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemText
          primary={
            <Alert severity="success">
              {locale.valid_signature_message}
            </Alert>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={locale.iss_label}
          secondary={
            <div className={classes.root}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item>
                  <img
                    alt="Flag"
                    src={`https://www.countryflags.io/${iss}/flat/32.png`}
                  />
                </Grid>
                <Grid item>{locale["authority_name_" + iss]}</Grid>
              </Grid>
            </div>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={locale.aud_label}
          secondary={
            <div className={classes.root}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item>
                  <img
                    alt="Flag"
                    src={`https://www.countryflags.io/${aud}/flat/32.png`}
                  />
                </Grid>
                <Grid item>{locale["authority_name_" + aud]}</Grid>
              </Grid>
            </div>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={locale.iat_label}
          secondary={<div className={classes.root}>{iatDate}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={locale.exp_label}
          secondary={<div className={classes.root}>{expDate}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={locale.sub_label}
          secondary={<div className={classes.root}>{sub}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={locale.ct_label}
          secondary={<div className={classes.root}>{locale["ct_" + ct + "_text"]}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={locale.cy_label}
          secondary={<div className={classes.root}>{cy}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={locale.cid_label}
          secondary={<div className={classes.root}>{cid}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={locale.comid_label}
          secondary={<div className={classes.root}>{comid}</div>}
        />
      </ListItem>

      {comn && (
        <React.Fragment>
          {" "}
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary={locale.comn_label}
              secondary={
                <div className={classes.root}>{comn}</div>
              }
            />
          </ListItem>
        </React.Fragment>
      )}
      {res && (
        <React.Fragment>
          {" "}
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary={locale.res_label}
              secondary={
                <div className={classes.root}>{res}</div>
              }
            />
          </ListItem>
        </React.Fragment>
      )}
    </List>
  );
}
