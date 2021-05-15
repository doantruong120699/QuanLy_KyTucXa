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
import { getAuth } from "../../../../src/utilities/helper";
import InputBase from "@material-ui/core/InputBase";

export default function NotificationForm() {
  const user = getAuth();
  const handleClick = () => {
    console.log("dataSend", dataSend);
    if (dataSend.password !== dataSend.confirmPassword) {
      alert("xác nhận đúng mật khẩu");
    } else if (
      dataSend.role === "none" ||
      !dataSend.email ||
      !dataSend.password ||
      !dataSend.confirmPassword
    ) {
      alert("hãy điền đủ các ô");
    }
  };
  // const [typeSelect, setTypeSelect] = useState("");
  // const [amount, setAmount] = useState();
  // const [price, setPrice] = useState();
  // const [description, setDescription] = useState();
  const [dataSend, setDataSend] = useState({
    role: "none",
    email: "",
    password: "0",
    confirmPassword: "",
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
    <Box style={{ width: "100%" }}>
      <Box marginLeft={"15%"} marginBottom={3}>
        <Typography variant="h6">Thêm một tài khoản mới</Typography>
      </Box>

      <Box marginLeft={"15%"}>
        <FormControl className={classes.margin}>
          <InputLabel id="demo-customized-select-label">
            Loại Tài Khoản
          </InputLabel>
          <Select
            value={dataSend.role}
            onChange={handleChange}
            name={"role"}
            displayEmpty
            className={classes.selectEmpty}
            input={<Input />}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="superAdmin">Super Admin</MenuItem>
            <MenuItem value={"humanResources"}>Quản Lý Nhân Sự</MenuItem>
            <MenuItem value={"accountant"}>Quản Lý Thu Chi</MenuItem>
            <MenuItem value={"employee"}>Nhân Viên</MenuItem>
            <MenuItem value={"student"}>Sinh Viên</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="email"
          name={"email"}
          type="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px", marginLeft: "40px" }}
        />
      </Box>
      <Box marginTop={3} marginLeft={"15%"}>
        <TextField
          id="password"
          name={"password"}
          label="Mật khẩu"
          onChange={handleChange}
          variant="outlined"
          size="small"
          type="password"
        />
        <TextField
          id="confirmPassword"
          label="Xác Nhận Mật khẩu"
          name={"confirmPassword"}
          onChange={handleChange}
          variant="outlined"
          size="small"
          type="password"
          style={{ marginLeft: "40px" }}
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
