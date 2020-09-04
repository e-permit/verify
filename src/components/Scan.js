import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import CropFreeIcon from "@material-ui/icons/CropFree";
import { AppContext } from "../context";
import QrReader from "react-qr-reader";
import ScanResult from "./ScanResult";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
}));

export default function Scan() {
  const classes = useStyles();
  const { state } = React.useContext(AppContext);
  const [pageState, setPageState] = useState({ page: "scan", data: "" });
  async function handleScan(data) {
    if (data) {
      setPageState({ page: "result", data: data });
    }
  }
  function handleError(err) {
    console.error(err);
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square variant="outlined" className={classes.paper}>
        {pageState.page === "result" ? (
          <ScanResult
            data={pageState.data}
            config={state.config}
            revocations={state.revocations}
          />
        ) : (
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          )}
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <img
              alt="Flag"
              src={`https://www.countryflags.io/${state.config.id}/flat/32.png`}
            />
          </IconButton>
          {state.config.locale["authority_name_" + state.config.id]}

          {Object.keys(state.config).length !== 0 && (
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
              onClick={() => {
                setPageState({ page: "scan", data: "" });
              }}
            >
              <CropFreeIcon />
            </Fab>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
