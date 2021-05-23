import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./styles.css";
import * as ROUTER from "../../../utilities/constants/router";

import Box from "@material-ui/core/Box";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ReactModal from "react-modal";
import AddBudget from "../Budget/AddBudget";
import {useHistory } from "react-router-dom";

export default function Budget() {
  let history = useHistory();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("contract");
  const dataContract = [
    {
      public_id: "123abcde",
      room: {
        id: 3,
        name: "101",
        slug: "101",
        number_now: 5,
      },
      profile: {
        id: 1,
        lastName: "Anh",
        firstName: "To",
        phone: "0786662297",
        faculty: "CNTT",
        class: "17T1",
      },
      start_at: "2021-03-01",
      end_at: "2021-03-23",
      payment_method: {
        id: 1,
        name: "Banking",
      },
      is_expired: false,
    },
    {
      public_id: "123abcdef",

      room: {
        id: 4,
        name: "102",
        slug: "102",
        number_now: 5,
      },
      profile: {
        id: 2,
        lastName: "Truong",
        firstName: "Doan",
        phone: "08989789",
        faculty: "CNTT",
        class: "17T1",
      },
      start_at: "2020-03-01",
      end_at: "2021-03-23",
      payment_method: {
        id: 1,
        name: "Banking",
      },
      is_expired: true,
    },
    {
      public_id: "123abcdefg",

      room: {
        id: 5,
        name: "103",
        slug: "103",
        number_now: 5,
      },
      profile: {
        id: 1,
        lastName: "Ben",
        firstName: "Phan",
        phone: "081289037",
        faculty: "CNTT",
        class: "17T1",
      },
      start_at: "2019-03-01",
      end_at: "2021-03-23",
      payment_method: {
        id: 1,
        name: "Banking",
      },
      is_expired: false,
    },
    {
      public_id: "123abcdegh",

      room: {
        id: 7,
        name: "105",
        slug: "105",
        number_now: 5,
      },
      profile: {
        id: 7,
        lastName: "Quang",
        firstName: "Tran",
        phone: "089028189",
        faculty: "CNTT",
        class: "17T1",
      },
      start_at: "2021-05-01",
      end_at: "2021-07-23",
      payment_method: {
        id: 1,
        name: "Banking",
      },
      is_expired: false,
    },
    {
      public_id: "123abcdeyij",

      room: {
        id: 3,
        name: "101",
        slug: "101",
        number_now: 5,
      },
      profile: {
        id: 1,
        lastName: "Thao",
        firstName: "Hoang",
        phone: "018923789",
        faculty: "CNTT",
        class: "17T1",
      },
      start_at: "2021-03-01",
      end_at: "2021-03-23",
      payment_method: {
        id: 1,
        name: "Banking",
      },
      is_expired: false,
    },
  ];
  const dataInBudget = [
    {
      id: 4,
      type: 0,
      description: "Phòng A101 đóng tiền điện nước",
      number: 1,
      createdBy: "anh_to@datahouse.com",

      price: 200000,
      createdDate: "04/20/2021",
    },
    {
      id: 5,
      type: 0,
      description: "Phòng A102 đóng tiền điện nước",
      number: 1,
      createdBy: "anh_to@datahouse.com",

      price: 200000,
      createdDate: "04/21/2021",
    },
  ];
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.defaultValue);
  };
  const columns = [
    {
      label: "ID Phòng",
      name: "roomId",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "roomName",
      label: "Tên Phòng",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "studentName",
      label: "Tên Sinh Viên",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "studentPhone",
      label: "SĐT liên lạc",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "studentClass",
      label: "Lớp",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "startDate",
      label: "Ngày bắt đầu",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          moment(new Date(value)).format("DD/MM/YYYY"),
      },
    },
    {
      name: "endDate",
      label: "Ngày kết thúc",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          moment(new Date(value)).format("DD/MM/YYYY"),
      },
    },
  ];
  const formatData = (data) => {
    return data.map((index) => {
      return {
        contractId: index.public_id,
        roomId: index.room.id,
        roomName: index.room.name,
        studentName: `${index.profile.lastName} ${index.profile.firstName}`,
        studentPhone: index.profile.phone,
        studentClass: `${index.profile.class} ${index.profile.faculty}`,
        startDate: index.start_at,
        endDate: index.end_at,
      };
    });
  };
  const getHyphenatedDate = (dateString) =>
    moment(dateString, "YYYY/MM/DD").format("YYYY/MM/DD");
  const gridContractData = formatData(dataContract).map((row) => {
    const updatedRow = {
      ...row,
      startDate: getHyphenatedDate(row.startDate),
      startDateNumber: moment(row.startDate, "YYYY/MM/DD").toDate().getTime(),

      endDate: getHyphenatedDate(row.endDate),
      endDateNumber: moment(row.endDate, "YYYY/MM/DD").toDate().getTime(),
    };
    return updatedRow;
  });
  const gridBillData = dataInBudget.map((row) => {
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
  const handleRowClick = (params, rowMeta) => {
    console.log("params", params, "meta", rowMeta);
    
    history.push(
      `${ROUTER.ROUTE_CONTRACT_DETAIL}/${dataContract[rowMeta.rowIndex].public_id}`
    );
  };
  const options = {
    filterType: "textField",
    selectableRows: false,
    onRowClick: handleRowClick,
  };
  const handleAddBudget = () => {
    setIsModalVisible(true);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
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
    <div className="col col-full pl-48">
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
      <span style={{ display: "flex" }}>
        <div style={{ fontSize: "16px", marginTop: "20px", width: "230px" }}>
          <input
            type="radio"
            value="contract"
            checked={selectedOption === "contract"}
            onChange={handleOptionChange}
          />
          Hợp đồng
          <input
            type="radio"
            value="bill"
            checked={selectedOption === "bill"}
            onChange={handleOptionChange}
            style={{ marginLeft: "20px" }}
          />
          Hoá đơn
        </div>
        <Button
          startIcon={<AddBoxIcon />}
          style={{
            marginLeft: "75%",
            backgroundColor: "#005CC8",
            width: "100px",
            color: "white",
          }}
          onClick={handleAddBudget}
        >
          Thêm
        </Button>
      </span>
      <div
        className={"budget-table"}
        style={{ marginTop: "20px", position: "sticky" }}
      >
        <Box component="div">
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={selectedOption === "contract" ? "Hoá đơn" : "Hợp đồng"}
              data={
                selectedOption === "contract" ? gridContractData : gridBillData
              }
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </Box>
        <ReactModal
          isOpen={isModalVisible}
          onRequestClose={hideModal}
          style={customStyles}
        >
          <AddBudget />
        </ReactModal>
      </div>
    </div>
  );
}
