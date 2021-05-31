import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Grid, Paper, Typography } from "@material-ui/core";
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
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}));

export default function CredentialView({ permit, locale }) {
    const classes = useStyles();
    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h4" variant="h5" align="center">
                    E-PERMIT VERIFICATION
                </Typography>
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
                                            <img src={`/verify/flags/${permit.issuer.toLowerCase()}.svg`}  width="40" height="25" />
                                        </Grid>
                                        <Grid item>{locale["authority_name_" + permit.issuer.toLowerCase()]}</Grid>
                                    </Grid>
                                </div>
                            }
                        />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText
                            primary={locale.issued_for_label}
                            secondary={
                                <div className={classes.root}>
                                    <Grid container alignItems="center" spacing={3}>
                                        <Grid item>
                                            <img src={`/verify/flags/${permit.issued_for.toLowerCase()}.svg`}  width="40" height="25" />
                                        </Grid>
                                        <Grid item>{locale["authority_name_" + permit.issued_for.toLowerCase()]}</Grid>
                                    </Grid>
                                </div>
                            } />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText
                            primary={locale.issued_at_label}
                            secondary={<div className={classes.root}>{permit.issued_at}</div>}
                        />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText
                            primary={locale.expire_at_label}
                            secondary={<div className={classes.root}>{permit.expire_at}</div>}
                        />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText
                            primary={locale.permit_id_label}
                            secondary={<div className={classes.root}>{permit.id}</div>}
                        />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText
                            primary={locale.permit_type_label}
                            secondary={<div className={classes.root}>{locale["permit_type_" + permit.type + "_text"]}</div>}
                        />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText
                            primary={locale.permit_year_label}
                            secondary={<div className={classes.root}>{permit.year}</div>}
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
                            primary={locale.company_name_label}
                            secondary={<div className={classes.root}>{permit.company_name}</div>}
                        />
                    </ListItem>
                </List>
            </Paper>
        </main>
    );
}
