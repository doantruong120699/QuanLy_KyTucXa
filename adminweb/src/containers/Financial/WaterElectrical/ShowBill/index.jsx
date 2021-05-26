import React, { useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PlusIcon from "@material-ui/icons/AddBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createWaterElectricalIndex } from "../../../../redux/actions/financial";
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
export default function ShowBill({
  selectedMonth,
  selectedYear,
  area,
  room,
  onCancel,
}) {
  const classes = useStyles();
  const lastWaterElectrical = {
    room: room.id,
    month: selectedMonth - 1,
    year: 2021,
    new_index_eclectrical: 20,
    new_index_water: 35,
  };

  const [dataSend, setDataSend] = useState({
    room: room.id,
    new_index_eclectrical: lastWaterElectrical.new_index_eclectrical,
    new_index_water: lastWaterElectrical.new_index_water,
    month: selectedMonth,
    year: selectedYear,
    water_electrical_unit_price: 1,
  });
  const handleClickCreate = () => {
    createWaterElectricalIndex(dataSend, (output) => {
      if (output.status === "successful") {
        toast("Tạo thành công");
        setTimeout(onCancel, 1000);
      } else toast(output.notification);
    });
  };

  const handleClickCancel = () => {
    onCancel();
  };

  const handleChange = (event) => {
    const id = event.target.id;
    const data = event.target.value;
    setDataSend({ ...dataSend, [id]: parseInt(data) });
  };
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
            defaultValue={`${area}`}
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
            defaultValue={`${room.name}`}
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
            disabled
            value={`${lastWaterElectrical.new_index_eclectrical}`}
            variant="outlined"
            size="small"
            type="number"
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            label="Số nước cũ"
            id={"oldWaterNumber"}
            value={`${lastWaterElectrical.new_index_water}`}
            variant="outlined"
            size="small"
            type="number"
            disabled
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
            id="new_index_eclectrical"
            label="Số điện mới"
            InputProps={{
              inputProps: {
                min: lastWaterElectrical.new_index_eclectrical,
                step: 1,
              },
            }}
            value={`${
              dataSend.new_index_eclectrical !== 0
                ? dataSend.new_index_eclectrical
                : lastWaterElectrical.new_index_eclectrical
            }`}
            onChange={handleChange}
            variant="outlined"
            size="small"
            type="number"
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            label="Số nước mới"
            id="new_index_water"
            type="number"
            value={`${
              dataSend.new_index_water !== 0
                ? dataSend.new_index_water
                : lastWaterElectrical.new_index_water
            }`}
            variant="outlined"
            onChange={handleChange}
            size="small"
            InputProps={{
              inputProps: {
                min: lastWaterElectrical.new_index_water,
                step: 1,
              },
            }}
          />
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickCancel}
          style={{ left: "25%" }}
          startIcon={<CancelPresentationIcon></CancelPresentationIcon>}
        >
          Huỷ
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickCreate}
          style={{ left: "35%" }}
          startIcon={<PlusIcon></PlusIcon>}
        >
          Tạo hoá đơn
        </Button>
        <ToastContainer />
      </Box>
    </div>
  );
}
