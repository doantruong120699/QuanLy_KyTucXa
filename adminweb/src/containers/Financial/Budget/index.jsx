import React, { useState, useEffect } from "react";
import "./styles.css";
import Box from "@material-ui/core/Box";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ReactModal from "react-modal";
import AddBudget from "./AddBudget";
import { getExpenses, getRevenue } from "../../../redux/actions/financial";

export default function Budget() {
  const [selectedOption, setSelectedOption] = useState("out");
  const [dataOutBudget, setDataOutBudget] = useState([]);
  const [dataInBudget, setDataOutbudget] = useState([]);

  useEffect(() => {
    getExpenses((output) => {
      if (output) {
        console.log("BBBB", output);

        const data = output.results.map((value, index) => {
          return {
            order: index + 1,
            type: value.type_expense.name,
            description: value.description,
            createdBy:
              value.created_by.first_name + " " + value.created_by.last_name,
            price: value.price,
            createdDate: moment(new Date(value.created_at)).format(
              "DD-MM-YYYY"
            ),
          };
        });
        setDataOutBudget(data);
      }
    });

    getRevenue((output) => {
      if (output) {
        console.log("AAAA", output);
        const data = output.results.map((value, index) => {
          return {
            order: index + 1,
            type: value.type_revenue.name,
            description: value.description,
            createdBy:
              value.created_by.first_name + " " + value.created_by.last_name,
            price: value.amount,
            createdDate: moment(new Date(value.created_at)).format(
              "DD-MM-YYYY"
            ),
          };
        });
        setDataOutbudget(data);
      }
    });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.defaultValue);
  };

  const columns = [
    {
      name: "order",
      label: "Thứ tự",
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
      name: "createdBy",
      label: "Người chịu trách nhiệm",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price",
      label: "Giá tiền",
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
    moment(dateString, "DD-MM-YYYY").format("DD-MM-YYYY");
  const gridOutData = dataOutBudget.map((row) => {
    const updatedRow = {
      ...row,
      order: parseInt(row.order),
      description: `${row.description}`,
      number: row.number,
      createdDate: getHyphenatedDate(row.createdDate),
      createdDateNumber: moment(row.createdDate, "DD-MM-YYYY")
        .toDate()
        .getTime(),
    };
    return updatedRow;
  });

  const gridInData = dataInBudget.map((row) => {
    const updatedRow = {
      ...row,
      order: parseInt(row.order),
      description: `${row.description}`,
      number: row.number,
      createdDate: getHyphenatedDate(row.createdDate),
      createdDateNumber: moment(row.createdDate, "DD-MM-YYYY")
        .toDate()
        .getTime(),
    };
    return updatedRow;
  });

  const options = {
    filterType: "textField",
    selectableRows: "none",
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
  console.log("dataInBudget && dataOutBudget", dataInBudget.length === 0 && dataOutBudget.length === 0);
  if (!(dataInBudget.length === 0 && dataOutBudget.length === 0)) {
    return (
      <div className="col col-full pl-48">
        {dataInBudget && dataOutBudget && (
          <div style={{ marginLeft: "5%" }}>
            <div>Bảng thu chi của kí túc xá</div>
            <span style={{ display: "flex" }}>
              <div style={{ fontSize: "16px", marginTop: "20px" }}>
                <input
                  type="radio"
                  value="out"
                  checked={selectedOption === "out"}
                  onChange={handleOptionChange}
                  style={{ marginRight: "10px" }}
                />
                Chi
                <input
                  type="radio"
                  value="in"
                  checked={selectedOption === "in"}
                  onChange={handleOptionChange}
                  style={{ margin: "0px 10px" }}
                />
                Thu
              </div>
              <Button
                startIcon={<AddBoxIcon />}
                style={{
                  marginLeft: "70%",
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
                    title={selectedOption === "in" ? "Bảng thu" : "Bảng chi"}
                    data={selectedOption === "in" ? gridInData : gridOutData}
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
        )}
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: "center", fontWeight: "700", fontSize: "24px" }}>
        {" "}
        Không có dữ liệu
      </div>
    );
  }
}
