import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import "./styles.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
export default function DetailRoom() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Tên Phòng</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>A102</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Loại Phòng</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Phòng Thường</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
