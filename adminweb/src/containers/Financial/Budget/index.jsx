import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Box from "@material-ui/core/Box";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";

export default function Budget() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("out");
  const dataOutBudget = [
    {
      id: 1,
      type: 1,
      description: "Mua đèn",
      number: 2,
      price: 200000,
      createdDate: "04/20/2021",
    },
    {
      id: 2,
      type: 1,
      description: "Mua quạt",
      number: 2,
      price: 230000,
      createdDate: "03/20/2021",
    },
    {
      id: 3,
      type: 1,
      description: "Mua bàn",
      number: 2,
      price: 270000,
      createdDate: "04/22/2021",
    },
    {
      id: 6,
      type: 1,
      description: "Đóng tiền điện",
      number: 1,
      price: 2000000,
      createdDate: "05/01/2021",
    },
    {
      id: 7,
      type: 1,
      description: "Đóng tiền nước",
      number: 1,
      price: 500000,
      createdDate: "05/01/2021",
    },
    {
      id: 8,
      type: 1,
      description: "Trả lương nhân viên A",
      number: 1,
      price: 2000000,
      createdDate: "04/30/2021",
    },
    {
      id: 9,
      type: 1,
      description: "Trả lương nhân viên B",
      number: 1,
      price: 2000000,
      createdDate: "04/30/2021",
    },
    {
      id: 10,
      type: 1,
      description: "Trả lương nhân viên C",
      number: 1,
      price: 2000000,
      createdDate: "04/30/2021",
    },
    {
      id: 11,
      type: 1,
      description: "Mua đèn",
      number: 2,

      price: 200000,
      createdDate: "04/20/2021",
    },
    {
      id: 12,
      type: 1,
      description: "Mua đèn",
      number: 2,

      price: 200000,
      createdDate: "04/20/2020",
    },
    {
      id: 13,
      type: 1,
      description: "Mua đèn",
      number: 2,
      price: 200000,
      createdDate: "04/20/2022",
    },
    {
      id: 14,
      type: 1,
      description: "Mua đèn",
      number: 2,
      price: 200000,
      createdDate: "04/25/2021",
    },
    {
      id: 15,
      type: 1,
      description: "Mua đèn",
      number: 2,
      price: 200000,
      createdDate: "04/25/2021",
    },
  ];
  const dataInBudget = [
    {
      id: 4,
      type: 0,
      description: "Phòng A101 đóng tiền điện nước",
      number: 1,
      price: 200000,
      createdDate: "04/20/2021",
    },
    {
      id: 5,
      type: 0,
      description: "Phòng A102 đóng tiền điện nước",
      number: 1,
      price: 200000,
      createdDate: "04/21/2021",
    },
  ];
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.defaultValue);
  };
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Mô tả",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "number",
      label: "Số lượng",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdDateNumber",
      label: "Ngày",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          moment(new Date(value)).format("DD/MM/YYYY"),
      },
    },
  ];
  const getHyphenatedDate = (dateString) =>
    moment(dateString, "MM/DD/YYYY").format("MM/DD/YYYY");
  const gridOutData = dataOutBudget.map((row) => {
    const updatedRow = {
      ...row,
      id: parseInt(row.id),
      description: `${row.description}`,
      number: row.number, // lastUpdateDate: row.lastUpdateDate,
      createdDate: getHyphenatedDate(row.createdDate),
      createdDateNumber: moment(row.createdDate, "MM/DD/YYYY")
        .toDate()
        .getTime(),
    };
    return updatedRow;
  });
  const gridInData = dataInBudget.map((row) => {
    const updatedRow = {
      ...row,
      id: parseInt(row.id),
      description: `${row.description}`,
      number: row.number, // lastUpdateDate: row.lastUpdateDate,
      createdDate: getHyphenatedDate(row.createdDate),
      createdDateNumber: moment(row.createdDate, "MM/DD/YYYY")
        .toDate()
        .getTime(),
    };
    return updatedRow;
  });
  const options = {
    filterType: "textField",
    selectableRows: false,
  };
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#re",
          },
          paper: {
            width: "1200px",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF",
          },
        },
      },
    });
  return (
    <div className="budget cmp">
      <div style={{ marginBottom: "20px" }}>Bảng thu chi của kí túc xá</div>
      <div className="budget-date-picker" style={{}}>
        <span style={{ fontSize: "16px" }}>Từ: </span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          dateFormat="dd/MM/yyyy"
          endDate={endDate}
          className={"budget-date-picker-calendar"}
        />
        <span style={{ fontSize: "16px", marginLeft: "20px" }}>Đến: </span>

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          dateFormat="dd/MM/yyyy"
          endDate={endDate}
          minDate={startDate}
          className={"budget-date-picker-calendar"}
        />
      </div>
      <div style={{ fontSize: "16px", marginTop: "20px" }}>
        <input
          type="radio"
          value="out"
          checked={selectedOption === "out"}
          onChange={handleOptionChange}
        />
        Chi
        <input
          type="radio"
          value="in"
          checked={selectedOption === "in"}
          onChange={handleOptionChange}
          style={{ marginLeft: "20px" }}
        />
        Thu
      </div>
      <div
        className={"budget-table"}
        style={{ marginTop: "20px", position: "sticky" }}
      >
        <Box
          component="div"
        >
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Account List"}
              data={selectedOption === "in" ? gridInData : gridOutData}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </Box>
      </div>
    </div>
  );
}
