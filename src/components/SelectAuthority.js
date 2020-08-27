//import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
//import CropFreeIcon from "@material-ui/icons/CropFree";
import React, { useEffect, useState } from "react";
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

const URL = process.env.AUTHORITIES_URL || "https://e-permit.github.io/demo/authorities.json";

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
  const [authorities, setAuthorities] = useState([]);
  const { dispatch } = React.useContext(AppContext);

  useEffect(() => {
    async function fetchAuthorities() {
      const res = await fetch(URL);
      const result = await res.json();
      setAuthorities(result.authorities);
    }
    fetchAuthorities();
  }, [])
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
