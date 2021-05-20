import React, { useState, useEffect } from "react";
import "./styles.css";
import Box from "@material-ui/core/Box";

import Select from "react-select";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Input from "@material-ui/core/Input";
const Employee = () => {
  var week = [];
  var i = 1;
  while (i <= 52 && week.length <= 52) {
    week.push({
      value: i,
      label: `Tuần thứ ${i}, Từ ${moment(i, "week")
        .startOf("week")
        .format("DD/MM")} đến ${moment(i, "week").endOf("week").format("DD/MM")}
           `,
    });
    i++;
  }

  const [valueSelected, setValueSelected] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [initData, setInitData] = useState([
    {
      title: "Ca trực",
      content: "abc",
      shift: "02",
      staff: 1,
    },
    {
      title: "Ca làm",
      content: "abc",
      shift: "01",
      staff: 1,
    },
    {
      title: "Ca trực",
      content: "abc",
      shift: "21",
      staff: 2,
    },
    {
      title: "Ca trực",
      content: "abc",
      shift: "15",
      staff: 5,
    },
    {
      title: "Ca làm",
      content: "abc",
      shift: "18",
      staff: 4,
    },
  ]);
  const [putData, setPutData] = useState([]);
  const [postData, setPostData] = useState([]);

  const renderTableHeader = () => {
    return (
      <Box>
        <th style={{ width: "9%" }}></th>
        <th>Chủ nhật</th>
        <th>Thứ hai</th>
        <th>Thứ ba</th>
        <th>Thứ tư</th>
        <th>Thứ năm</th>
        <th>Thứ sáu</th>
        <th>Thứ bảy</th>
      </Box>
    );
  };
  const curWeek = moment(new Date()).weeks();

  const [selectedWeek, setSelectedWeek] = useState();

  const renderTableData = () => {
    return (
      <tbody>
        <tr>
          <td>Ca 1 (6h - 14h)</td>
          <td>
            <Select
              name={"01"}
              options={employeeOption}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "01")?.staff
              )}
              selectedValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "01")?.staff
              )}
              value={valueSelected}
              onChange={handleValueChange}
            />
            <Select
              name={"01"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "01")?.title
              )}
            />
            <Input
              id="01"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "01")?.content}
            />
          </td>
          <td>
            <Select
              name={"04"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "04")?.staff
              )}
            />
            <Select
              name={"04"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "04")?.title
              )}
            />
            <Input
              id="04"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "04")?.content}
            />
          </td>
          <td>
            <Select
              name={"07"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "07")?.staff
              )}
            />{" "}
            <Select
              name={"07"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "07")?.title
              )}
            />
            <Input
              id="07"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "07")?.content}
            />
          </td>
          <td>
            <Select
              name={"10"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "10")?.staff
              )}
            />{" "}
            <Select
              name={"10"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "10")?.title
              )}
            />
            <Input
              id="10"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "10")?.content}
            />
          </td>
          <td>
            <Select
              name={"13"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "13")?.staff
              )}
            />{" "}
            <Select
              name={"13"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "13")?.title
              )}
            />
            <Input
              id="13"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "13")?.content}
            />
          </td>
          <td>
            <Select
              name={"16"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "16")?.staff
              )}
            />{" "}
            <Select
              name={"16"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "16")?.title
              )}
            />
            <Input
              id="16"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "16")?.content}
            />
          </td>
          <td>
            <Select
              name={"19"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "19")?.staff
              )}
            />{" "}
            <Select
              name={"19"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "19")?.title
              )}
            />
            <Input
              id="19"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "19")?.content}
            />
          </td>
        </tr>
        <tr>
          <td>Ca 2 (14h - 22h)</td>
          <td>
            <Select
              name={"02"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "02")?.staff
              )}
            />{" "}
            <Select
              name={"02"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "02")?.title
              )}
            />{" "}
            <Input
              id="02"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "02")?.content}
            />
          </td>
          <td>
            <Select
              name={"05"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "05")?.staff
              )}
            />{" "}
            <Select
              name={"05"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "05")?.title
              )}
            />
            <Input
              id="05"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "05")?.content}
            />
          </td>
          <td>
            <Select
              name={"08"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "08")?.staff
              )}
            />{" "}
            <Select
              name={"08"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "08")?.title
              )}
            />
            <Input
              id="08"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "08")?.content}
            />
          </td>
          <td>
            <Select
              name={"11"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "11")?.staff
              )}
            />{" "}
            <Select
              name={"11"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "11")?.title
              )}
            />
            <Input
              id="11"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "11")?.content}
            />
          </td>
          <td>
            <Select
              name={"14"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "14")?.staff
              )}
            />{" "}
            <Select
              name={"14"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "14")?.title
              )}
            />
            <Input
              id="14"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "14")?.content}
            />
          </td>
          <td>
            <Select
              name={"17"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "17")?.staff
              )}
            />{" "}
            <Select
              name={"17"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "17")?.title
              )}
            />
            <Input
              id="17"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "17")?.content}
            />
          </td>
          <td>
            <Select
              name={"20"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "20")?.staff
              )}
            />{" "}
            <Select
              name={"20"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "20")?.title
              )}
            />
            <Input
              id="20"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "20")?.content}
            />
          </td>
        </tr>
        <tr>
          <td>Ca 3 (22h - 6h)</td>
          <td>
            <Select
              name={"03"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "03")?.staff
              )}
            />{" "}
            <Select
              name={"03"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "03")?.title
              )}
            />
            <Input
              id="03"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "03")?.content}
            />{" "}
          </td>
          <td>
            <Select
              name={"06"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "06")?.staff
              )}
            />{" "}
            <Select
              name={"06"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "06")?.title
              )}
            />
            <Input
              id="06"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "06")?.content}
            />
          </td>
          <td>
            <Select
              name={"09"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "09")?.staff
              )}
            />{" "}
            <Select
              name={"09"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "09")?.title
              )}
            />
            <Input
              id="09"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "09")?.content}
            />
          </td>
          <td>
            <Select
              name={"12"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "12")?.staff
              )}
            />{" "}
            <Select
              name={"12"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "12")?.title
              )}
            />
            <Input
              id="12"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "12")?.content}
            />
          </td>
          <td>
            <Select
              name={"15"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "15")?.staff
              )}
            />{" "}
            <Select
              name={"15"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "15")?.title
              )}
            />
            <Input
              id="15"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "15")?.content}
            />
          </td>
          <td>
            <Select
              name={"18"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "18")?.staff
              )}
            />{" "}
            <Select
              name={"18"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "18")?.title
              )}
            />
            <Input
              id="18"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "18")?.content}
            />
          </td>
          <td>
            <Select
              name={"21"}
              options={employeeOption}
              onChange={handleValueChange}
              defaultValue={employeeOption.find(
                (index) =>
                  index.staff === initData.find((i) => i.shift === "21")?.staff
              )}
            />{" "}
            <Select
              name={"21"}
              options={typeOption}
              onChange={handleTypeChange}
              placeholder="Loại công việc"
              defaultValue={typeOption.find(
                (index) =>
                  index.label === initData.find((i) => i.shift === "21")?.title
              )}
            />
            <Input
              id="21"
              placeholder="Ghi chú"
              onChange={handleInputChange}
              defaultValue={initData.find((i) => i.shift === "21")?.content}
            />
          </td>
        </tr>
      </tbody>
    );
  };
  const employeeOption = [
    {
      staff: 1,
      label: "Phan Văn Ben",
    },
    { staff: 2, label: "Đoàn Trường" },
    { staff: 3, label: "Tô Việt Anh" },
    { staff: 4, label: "Trần Minh Quang" },
    { staff: 5, label: "Nguyễn Nhân Viên" },
    { staff: 6, label: "Nguyen Van A" },
  ];
  const handleTypeChange = (params, name) => {
    var temp = initData.find((index) => index.shift === name.name);
    if (temp) {
      var tempPut = putData.find((index) => index.shift === name.name);
      if (tempPut) {
        setPutData(
          [...putData].map((object) => {
            if (object.shift === name.name) {
              return {
                ...object,
                title: params.label,
              };
            } else return object;
          })
        );
      } else
        setPutData([...putData, { shift: name.name, title: params.label }]);
    } else {
      var tempPost = postData.find((index) => index.shift === name.name);

      if (tempPost) {
        console.log("tempPost");

        setPostData(
          [...postData].map((object) => {
            if (object.shift === name.name) {
              return {
                ...object,
                title: params.label,
              };
            } else return object;
          })
        );
      } else {
        console.log("!tempPost");

        setPostData([...postData, { shift: name.name, title: params.label }]);
      }
    }
  };
  const handleValueChange = (params, name) => {
    setIsEdit(true);
    var temp = initData.find((index) => index.shift === name.name);
    if (temp) {
      var tempPut = putData.find((index) => index.shift === name.name);
      if (tempPut) {
        setPutData(
          [...putData].map((object) => {
            if (object.shift === name.name) {
              return {
                ...object,
                staff: params.staff,
              };
            } else return object;
          })
        );
      } else
        setPutData([...putData, { shift: name.name, staff: params.staff }]);
    } else {
      var tempPost = postData.find((index) => index.shift === name.name);

      if (tempPost) {
        console.log("tempPost");
        setPostData(
          [...postData].map((object) => {
            if (object.shift === name.name) {
              return {
                ...object,
                staff: params.staff,
              };
            } else return object;
          })
        );
      } else {
        console.log("!tempPost");
        setPostData([...postData, { shift: name.name, staff: params.staff }]);
      }
    }
  };
  const handleInputChange = (params, value) => {
    setIsEdit(true);
    var temp = initData.find((index) => index.shift === params.target.id);
    if (temp) {
      var tempPut = putData.find((index) => index.shift === params.target.id);
      if (tempPut) {
        setPutData(
          [...putData].map((object) => {
            if (object.shift === params.target.id) {
              return {
                ...object,
                content: params.target.value,
              };
            } else return object;
          })
        );
      } else
        setPutData([
          ...putData,
          { shift: params.target.id, content: params.target.value },
        ]);
    } else {
      console.log("postData");
      var tempPost = postData.find((index) => index.shift === params.target.id);

      if (tempPost) {
        setPostData(
          [...postData].map((object) => {
            if (object.shift === params.target.id) {
              return {
                ...object,
                content: params.target.value,
              };
            } else return object;
          })
        );
      } else
        setPostData([
          ...postData,
          { shift: params.target.id, content: params.target.value },
        ]);
    }
  };
  const typeOption = [
    {
      value: 1,
      label: "Ca trực",
    },
    {
      value: 2,
      label: "Ca làm",
    },
  ];

  const handleWeekChange = (params) => {
    console.log("params", params);
    setSelectedWeek(params.value);
  };
  const handleSaveSchedule = () => {
    console.log("Put Data ne", putData);
    console.log("Post Data ne", postData);
    // if (putData.length < 21) {
    //   alert("not enough element");
    //   return;
    // }
    // putData.forEach((index) => {
    //   if (!index.staff || !index.title || !index.content) {
    //     alert("Please fill all!");
    //     return;
    //   }
    // });
  };
  console.log("Put Data", putData);
  return (
    <div>
      <div>
        <Typography>Lựa chọn tuần làm việc</Typography>
        <Select
          name={"week"}
          className="week-select"
          options={week}
          value={week.find((index) => index.value === selectedWeek)}
          onChange={handleWeekChange}
          defaultValue={week.find((index) => index.value === curWeek)}
        />
      </div>
      <div>
        <h1 id="title">Bảng phân công công việc</h1>
        <table id="students">
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTableData()}
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "end", marginRight: "11%", marginTop: "2%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSchedule}
          startIcon={<SaveIcon></SaveIcon>}
          disabled={!isEdit}
        >
          Lưu lịch làm
        </Button>
      </div>
    </div>
  );
};
export default Employee;