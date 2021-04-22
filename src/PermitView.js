import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Flags from "./Flags";
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

export default function CredentialView({permit, locale}) {
    console.log(permit);
    const classes = useStyles();
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
                    primary={locale.issuer_label}
                    secondary={
                        <div className={classes.root}>
                            <Grid container alignItems="center" spacing={3}>
                                <Grid item>
                                    <Flags code={permit.issuer} />
                                </Grid>
                                <Grid item>{locale["authority_name_" + permit.issuer]}</Grid>
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
                                <Flags code={permit.issued_for} />
                                </Grid>
                                <Grid item>{locale["authority_name_" + permit.issued_for]}</Grid>
                            </Grid>
                        </div>
                    }
                />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText
                    primary={locale.issued_at_label}
                    secondary={<div className={classes.root}>{new Date(permit.issued_at * 1000).toLocaleDateString()}</div>}
                />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText
                    primary={locale.plate_number_label}
                    secondary={<div className={classes.root}>{permit.plate_number}</div>}
                />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText
                    primary={locale.permit_type_label}
                    secondary={<div className={classes.root}>{locale["permit_type_" + permit.permit_type + "_text"]}</div>}
                />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText
                    primary={locale.permit_year_label}
                    secondary={<div className={classes.root}>{permit.permit_year}</div>}
                />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText
                    primary={locale.serial_number_label}
                    secondary={<div className={classes.root}>{permit.serial_number}</div>}
                />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText
                    primary={locale.company_name_label}
                    secondary={<div className={classes.root}>{permit.company_name}</div>}
                />
            </ListItem>
        </List>
    );
}
