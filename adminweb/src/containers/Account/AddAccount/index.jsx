import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "./styles.css";
import FormHelperText from "@material-ui/core/FormHelperText";
import DatePicker from "react-datepicker";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { getAuth } from "../../../../src/utilities/helper";
import InputBase from "@material-ui/core/InputBase";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";

export default function NotificationForm() {
  const user = getAuth();
  const permission = {
    group: [
      {
        id: 2,
        name: "quanlynhansu_group",
      },
      {
        id: 1,
        name: "nhanvien_group",
      },
      {
        id: 3,
        name: "sinhvien_group",
      },
      {
        id: 4,
        name: "quanlytaichinh_group",
      },
      {
        id: 5,
        name: "superadmin_group",
      },
    ],
    permission: [
      { id: 33, name: "can remove area" },
      { id: 34, name: "can add area" },
      { id: 35, name: "can add bill" },
      { id: 36, name: "can change bill" },
    ],
  };
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
  const faculty = [
    {
      id: 1,
      name: "Khoa Công Nghệ Thông Tin",
      slug: "cong-nghe-thong-tin",
    },
    {
      id: 2,
      name: "Khoa Cơ Khí",
      slug: "khoa-co-khi",
    },
    {
      id: 3,
      name: "Khoa Xây dựng",
      slug: "khoa-xay-dung",
    },
    {
      id: 9,
      name: "Khoa Công nghệ Nhiệt – Điện lạnh",
      slug: "khoa-cong-nghe-nhiet-dien-lanh",
    },
    {
      id: 10,
      name: "Khoa Cơ khí Giao thông",
      slug: "khoa-co-khi-giao-thong",
    },
    {
      id: 11,
      name: "Khoa Điện",
      slug: "khoa-dien",
    },
    {
      id: 12,
      name: "Khoa Điện tử - Viễn thông",
      slug: "khoa-dien-tu-vien-thong",
    },
    {
      id: 13,
      name: "Khoa Hóa",
      slug: "khoa-hoa",
    },
    {
      id: 14,
      name: "Khoa Khoa Học Công nghệ tiên tiến",
      slug: "khoa-khoa-hoc-cong-nghe-tien-tien",
    },
    {
      id: 15,
      name: "Khoa kiến trúc",
      slug: "khoa-kien-truc",
    },
    {
      id: 16,
      name: "Khoa môi trường",
      slug: "khoa-moi-truong",
    },
    {
      id: 17,
      name: "khoa quản lý dự án",
      slug: "khoa-quan-li-du-an",
    },
    {
      id: 18,
      name: "khoa xây dựng cầu đường",
      slug: "khoa-xay-dung-cau-duong",
    },
    {
      id: 19,
      name: "khoa xây dựng công trình thủy",
      slug: "khoa-xay-dung-cong-trinh-thuy",
    },
    {
      id: 20,
      name: "khoa xây dựng dân dụng và công nghiệp",
      slug: "khoa-xay-dung-dan-dung-va-cong-nghiep",
    },
  ];
  const position = [
    {
      id: 1,
      name: "Ban Lãnh Đạo",
      slug: "ban-lanh-dao",
    },
    {
      id: 2,
      name: "Tổ Quản Lý Sinh Viên",
      slug: "to-quan-ly-sinh-vien",
    },
    {
      id: 3,
      name: "Tổ Kế Toán",
      slug: "to-ke-toan",
    },
    {
      id: 4,
      name: "Tổ Điện Nước - Sữa Chữa",
      slug: "to-dien-nuoc-sua-chua",
    },
    {
      id: 5,
      name: "Tổ Vệ Sinh Môi Trường",
      slug: "to-ve-sinh-moi-truong",
    },
    {
      id: 6,
      name: "Tổ Công Tác Quản Lý Sinh Viên",
      slug: "to-cong-tac-quan-ly-sinh-vien",
    },
    {
      id: 7,
      name: "Đội Tự Quản Nội Trú",
      slug: "doi-tu-quan-noi-tru",
    },
    {
      id: 8,
      name: "Trưởng Phòng",
      slug: "truong-phong",
    },
    {
      id: 9,
      name: "Tổ Công tác thông tin tuyên truyền và văn hoá nghệ thuật",
      slug: "to-tuyen-truyen-nghe-thuat",
    },
  ];
  const class_in_university = [
    {
      id: 1,
      name: "17T1",
      slug: "17t1",
    },
    {
      id: 2,
      name: "17T2",
      slug: "17t2",
    },
    {
      id: 3,
      name: "17T3",
      slug: null,
    },
    {
      id: 4,
      name: "17X1",
      slug: null,
    },
    {
      id: 5,
      name: "17X2",
      slug: null,
    },
    {
      id: 6,
      name: "17C1A",
      slug: null,
    },
    {
      id: 7,
      name: "19N1",
      slug: "19n1",
    },
    {
      id: 8,
      name: "19N2",
      slug: "19n2",
    },
    {
      id: 9,
      name: "18N3",
      slug: "18n3",
    },
    {
      id: 10,
      name: "18C1A",
      slug: "18c1a",
    },
    {
      id: 11,
      name: "19C1A",
      slug: "19c1a",
    },
    {
      id: 12,
      name: "18D1",
      slug: "18d1",
    },
    {
      id: 13,
      name: "18D2",
      slug: "18d2",
    },
    {
      id: 14,
      name: "18D3",
      slug: "18d3",
    },
    {
      id: 15,
      name: "18DT1",
      slug: "18dt1",
    },
    {
      id: 16,
      name: "18DT2",
      slug: "18dt2",
    },
    {
      id: 17,
      name: "17DT3",
      slug: "17dt3",
    },
    {
      id: 18,
      name: "17H1",
      slug: "17h1",
    },
    {
      id: 19,
      name: "18H2",
      slug: "18h2",
    },
    {
      id: 20,
      name: "19H3",
      slug: "19h3",
    },
    {
      id: 21,
      name: "20PFIEV1",
      slug: "20pfiev1",
    },
    {
      id: 22,
      name: "17PFIEV2",
      slug: "17pfiev2",
    },
    {
      id: 23,
      name: "18PFIEV3",
      slug: "18pfiev3",
    },
    {
      id: 24,
      name: "19KT1",
      slug: "19kt2",
    },
    {
      id: 25,
      name: "20KT2",
      slug: "20kt2",
    },
    {
      id: 26,
      name: "17KT3",
      slug: "17kt3",
    },
    {
      id: 27,
      name: "18MT1",
      slug: "18mt1",
    },
    {
      id: 28,
      name: "19MT2",
      slug: "19mt2",
    },
    {
      id: 29,
      name: "20MT3",
      slug: "20mt3",
    },
    {
      id: 30,
      name: "17QLDA1",
      slug: "17qlda1",
    },
    {
      id: 31,
      name: "18QLDA2",
      slug: "18qlda2",
    },
    {
      id: 32,
      name: "19QLDA3",
      slug: "19qlda3",
    },
    {
      id: 33,
      name: "18X3",
      slug: "18x3",
    },
  ];
  const area = [
    {
      id: 1,
      name: "Khu A",
      slug: "KhuA",
    },
    {
      id: 2,
      name: "Khu B",
      slug: "KhuB",
    },
    {
      id: 3,
      name: "Khu C",
      slug: "KhuC",
    },
    {
      id: 4,
      name: "Khu D",
      slug: "KhuD",
    },
  ];
  const handleClick = () => {
    console.log("dataSend", localData);
    const dataSend = {
      username: localData.userName,
      password: localData.password,
      firstName: localData.firstName,
      lastName: localData.lastName,
      email: localData.email,
      profile: {
        birthday: localData.birthday,
        address: localData.address,
        identify_card: localData.identify_card,
        gender: localData.gender === 1 ? true : false,
        phone: localData.phone,
        faculty: localData.role !== "student" ? "" : localData.faculty,
        my_class: localData.role !== "student" ? "" : localData.my_class,
        area: localData.role === "student" ? "" : localData.area,
        position: localData.role === "student" ? "" : localData.position,
      },
      group_list: localData.group,
      permission_list: localData.permission,
    }; //this is right format of data to post
    if (localData.password !== localData.confirmPassword) {
      alert("xác nhận đúng mật khẩu");
    }
    console.log("Data send", dataSend);
  };
  // const [typeSelect, setTypeSelect] = useState("");
  // const [amount, setAmount] = useState();
  // const [price, setPrice] = useState();
  // const [description, setDescription] = useState();

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
    console.log("event.target", event.target);
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
  console.log(localData, localData);
  return (
    <Box style={{ width: "100%" }}>
      <Box marginLeft={"15%"} marginBottom={3}>
        <Typography variant="h6">Thêm một tài khoản mới</Typography>
      </Box>
      <Box marginTop={3} marginLeft={"15%"}>
        <TextField
          id="userName"
          name={"userName"}
          label="Tên Tài Khoản"
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <TextField
          id="email"
          name={"email"}
          type="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginLeft: "42px" }}
        />
      </Box>
      <Box marginLeft={"15%"} display="flex">
        <FormControl className={classes.margin}>
          <InputLabel id="demo-simple-select-label">Nhóm Chức năng</InputLabel>
          <Select
            labelId={"demo-customized-select-label"}
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
            {permission.group.map((index) => {
              return (
                <MenuItem value={index.id}>
                  {" "}
                  <Checkbox checked={localData.group.indexOf(index.id) > -1} />
                  <ListItemText primary={index.name} />
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>Lựa chọn nhóm chức năng</FormHelperText>
        </FormControl>
        <div
          placeholder={"nhóm chức năng"}
          style={{
            width: "220px",
            height: "50px",
            border: "1px solid",
            marginLeft: "7%",
            overflowY: "scroll",
            display: "block",
            marginTop: "20px",
          }}
        >
          {localData.group.map((index) => {
            return (
              <div>
                {permission.group.find((value) => value.id === index).name}
              </div>
            );
          })}
        </div>
      </Box>
      <Box display="flex" marginLeft={"15%"}>
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
            {permission.permission.map((index) => (
              <MenuItem value={index.id}>
                <Checkbox
                  checked={localData.permission.indexOf(index.id) > -1}
                />
                <ListItemText primary={index.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Lựa chọn quyền</FormHelperText>
        </FormControl>
        <div
          style={{
            width: "220px",
            height: "50px",
            border: "1px solid",
            marginLeft: "7%",
            overflowY: "scroll",
            display: "block",
          }}
        >
          {localData.permission.map((index) => {
            return (
              <div>
                {permission.permission.find((value) => value.id === index).name}
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
        <FormControl className={classes.margin} style={{ marginLeft: "40px" }}>
          <InputLabel id="demo-customized-select-label">Giới tính </InputLabel>
          <Select
            value={localData.gender}
            onChange={handleChange}
            name={"gender"}
            displayEmpty
            className={classes.selectEmpty}
            input={<Input />}
          >
            <MenuItem value="1">Nam</MenuItem>
            <MenuItem value="0">Nữ</MenuItem>
          </Select>
          <FormHelperText>Lựa chọn giới tính</FormHelperText>
        </FormControl>
      </Box>

      <Box marginLeft={"15%"}>
        <TextField
          id="firstName"
          name={"firstName"}
          label="Tên"
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px" }}
        />
        <TextField
          id="lastName"
          name={"lastName"}
          type="lastName"
          label="Họ "
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px", marginLeft: "40px" }}
        />
      </Box>
      <Box marginLeft={"15%"}>
        <TextField
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
          name={"address"}
          label="Địa chỉ liên lạc"
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px", marginLeft: "40px" }}
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
          variant="outlined"
          onChange={handleChange}
          size="small"
          style={{ marginTop: "15px", marginLeft: "42px" }}
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
            {position.map((index) => {
              return <MenuItem value={index.id}>{index.name}</MenuItem>;
            })}
          </Select>
          <FormHelperText>
            {localData.role === "student"
              ? "Bạn không cần điền ô này"
              : "Lựa chọn phòng ban"}
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.margin} style={{ marginLeft: "40px" }}>
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
            {area.map((index) => {
              return <MenuItem value={index.id}>{index.name}</MenuItem>;
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
            {faculty.map((index) => {
              return <MenuItem value={index.id}>{index.name}</MenuItem>;
            })}
          </Select>
          <FormHelperText>
            {localData.role !== "student"
              ? "Bạn không cần điền ô này"
              : "Lựa chọn khoa đang theo học"}
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.margin} style={{ marginLeft: "40px" }}>
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
            {class_in_university.map((index) => {
              return <MenuItem value={index.id}>{index.name}</MenuItem>;
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
