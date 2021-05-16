import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ReactModal from "react-modal";
import NotificationForm from "./NotificationForm";

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
  const [isFinish, setIsFinish] = useState(false);
  const data = {
    id: 3,
    name: "101",
    slug: "101",
    number_now: 5,
    typeroom: {
      id: 1,
      name: "Type 1",
      price: 200000,
      number_max: 8,
      slug: "type-1",
    },
    area: {
      id: 1,
      name: "A",
      slug: "a",
    },
    status: "F",
    created_at: "2021-03-15T14:40:15.339962Z",
    last_update: "2021-03-18T15:36:20.411397Z",
  };
 
  const isFull = data.number_now === data.typeroom.number_max;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "10%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const handleClick = () => {
    setIsModalVisible(true);
  };
  return (
    <div className={classes.root}>
     
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Tên Phòng
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ fontSize: "24px" }}>
            {`${data.area.name}${data.name}`}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Khu
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ fontSize: "24px" }}>
            {data.area.name}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Loại Phòng
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ fontSize: "24px" }}>
            {data.typeroom.name}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Giá phòng
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ fontSize: "24px" }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(data.typeroom.price)}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Số người hiện tại
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ fontSize: "24px" }}>
            {`${data.number_now}/${data.typeroom.number_max}`}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Tình trạng
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ fontSize: "24px", color: isFull ? "orange" : "blue" }}
          >
            {isFull ? "Đã đủ người" : "Vẫn còn chỗ"}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Tiền điện nước
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{ fontSize: "24px", color: isFinish ? "green" : "red" }}
          >
            {isFinish ? "Đã hoàn thành" : "Chưa hoàn thành"}
          </Paper>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "end" }}>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Gửi thông báo
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" disabled={isFinish}>
            Đóng tiền
          </Button>
        </Grid>
        <ReactModal
          isOpen={isModalVisible}
          onRequestClose={hideModal}
          style={customStyles}
        >
          <NotificationForm />
        </ReactModal>
      </Grid>
    </div>
  );
}
