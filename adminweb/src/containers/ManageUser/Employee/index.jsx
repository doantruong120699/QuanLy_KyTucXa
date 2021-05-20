import React, { useState, useEffect } from "react";
import "./styles.css";
import Select from "react-select";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Input from "@material-ui/core/Input";
import { getEmployee, getSchedule } from "../../../redux/actions/humanResource";
import { shiftTime } from "../../../utilities/constants/titles";

const Employee = () => {
  var week = [];
  var currentWeek = moment().format("w") - 1;

  for (var i = 1; i <= currentWeek; i++) {
    week.push({
      value: i,
      label: `Tuần thứ ${i}, Từ ${moment(i, "week")
        .startOf("week")
        .format("DD/MM")} đến ${moment(i, "week").endOf("week").format("DD/MM")}
           `,
    });
  }

  const [isEdit, setIsEdit] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [initData, setInitData] = useState();
  const [putData, setPutData] = useState([]);
  const [employeeOption, setEmployeeOption] = useState();

  useEffect(() => {
    getSchedule(selectedWeek, (output) => {
      if (output) {
        const data = output.map((value) => {
          return {
            title: value.title,
            content: value.content,
            shift: value.shift.id,
            staff: value.staff.username,
          };
        });
        setInitData(data);
      }
    });

    getEmployee((output) => {
      if (output) {
        const data = output.results.map((value) => {
          return {
            staff: value.username,
            label: value.first_name + " " + value.last_name,
          };
        });
        setEmployeeOption(data);
      }
    });
  }, [selectedWeek]);

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th style={{ width: "9%" }}></th>
          <th>Chủ nhật</th>
          <th>Thứ hai</th>
          <th>Thứ ba</th>
          <th>Thứ tư</th>
          <th>Thứ năm</th>
          <th>Thứ sáu</th>
          <th>Thứ bảy</th>
        </tr>
      </thead>
    );
  };

  const renderTableData = () => {
    return (
      <tbody>
        {shiftTime.map((value) => {
          return (
            <tr>
              <td>{value.label}</td>
              <td>
                <Select
                  options={employeeOption}
                  value={
                    employeeOption.find(
                      (index) =>
                        index.staff ===
                        initData.find((i) => i.shift === 1)?.staff
                    ) || ""
                  }
                />
                <Select
                  options={typeOption}
                  placeholder="Loại công việc"
                  value={
                    typeOption.find(
                      (index) =>
                        index.label ===
                        initData.find((i) => i.shift === 1)?.title
                    ) || ""
                  }
                />
                <Input
                  id="01"
                  placeholder="Ghi chú"
                  value={initData.find((i) => i.shift === 1)?.content || ""}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    );
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
    setSelectedWeek(params.value);
  };
  const handleSaveSchedule = () => {
    console.log(putData);
  };

  return (
    <div>
      {initData && employeeOption && (
        <div>
          {console.log(initData)}
          <div>
            <Typography>Lựa chọn tuần làm việc</Typography>
            <Select
              className="week-select"
              options={week}
              value={week.find((index) => index.value === selectedWeek)}
              onChange={handleWeekChange}
            />
          </div>
          <div>
            <h1 id="title">Bảng phân công công việc</h1>
            <table id="students">
              {renderTableHeader()}
              {renderTableData()}
            </table>
          </div>
          <div
            style={{ textAlign: "end", marginRight: "11%", marginTop: "2%" }}
          >
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
      )}
    </div>
  );
};
export default Employee;
