import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "./styles.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { getAuth } from "../../../../../src/utilities/helper";
import InputBase from "@material-ui/core/InputBase";

export default function NotificationForm() {
  const user = getAuth();
  const handleClick = () => {
    console.log("dataSend", dataSend);
  };
  // const [typeSelect, setTypeSelect] = useState("");
  // const [amount, setAmount] = useState();
  // const [price, setPrice] = useState();
  // const [description, setDescription] = useState();
  const [dataSend, setDataSend] = useState({
    createdBy: user.email,
    typeSelect: "",
    amount: 0,
    price: 0,
    description: "",
  });
  const SendButton = withStyles((theme) => ({
    root: {
      width: "100px",
    },
  }))(Button);
  const CancelButton = withStyles((theme) => ({
    root: {
      width: "100px",
    },
  }))(Button);
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
      borderRadius: 10,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    margin: {},
  }));
  const Input = withStyles((theme) => ({
    input: {
      width: 185,
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
      },
      //transition: theme.transitions.create(["border-color", "box-shadow"]),
    },
  }))(InputBase);
  const classes = useStyles();
  const handleChange = (event) => {
    const name = event.target.name;
    const data = event.target.value;
    setDataSend({ ...dataSend, [name]: data });
  };
  return (
    <Box>
      <Box>
        <Typography variant="h6">Thêm khoản chi</Typography>
      </Box>
      <Box marginTop={3}>
        <TextField
          id="outlined-helperText"
          label="Từ"
          name={"createdBy"}
          defaultValue={`${user.first_name} ${user.last_name}`}
          variant="outlined"
          size="small"
          disabled
          style={{ color: "white" }}
          className={"add-budget-disable"}
        />
      </Box>
      <Box>
        <FormControl className={classes.margin}>
          <InputLabel id="demo-customized-select-label">Loại</InputLabel>
          <Select
            value={dataSend.typeSelect}
            onChange={handleChange}
            name={"typeSelect"}
            displayEmpty
            className={classes.selectEmpty}
            input={<Input />}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={"out"}>Chi</MenuItem>
            <MenuItem value={"in"}>Thu</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box marginTop={3}>
        <TextField
          id="amount"
          name={"amount"}
          label="Số lượng"
          variant="outlined"
          onChange={handleChange}
          size="small"
          type="number"
        />
      </Box>
      <Box marginTop={3}>
        <TextField
          id="price"
          label="Giá tiền"
          InputProps={{
            inputProps: {
              min: 1000,
              step: 1000,
            },
          }}
          onChange={handleChange}
          variant="outlined"
          size="small"
          type="number"
        />
      </Box>
      <Box marginTop={3}>
        <TextField
          id="outlined-helperText"
          label="Chi tiết"
          name={"description"}
          placeholder="Chi tiết"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          rows={4}
          multiline
        />
      </Box>
      <Box textAlign="center" marginTop={3}>
        <SendButton
          variant="contained"
          color="primary"
          onClick={handleClick}
          startIcon={<SendIcon>send</SendIcon>}
        >
          Gửi
        </SendButton>
      </Box>
    </Box>
  );
}
