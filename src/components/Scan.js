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
      alert(data);
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
            authority={state.authority}
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
              src={`https://www.countryflags.io/${state.authority.id}/flat/32.png`}
            />
          </IconButton>
          {state.authority.title}

          {Object.keys(state.authority).length !== 0 && (
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
              onClick={() => {
                const cred = "1:ES256:1:tr:ua:06BB2545:1600905600:1608768000:A1425687426242555:biliteral:2020:A1425687426242555:AKANLAR ULUSLAR ARASI TASIMACILIK LIMITED SIRKETI::3N8VWIJ0xrSbKvxzzU8HMaD7WhAV5kZNe5eDdk-RSbkJEY0fI9fypQM0A7b7jkOSv3EiNsehPnXdUKK8MDcAVQ";
                setPageState({ page: "result", data: cred });
                //setPageState({ page: "scan", data: "" });
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
