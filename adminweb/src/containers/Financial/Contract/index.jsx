import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./styles.css";
import * as ROUTER from "../../../utilities/constants/router";
import Box from "@material-ui/core/Box";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import ReactModal from "react-modal";
import AddBudget from "../Budget/AddBudget";
import { useHistory } from "react-router-dom";
import {
  getContracts,
  getListWaterElectricalBills,
} from "../../../redux/actions/financial";

export default function Budget() {
  let history = useHistory();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("contract");
  const [dataContracts, setDataContracts] = useState([]);
  const [dataBill, setDataBill] = useState([]);

  useEffect(() => {
    getContracts((output) => {
      if (output) {
        console.log("output", output);
        setDataContracts(output.results);
      }
    });

    getListWaterElectricalBills(
      "",
      `month=${moment(startDate).format("MM")}&year=${moment(startDate).format(
        "YYYY"
      )}`,
      (output) => {
        if (output) {
          console.log("output", output);
        }
      }
    );
  }, []);

  const dataInBudget = [
    {
      public_id: 4,
      water_electrical: {
        public_id: 1,
        room: { name: "101", slug: "101-b", number_now: 0 },
        month: 4,
        year: 2021,
        water_price: 89313,
        electrical_price: 891564,
      },
    },
    {
      public_id: 2,
      water_electrical: {
        public_id: 2,
        room: { name: "102", slug: "101-a", number_now: 0 },
        month: 4,
        year: 2021,
        water_price: 89313,
        electrical_price: 891564,
      },
    },
    {
      public_id: 3,
      water_electrical: {
        public_id: 3,
        room: { name: "103", slug: "101-b", number_now: 0 },
        month: 4,
        year: 2021,
        water_price: 89313,
        electrical_price: 891564,
      },
    },
  ];
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.defaultValue);
  };
  const contractColumn = [
    {
      label: "Thứ tự",
      name: "order",
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
    {
      name: "is_expired",
      label: "Ngày kết thúc",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value ? (
            <div style={{ color: "red" }}>Đã hết hạn</div>
          ) : (
            <div style={{ color: "green" }}>Chưa hết hạn</div>
          );
        },
      },
    },
  ];
  const billColumn = [
    {
      label: "Tên phòng",
      name: "room_name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Thời gian",
      name: "date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Giá điện",
      name: "water_price",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value),
      },
    },
    {
      label: "Giá nước",
      name: "electrical_price",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value),
      },
    },
  ];
  const formatData = (data) => {
    return data?.map((value, index) => {
      return {
        contractId: value.public_id,
        order: index + 1,
        roomName: value.room.name,
        studentName: `${value.profile.user.last_name} ${value.profile.user.first_name}`,
        studentPhone: value.profile.phone,
        studentClass: `${value.profile.my_class.name} ${value.profile.faculty.name}`,
        is_expired: value.is_expired,
        startDate: value.start_at,
        endDate: value.end_at,
      };
    });
  };
  const formatDataBill = (data) => {
    return data.map((index) => {
      return {
        id: index.id,
        water_electrical_id: index.water_electrical.id,
        room_name: index.water_electrical.room.name,
        date: `${index.water_electrical.month}/${index.water_electrical.year}`,
        water_price: index.water_electrical.water_price,
        electrical_price: index.water_electrical.electrical_price,
      };
    });
  };
  const getHyphenatedDate = (dateString) =>
    moment(dateString, "YYYY/MM/DD").format("YYYY/MM/DD");
  const gridContractData = formatData(dataContracts)?.map((row) => {
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
      number: row.number,
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
      `${ROUTER.ROUTE_MANAGE_FINANCIAL}${ROUTER.ROUTE_CONTRACT_DETAIL}/${
        dataContracts[rowMeta.rowIndex].public_id
      }`
    );
  };
  const options = {
    filterType: "textField",
    selectableRows: "none",
    onRowClick: selectedOption === "contract" ? handleRowClick : () => {},
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
  console.log("gridBillData", moment(startDate).format("MM"));
  if(dataContracts){
  return (
    <div>
      {dataContracts && (
        <div className="col col-full pl-48 ">
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
            <div
              style={{ fontSize: "16px", marginTop: "20px", width: "230px" }}
            >
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
          </span>
          <div
            className={"budget-table"}
            style={{ marginTop: "20px", position: "sticky" }}
          >
            <Box component="div" marginLeft={15}>
              <MuiThemeProvider theme={getMuiTheme()}>
                {selectedOption === "contract" ? (
                  <MUIDataTable
                    title={"Hợp đồng"}
                    data={gridContractData}
                    columns={contractColumn}
                    options={options}
                  />
                ) : (
                  <MUIDataTable
                    title={"Hoá đơn"}
                    data={gridBillData}
                    columns={billColumn}
                    options={options}
                  />
                )}
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
      )}
    </div>
  );
} else return (<div style={{fontSize:'30px',textAlign:'center',fontWeight:'700'}}>Không có dữ liệu hoặc bạn không có quyền để xem mục này</div>)
}
