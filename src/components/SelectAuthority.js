//import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
//import CropFreeIcon from "@material-ui/icons/CropFree";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import { AppContext } from "../context";

const authorities = [
  {
    id: "tr",
    uri: "/verify/tr.json",
    title: "Türkiye"
  },
  {
    id: "ua",
    uri: "/verify/ua.json",
    title: "Ukraine"
  }
];

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
  grow: {
    flexGrow: 1
  }
}));

export default function SelectAuthority() {
  const classes = useStyles();
  const { dispatch } = React.useContext(AppContext);
  return (
    <Paper square className={classes.paper}>
      <Typography className={classes.text} variant="h5" gutterBottom>
        Authorities
      </Typography>
      <List className={classes.list}>
        <ListSubheader className={classes.subheader}>
          -- Select Authority --
        </ListSubheader>
        {authorities.map(({ id, uri, title }) => (
          <React.Fragment key={id}>
            <ListItem
              button
              onClick={async () => {
                if (uri) {
                  const res = await fetch(uri);
                  let authority = await res.json();
                  dispatch({
                    type: "login",
                    authority: authority
                  });
                }
              }
              }
            >
              <ListItemAvatar>
                <Avatar
                  alt="Flag"
                  src={`https://www.countryflags.io/${id}/flat/64.png`}
                />
              </ListItemAvatar>
              <ListItemText primary={title} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>{" "}
    </Paper>
  );
}
