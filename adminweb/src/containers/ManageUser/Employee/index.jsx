import React, { useState, useEffect } from "react";
import "./styles.css";
import Select from "react-select";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Input from "@material-ui/core/Input";
import {
  addDailySchedule,
  getEmployee,
  getSchedule,
} from "../../../redux/actions/humanResource";
import {
  shiftTime,
  week as weekDate,
  typeOption,
} from "../../../utilities/constants/titles";
import { getTimeSheetRender } from "../../../utilities/constants/DataRender/humanResource";
import querystring from "querystring";

const Employee = () => {
  const current = new Date();

  var currentWeek = moment().format("w") - 1;

  const [time, setTime] = useState({
    week: currentWeek,
    year: current.getFullYear(),
  });

  const [initData, setInitData] = useState();

  const [disable, setDisable] = useState(true);

  const [employeeOption, setEmployeeOption] = useState();

  var week = [];

  for (var i = 1; i <= 52; i++) {
    week.push({
      value: i,
      label: `Tuần thứ ${i}, Từ ${moment(i, "week")
        .startOf("week")
        .format("DD/MM")} đến ${moment(i, "week").endOf("week").format("DD/MM")}
           `,
    });
  }

  const year = [];

  for (var j = current.getFullYear(); j > current.getFullYear() - 5; j--) {
    year.push({ value: j, label: j.toString() });
  }

  useEffect(() => {
    const params = querystring.stringify(time);
    getSchedule(params, (output) => {
      if (output) {
        if (output.status === "fail") {
          setInitData(getTimeSheetRender([], shiftTime.length));
        } else {
          setInitData(getTimeSheetRender(output, shiftTime.length));
        }
      }
    });

    getEmployee((output) => {
      if (output) {
        const data = output.map((value) => {
          return {
            value: value.id,
            label: value.first_name + " " + value.last_name,
          };
        });
        setEmployeeOption(data);
      }
    });
  }, [time]);

  const handleSelectionChange = (event, params, shiftId) => {
    let data = [...initData];
    let temp = data.find((element) => element.shift === shiftId);
    var i = data.indexOf(temp);
    let changedData = { ...temp, [event.name]: params.value };
    data[i] = changedData;
    setInitData(data);
    setDisable(false);
  };

  const handleTypeChange = (event, shiftId) => {
    const { name, value } = event.target;
    let data = [...initData];
    let temp = data.find((element) => element.shift === shiftId);
    var i = data.indexOf(temp);
    let changedData = { ...temp, [name]: value };
    data[i] = changedData;
    setInitData(data);
    setDisable(false);
  };

  const renderTableData = () => {
    return (
      <tbody>
        {shiftTime.map((value, index) => {
          return (
            <tr key={index}>
              <td>{value.label}</td>
              {initData
                .filter((data) => data.shift % shiftTime.length === value.value)
                .map((data, id) => (
                  <td key={id}>
                    <Select
                      name="staff"
                      className="mb-8"
                      options={employeeOption}
                      value={
                        employeeOption.find(
                          (index) =>
                            index.value ===
                            initData.find((i) => i.shift === data.shift).staff
                        ) || ""
                      }
                      onChange={(params, event) =>
                        handleSelectionChange(event, params, data.shift)
                      }
                    />
                    <Select
                      options={typeOption}
                      className="mb-8"
                      placeholder="Loại công việc"
                      name="title"
                      value={
                        typeOption.find(
                          (index) =>
                            index.label ===
                            initData.find((i) => i.shift === data.shift).title
                        ) || ""
                      }
                      onChange={(params, event) =>
                        handleSelectionChange(event, params, data.shift)
                      }
                    />
                    <Input
                      placeholder="Ghi chú"
                      name="content"
                      value={
                        initData.find((i) => i.shift === data.shift).content ||
                        ""
                      }
                      onChange={(event) => handleTypeChange(event, data.shift)}
                    />
                  </td>
                ))}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const handleTimeChange = (params, name) => {
    setTime({ ...time, [name]: params.value });
  };

  const handleSaveSchedule = () => {
    let shifts = initData.filter((element) => element.staff && element.title);
    const data = {
      week: time.week,
      year: time.year,
      schedule: shifts,
    };
    addDailySchedule(data, (output) => {
      if (output) {
        setDisable(true);
      }
    });
  };

  return (
    <div className="col col-full pl-48" >
      {initData && employeeOption && (
        <div >
          <div className="col col-full" style={{marginLeft:'7%', marginBottom:'2%'}}>
            <div className="col col-third">
              <Typography>Lựa chọn tuần</Typography>
              <Select
                className="week-select"
                options={week}
                value={week.find((index) => index.value === time.week)}
                onChange={(params) => handleTimeChange(params, "week")}
              />
            </div>
            <div className="col col-third">
              <Typography>Lựa chọn năm</Typography>
              <Select
                className="week-select"
                options={year}
                value={year.find((index) => index.value === time.year)}
                onChange={(params) => handleTimeChange(params, "year")}
              />
            </div>
          </div>
          <div>
            <h1 id="title">Bảng phân công công việc</h1>
            <table id="students" style={{ marginLeft:'7%'}}>
              <thead>
                <tr>
                  <th style={{ width: "9%" }}></th>
                  {weekDate.map((date, index) => (
                    <th key={index}>{date.label}</th>
                  ))}
                </tr>
              </thead>
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
              disabled={disable}
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
