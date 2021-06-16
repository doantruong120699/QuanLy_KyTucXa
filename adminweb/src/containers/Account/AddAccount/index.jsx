import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFaculty } from "../../../redux/actions/account";
import FormHelperText from "@material-ui/core/FormHelperText";
import DatePicker from "react-datepicker";
import { createAccount, updateAccount } from "../../../redux/actions/account";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";

export default function AddAccount(props) {
  const {
    userInfor,
    permission,
    faculty,
    class_in_university,
    area,
    type = "create",
    position,
    onSuccess,
  } = props;

  const [dumbBirthDay, setDumbBirthDay] = useState();

  const [localData, setLocalData] = useState({
    // this data used to store value, dataSend will be the data to post
    email: "",
    password: "0",
    userName: "",
    permission: [],
    group: [],
    firstName: "",
    lastName: "",
    birthday: "",
    role: "",
    address: "",
    identify_card: "",
    gender: "",
    phone: "",
    faculty: "",
    my_class: "",
    position: "",
    area: "",
  });
  const handleClick = () => {
    const dataSend = {
      username: localData.userName,
      password: localData.password,
      first_name: localData.firstName,
      last_name: localData.lastName,
      email: localData.email,
      profile: {
        birthday: localData.birthday,
        address: localData.address,
        identify_card: localData.identify_card,
        gender: localData.gender,
        phone: localData.phone,
        faculty: localData.role !== "student" ? "" : localData.faculty,
        my_class: localData.role !== "student" ? "" : localData.my_class,
        area: localData.role === "student" ? "" : localData.area,
        position: localData.role === "student" ? "" : localData.position,
      },
      group_list: localData.group,
      permission_list: localData.permission,
    }; //this is right format of data to post
    if (type === "create") {
      createAccount(dataSend, (output) => {
        console.log("output", output);
        if (output.status === "successful") {
          toast("Tạo tài khoản mới thành công!");
          setTimeout(onSuccess, 4000);
        } else toast(output.notification);
      });
    } else {
      console.log("Update");
      updateAccount(userInfor.public_id, dataSend, (output) => {
        console.log("output", output);
        if (output.status === "successful") {
          toast("Cập nhật tài khoản thành công!");
          setTimeout(onSuccess, 4000);
        } else toast(output.notification);
      });
    }
  };
  // const [typeSelect, setTypeSelect] = useState("");
  // const [amount, setAmount] = useState();
  // const [price, setPrice] = useState();
  // const [description, setDescription] = useState();

  useEffect(() => {
    if (userInfor) {
      setDumbBirthDay(new Date(userInfor.birthday));
      setLocalData({
        userName: userInfor.user.username || "",
        password: userInfor.password || "",
        email: userInfor.user.email || "",
        permission: userInfor.user.permission_list
          ? userInfor.user.permission_list.map((value) => value.id)
          : [],
        group: userInfor.user.group_list
          ? userInfor.user.group_list.map((value) => value.id)
          : [],
        firstName: userInfor.user.first_name || "",
        lastName: userInfor.user.last_name || "",
        birthday: userInfor.birthday || "",
        role: "" || "",
        address: userInfor.address || "",
        identify_card: userInfor.identify_card || "",
        gender: userInfor.gender || "",
        phone: userInfor.phone || "",
        faculty: userInfor.faculty?.id ? userInfor.faculty.id : "",
        my_class: userInfor.my_class ? userInfor.my_class.id : "",
        position: userInfor.position ? userInfor.position.id : "",
        area: userInfor.area ? userInfor.area.id : "",
      });
    }
  }, []);
  const SendButton = withStyles((theme) => ({
    root: {
      width: "100px",
    },
  }))(Button);
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
      borderRadius: 10,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
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
    if (localData.role === "student") {
      setLocalData({ ...localData, position: "", area: "" });
    } else setLocalData({ ...localData, faculty: "", my_class: "" });
    const name = event.target.name;
    const data = event.target.value;
    setLocalData({ ...localData, [name]: data });
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };
  console.log("type", userInfor);
  return (
    <Box style={{ width: "100%" }}>
      <Box marginLeft={"15%"} marginBottom={3}>
        <Typography variant="h6">Thêm một tài khoản mới</Typography>
      </Box>
      <Box marginTop={3} marginLeft={"15%"}>
        <TextField
          id="userName"
          name={"userName"}
          value={localData.userName}
          label="Tên Tài Khoản"
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <TextField
          id="email"
          value={localData.email}
          name={"email"}
          type="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginLeft: "8%" }}
        />
      </Box>
      <Box marginLeft={"15%"} display="flex" className="row">
        <FormControl className={`col ${classes.formControl}`}>
          <InputLabel id="demo-simple-select-label">Nhóm Chức năng</InputLabel>
          <Select
            labelId="demo-mutiple-checkbox-label"
            value={localData.group}
            onChange={handleChange}
            name={"group"}
            displayEmpty
            multiple
            MenuProps={MenuProps}
            renderValue={(selected) => selected.join(", ")}
            className={classes.selectEmpty}
            input={<Input />}
          >
            {permission.group.map((value, index) => {
              return (
                <MenuItem key={index} value={value.id}>
                  <Checkbox checked={localData.group.indexOf(value.id) > -1} />
                  <ListItemText primary={value.name} />
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>Lựa chọn nhóm chức năng</FormHelperText>
        </FormControl>
        <div
          className="col"
          placeholder={"nhóm chức năng"}
          style={{
            width: "225px",
            height: "50px",
            border: "1px solid",
            marginLeft: "8%",
            overflowY: "scroll",
            display: "block",
            marginTop: "20px",
          }}
        >
          {localData.group.map((value, index) => {
            return (
              <div key={index}>
                {permission.group.find((ele) => ele.id === value).name}
              </div>
            );
          })}
        </div>
      </Box>
      <Box display="flex" marginLeft={"15%"} marginTop={"3%"}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-checkbox-label">Quyền</InputLabel>
          <Select
            name="permission"
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={localData.permission}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {permission?.permission.map((value, index) => (
              <MenuItem key={index} value={value.id}>
                <Checkbox
                  checked={localData.permission.indexOf(value.id) > -1}
                />
                <ListItemText primary={value.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Lựa chọn quyền</FormHelperText>
        </FormControl>
        <div
          style={{
            width: "225px",
            height: "50px",
            border: "1px solid",
            marginLeft: "8%",
            overflowY: "scroll",
            display: "block",
          }}
        >
          {localData.permission.map((value, index) => {
            return (
              <div key={index}>
                {permission?.permission.find((ele) => ele.id === value)?.name}
              </div>
            );
          })}
        </div>
      </Box>

      <Box marginLeft={"15%"} marginTop={"3%"}>
        <FormControl className={classes.margin}>
          <InputLabel id="demo-customized-select-label">
            Loại Tài Khoản
          </InputLabel>
          <Select
            value={localData.role}
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
          <FormHelperText>Lựa chọn loại tài khoản</FormHelperText>
        </FormControl>
        <FormControl className={classes.margin} style={{ marginLeft: "8%" }}>
          <InputLabel id="demo-customized-select-label">Giới tính </InputLabel>
          <Select
            value={localData.gender}
            onChange={handleChange}
            name={"gender"}
            displayEmpty
            className={classes.selectEmpty}
            input={<Input />}
          >
            <MenuItem value={true}>Nam</MenuItem>
            <MenuItem value={false}>Nữ</MenuItem>
          </Select>
          <FormHelperText>Lựa chọn giới tính</FormHelperText>
        </FormControl>
      </Box>

      <Box marginLeft={"15%"} marginTop={"3%"}>
        <TextField
          id="firstName"
          name={"firstName"}
          label="Tên"
          value={localData.firstName}
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px" }}
        />
        <TextField
          id="lastName"
          name={"lastName"}
          type="lastName"
          value={localData.lastName}
          label="Họ "
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px", marginLeft: "8%" }}
        />
      </Box>
      <Box marginLeft={"15%"}>
        <TextField
          value={localData.identify_card}
          id="identify_card"
          name={"identify_card"}
          label="CMND"
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px" }}
        />
        <TextField
          id="address"
          value={localData.address}
          name={"address"}
          label="Địa chỉ liên lạc"
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px", marginLeft: "8%" }}
        />
      </Box>

      <Box marginLeft={"15%"}>
        <DatePicker
          className="add-account-birthday"
          name="birthday"
          placeholderText="Ngày Sinh"
          selected={dumbBirthDay}
          onChange={(value) => {
            setDumbBirthDay(value);
            setLocalData({
              ...localData,
              birthday: moment(value).format("YYYY-MM-DD"),
            });
          }}
        />
        <TextField
          id="phone"
          name={"phone"}
          label="Số điện thoại"
          value={localData.phone}
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px",marginLeft: "8%" }}
        />
      </Box>

      <Box marginTop={3} marginLeft={"15%"}>
        <FormControl className={classes.margin}>
          <InputLabel id="demo-simple-select-label">Phòng Ban</InputLabel>
          <Select
            labelId={"demo-customized-select-label"}
            value={localData.position}
            onChange={handleChange}
            disabled={localData.role === "student"}
            name={"position"}
            displayEmpty
            MenuProps={MenuProps}
            className={classes.selectEmpty}
            input={<Input />}
          >
            {position.map((value, index) => {
              return (
                <MenuItem key={index} value={value.id}>
                  {value.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>
            {localData.role === "student"
              ? "Bạn không cần điền ô này"
              : "Lựa chọn phòng ban"}
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.margin} style={{marginLeft: "8%" }}>
          <InputLabel id="demo-simple-select-label">Khu Vực</InputLabel>
          <Select
            labelId={"demo-customized-select-label"}
            value={localData.area}
            onChange={handleChange}
            disabled={localData.role === "student"}
            name={"area"}
            displayEmpty
            MenuProps={MenuProps}
            className={classes.selectEmpty}
            input={<Input />}
          >
            {area.map((value, index) => {
              return (
                <MenuItem key={index} value={value.id}>
                  {value.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>
            {localData.role === "student"
              ? "Bạn không cần điền ô này"
              : "Lựa chọn khu vực làm"}
          </FormHelperText>
        </FormControl>
      </Box>

      <Box marginTop={3} marginLeft={"15%"}>
        <FormControl className={classes.margin}>
          <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
          <Select
            labelId={"demo-customized-select-label"}
            value={localData.faculty}
            onChange={handleChange}
            disabled={localData.role !== "student"}
            name={"faculty"}
            displayEmpty
            MenuProps={MenuProps}
            className={classes.selectEmpty}
            input={<Input />}
          >
            {faculty.map((value, index) => {
              return (
                <MenuItem key={index} value={value.id}>
                  {value.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>
            {localData.role !== "student"
              ? "Bạn không cần điền ô này"
              : "Lựa chọn khoa đang theo học"}
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.margin} style={{ marginLeft: "8%"}}>
          <InputLabel id="demo-simple-select-label">Lớp Sinh Hoạt</InputLabel>
          <Select
            labelId={"demo-customized-select-label"}
            value={localData.my_class}
            onChange={handleChange}
            disabled={localData.role !== "student"}
            name={"my_class"}
            displayEmpty
            MenuProps={MenuProps}
            className={classes.selectEmpty}
            input={<Input />}
          >
            {class_in_university.map((value, index) => {
              return <MenuItem value={value.id}>{value.name}</MenuItem>;
            })}
          </Select>
          <FormHelperText>
            {localData.role !== "student"
              ? "Bạn không cần điền ô này"
              : "Lựa chọn lớp sinh hoạt"}
          </FormHelperText>
        </FormControl>
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
          style={{ marginLeft: "8%"}}
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
        <ToastContainer />
      </Box>
    </Box>
  );
}
