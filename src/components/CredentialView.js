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
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemText
          primary={
            <Alert severity="success">
              {props.authority.titles.valid_signature_message}
            </Alert>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={props.authority.titles.iss}
          secondary={
            <div className={classes.root}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item>
                  <img
                    alt="Flag"
                    src={`https://www.countryflags.io/${props.cred.issuer_code}/flat/32.png`}
                  />
                </Grid>
                <Grid item>{props.cred.issuer_name}</Grid>
              </Grid>
            </div>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={props.authority.titles.aud}
          secondary={
            <div className={classes.root}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item>
                  <img
                    alt="Flag"
                    src={`https://www.countryflags.io/${props.cred.verifier_code}/flat/32.png`}
                  />
                </Grid>
                <Grid item>{props.cred.verifier_name}</Grid>
              </Grid>
            </div>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={props.authority.titles.iat}
          secondary={<div className={classes.root}>{props.cred.iatDate}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={props.authority.titles.exp}
          secondary={<div className={classes.root}>{props.cred.expDate}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={props.authority.titles.sub}
          secondary={<div className={classes.root}>{props.cred.sub}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={props.authority.titles.ct}
          secondary={<div className={classes.root}>{props.cred.cred_type}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={props.authority.titles.cy}
          secondary={<div className={classes.root}>{props.cred.cred_year}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={props.authority.titles.cid}
          secondary={<div className={classes.root}>{props.cred.cred_id}</div>}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText
          primary={props.authority.titles.oid}
          secondary={<div className={classes.root}>{props.cred.org_id}</div>}
        />
      </ListItem>

      {props.cred.org_name && (
        <React.Fragment>
          {" "}
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary={props.authority.titles.on}
              secondary={
                <div className={classes.root}>{props.cred.org_name}</div>
              }
            />
          </ListItem>
        </React.Fragment>
      )}
      {props.cred.restrictions && (
        <React.Fragment>
          {" "}
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary={props.authority.titles.res}
              secondary={
                <div className={classes.root}>{props.cred.restrictions}</div>
              }
            />
          </ListItem>
        </React.Fragment>
      )}
    </List>
  );
}
