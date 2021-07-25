import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "./styles.css";
import * as ROUTER from "../../../utilities/constants/router";
import Box from "@material-ui/core/Box";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import ReactModal from "react-modal";
import { useHistory } from "react-router-dom";
import {
  getContracts,
  getListWaterElectricalBills,
  updateWaterElectricalIndex,
} from "../../../redux/actions/financial";
import Button from "../../../components/common/Button";

export default function Budget() {
  let history = useHistory();

  const loader = useSelector((state) => state.financial.loading);

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  const [selectedOption, setSelectedOption] = useState("contract");

  const [dataContracts, setDataContracts] = useState([]);

  const [dataBill, setDataBill] = useState([]);

  useEffect(() => {
    getContracts((output) => {
      if (output) {
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
          setDataBill(output.results);
        }
      }
    );
  }, [startDate]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.defaultValue);
  };
  const handlePayFee = (data) => {
    const slug = formatDataBill(dataBill).find(
      (index) => index.room_name === data
    ).public_id;
    const dataSend = { is_paid: true };
    updateWaterElectricalIndex(slug, dataSend);
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
      label: "Hết hạn",
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
    {
      label: "Tổng tiền",
      name: "total",
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
      label: "Tình trạng",
      name: "is_paid",
      options: {
        customBodyRender: (value) => {
          return (
            <div style={{ color: `${value === false ? "red" : "green"}` }}>
              {value === false ? "Chưa đóng tiền" : "Đã đóng tiền"}
            </div>
          );
        },
      },
    },
    {
      label: "Đóng tiền",
      name: "button",
      options: {
        customBodyRender: (button, tableMetaData) => {
          console.log("value", tableMetaData);
          return (
            <Button
              type="normal-red"
              content="đóng"
              isDisable={tableMetaData.rowData[5]}
              onClick={() => handlePayFee(tableMetaData.rowData[0])}
            />
          );
        },
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
        is_paid: index.is_paid,
        public_id: index.public_id,
        total:
          index.water_electrical.water_price +
          index.water_electrical.electrical_price,
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
  const gridBillData = formatDataBill(dataBill).map((row) => {
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

  if (dataBill) {
    return (
      <div>
        {
          /*dataContracts &&*/ dataBill && (
            <div className="col col-full pl-48 ">
              <div style={{ marginBottom: "20px" }}>
                Bảng thu chi của kí túc xá
              </div>
              <div className="budget-date-picker" style={{}}>
                <span style={{ fontSize: "16px" }}>Tháng: </span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  dateFormat="MM/yyyy"
                  endDate={endDate}
                  className={"budget-date-picker-calendar"}
                  showMonthYearPicker
                />
              </div>
              <span style={{ display: "flex" }}>
                <div
                  style={{
                    fontSize: "16px",
                    marginTop: "20px",
                    width: "230px",
                  }}
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
                <Box component="div" marginLeft={8}>
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
                </ReactModal>
              </div>
            </div>
          )
        }
      </div>
    );
  } else
    return (
      <div style={{ fontSize: "30px", textAlign: "center", fontWeight: "700" }}>
        Không có dữ liệu hoặc bạn không có quyền để xem mục này
      </div>
    );
}
