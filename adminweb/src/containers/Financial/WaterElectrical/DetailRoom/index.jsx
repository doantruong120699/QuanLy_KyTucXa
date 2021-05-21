import React, { useEffect, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { makeStyles } from "@material-ui/core/styles";
import ReactModal from "react-modal";
import NotificationForm from "./NotificationForm";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PlusIcon from "@material-ui/icons/AddBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
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
function ShowBill({ selectedMonth, selectedYear, area, room }) {
  const classes = useStyles();
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
  const [dataSend, setDataSend] = useState({
    area: area,
    room: room,
    newElectricalNumber: 0,
    oldElectricalNumber: 0,
    newWaterNumber: 0,
    oldWaterNumber: 0,
    month: selectedMonth,
    year: selectedYear,
    waterUnitPrice: 0,
    electricalUnitPrice: 0,
    waterPrice: 0,
    electricalPrice: 0,
    total: 0,
    createdDate: new Date(),
    description: "",
  });
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
  useEffect(() => {
    if (
      dataSend.newElectricalNumber !== 0 &&
      dataSend.oldElectricalNumber !== 0 &&
      dataSend.electricalUnitPrice !== 0
    ) {
      console.log("vo vong if");
      setDataSend({
        ...dataSend,
        electricalPrice:
          dataSend.electricalUnitPrice *
          (dataSend.newElectricalNumber - dataSend.oldElectricalNumber),
      });
    }
  }, [
    dataSend.newElectricalNumber,
    dataSend.electricalUnitPrice,
    dataSend.oldElectricalNumber,
  ]);
  useEffect(() => {
    if (
      dataSend.newWaterNumber !== 0 &&
      dataSend.oldWaterNumber !== 0 &&
      dataSend.waterUnitPrice !== 0
    ) {
      console.log("vo vong if");
      setDataSend({
        ...dataSend,
        waterPrice:
          dataSend.waterUnitPrice *
          (dataSend.newWaterNumber - dataSend.oldWaterNumber),
      });
    }
  }, [
    dataSend.newWaterNumber,
    dataSend.oldWaterNumber,
    dataSend.waterUnitPrice,
  ]);

  useEffect(() => {
    if (dataSend.electricalPrice !== 0 && dataSend.waterPrice !== 0) {
      setDataSend({
        ...dataSend,
        total: dataSend.electricalPrice + dataSend.waterPrice,
      });
    }
  }, [dataSend.electricalPrice, dataSend.waterPrice]);
  const handleClick = () => {};
  const handleChange = async (event) => {
    const id = event.target.id;
    const data = event.target.value;
    console.log("name", id, "data", data);
    setDataSend({ ...dataSend, [id]: data });
  };
  console.log("AAAAAAA", dataSend.month, "BBBBBBBB", dataSend.year);
  return (
    <div className={classes.root}>
      <Box display="flex">
        <Box marginBottom={3} marginRight={3}>
          <TextField
            id="year"
            label="Năm"
            variant="outlined"
            onChange={handleChange}
            size="small"
            type="number"
            defaultValue={`${dataSend.year}`}
            disabled
            className={"cmp-input-disabled"}
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            label="Tháng"
            id={"month"}
            defaultValue={`${dataSend.month}`}
            variant="outlined"
            onChange={handleChange}
            size="small"
            disabled
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box marginBottom={3} marginRight={3}>
          <TextField
            label="Khu"
            id={"area"}
            defaultValue={`${dataSend.area}`}
            variant="outlined"
            onChange={handleChange}
            size="small"
            disabled
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            label="Phòng"
            id={"room"}
            defaultValue={`${dataSend.room}`}
            variant="outlined"
            onChange={handleChange}
            size="small"
            disabled
          />
        </Box>
      </Box>

      <Box display="flex">
        <Box marginBottom={3} marginRight={3}>
          <TextField
            id="oldElectricalNumber"
            label="Số điện cũ"
            InputProps={{
              inputProps: {
                min: 1,
                step: 1,
              },
            }}
            value={`${dataSend.oldElectricalNumber}`}
            onChange={handleChange}
            variant="outlined"
            size="small"
            type="number"
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            label="Số nước cũ"
            id={"oldWaterNumber"}
            value={`${dataSend.oldWaterNumber}`}
            variant="outlined"
            onChange={handleChange}
            size="small"
            type="number"
            InputProps={{
              inputProps: {
                min: 1,
                step: 1,
              },
            }}
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box marginBottom={3} marginRight={3}>
          <TextField
            id="newElectricalNumber"
            label="Số điện mới"
            InputProps={{
              inputProps: {
                min: dataSend.oldElectricalNumber,
                step: 1,
              },
            }}
            value={`${dataSend.newElectricalNumber}`}
            onChange={handleChange}
            variant="outlined"
            size="small"
            type="number"
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            label="Số nước mới"
            id="newWaterNumber"
            type="number"
            value={`${
              dataSend.newWaterNumber !== 0
                ? dataSend.newWaterNumber
                : dataSend.oldWaterNumber
            }`}
            variant="outlined"
            onChange={handleChange}
            size="small"
            InputProps={{
              inputProps: {
                min: dataSend.oldWaterNumber,
                step: 1,
              },
            }}
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box marginBottom={3} marginRight={3}>
          <TextField
            id="electricalUnitPrice"
            label="Giá tiền điện/Số"
            InputProps={{
              inputProps: {
                min: 1000,
                step: 500,
              },
            }}
            value={`${dataSend.electricalUnitPrice}`}
            onChange={handleChange}
            variant="outlined"
            size="small"
            type="number"
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            label="Giá tiền nước/Khối"
            id={"waterUnitPrice"}
            value={`${dataSend.waterUnitPrice}`}
            variant="outlined"
            onChange={handleChange}
            size="small"
            type="number"
            InputProps={{
              inputProps: {
                min: 1000,
                step: 500,
              },
            }}
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box marginBottom={3} marginRight={3}>
          <TextField
            id="electricalPrice"
            label="Tiền điện"
            InputProps={{
              inputProps: {
                min: 1000,
                step: 500,
              },
            }}
            value={`${dataSend.electricalPrice}`}
            onChange={handleChange}
            variant="outlined"
            size="small"
            type="number"
            disabled
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            label="Tiền nước"
            id={"waterUnitPrice"}
            value={`${dataSend.waterPrice}`}
            variant="outlined"
            onChange={handleChange}
            size="small"
            type="number"
            disabled
            InputProps={{
              inputProps: {
                min: 1000,
                step: 500,
              },
            }}
          />
        </Box>
      </Box>
      <Box display="flex" marginTop={5}>
        <Box marginBottom={3} marginRight={3} style={{ color: "red" }}>
          <TextField
            id="total"
            label="Tổng tiền"
            value={`${dataSend.electricalPrice}`}
            onChange={handleChange}
            style={{ color: "red" }}
            variant="outlined"
            size="big"
            type="number"
            disabled
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            label="Chi tiết"
            id={"description"}
            value={`${dataSend.description}`}
            variant="outlined"
            onChange={handleChange}
            style={{ color: "red" }}
            size="big"
            placeholder="Chi tiết"
          />
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          style={{ left: "25%" }}
          startIcon={<CancelPresentationIcon></CancelPresentationIcon>}
        >
          Huỷ
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          style={{ left: "35%" }}
          startIcon={<PlusIcon></PlusIcon>}
        >
          Tạo hoá đơn
        </Button>
      </Box>

      <ReactModal
        isOpen={isModalVisible}
        onRequestClose={hideModal}
        style={customStyles}
      >
        <NotificationForm />
      </ReactModal>
    </div>
  );
}
export default ShowBill;
