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
  const [type, setType] = useState([
    {
      id: 1,
      name: "Tiền Phòng",
      description: "Tiền phòng",
      slug: "tien-phong",
    },
    {
      id: 2,
      name: "Mặt Bằng",
      description: "mặt bằng căng tin, ....",
      slug: "mat-bang",
    },
    {
      id: 3,
      name: "Giữ xe",
      description: "Giữ xe",
      slug: "giu-xe",
    },
    {
      id: 4,
      name: "Phí đảm bảo tài sản",
      description: "Phí dảm bảo tài sản",
      slug: "phi-dam-bao-tai-san",
    },
    {
      id: 5,
      name: "Phí đăng ký tạm trú",
      description: "phí đăng ký tam trú",
      slug: "phi-dang-ky-tam-tru",
    },
    {
      id: 6,
      name: "Phí lưu trú đối với người thân sinh viên",
      description: "Phí lưu trú đối với người thân sinh viên",
      slug: "phi-luu-tru-nguoi-than",
    },
    {
      id: 7,
      name: "Khác",
      description: "khác",
      slug: "khac",
    },
  ]);

  const handleClick = () => {
    console.log("dataSend", dataSend);
  };
  // const [typeSelect, setTypeSelect] = useState("");
  // const [amount, setAmount] = useState();
  // const [price, setPrice] = useState();
  // const [description, setDescription] = useState();
  const [dataSend, setDataSend] = useState({
    name: "",
    type_revenue: 1,
    description: "",
    amount: undefined,
    user_recieve: undefined,
    time_recieve: new Date(),
  });
  const [typeSelect, setTypeSelect] = useState("none");
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
        <Typography variant="h6" style={{ marginLeft: "5%" }}>
          Thêm khoản chi
        </Typography>
      </Box>
      <Box marginTop={3} marginLeft={13}>
        <TextField
          label="Tên Khoản Thu Chi"
          onChange={handleChange}
          name={"name"}
          variant="outlined"
          size="small"
          style={{ color: "white" }}
        />
        <TextField
          label="Tới"
          name={"user_recieve"}
          onChange={handleChange}
          variant="outlined"
          size="small"
          style={{ color: "white", marginLeft: "3%" }}
        />
      </Box>
      <Box marginTop={2} marginLeft={13}>
        <FormControl className={classes.margin}>
          <InputLabel id="demo-customized-select-label">Loại</InputLabel>
          <Select
            value={typeSelect}
            onChange={(value) => {
              setTypeSelect(value.target.value);
              console.log("value", value);
            }}
            name={"typeSelect"}
            displayEmpty
            className={classes.selectEmpty}
            input={<Input />}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value={"out"}>Chi</MenuItem>
            <MenuItem value={"in"}>Thu</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.margin} style={{ marginLeft: "3%" }}>
          <InputLabel id="demo-customized-select-label">Loại</InputLabel>
          <Select
            onChange={handleChange}
            name={"type_revenue"}
            displayEmpty
            value={dataSend.type_revenue}
            className={classes.selectEmpty}
            input={<Input />}
          >
            {type.map((index) => {
              return <MenuItem value={index.id}>{index.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      <Box marginTop={3} marginLeft={13}>
        <TextField
          id="amount"
          name={"amount"}
          label="Số lượng"
          variant="outlined"
          onChange={handleChange}
          size="small"
          type="number"
        />
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
          style={{ color: "white", marginLeft: "3%" }}
        />
      </Box>
      <Box marginTop={3} marginLeft={13}>
        <TextField
          label="Chi tiết"
          name={"description"}
          placeholder="Chi tiết"
          variant="outlined"
          fullWidth
          style={{ width: "470px" }}
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
