import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Select from "react-select";
import ReactModal from "react-modal";
import queryString from "querystring";
import ShowBill from "./ShowBill";
import "./styles.css";
import { getFinancial, getStatistical } from "../../../redux/actions/financial";
import { month as MONTH } from "../../../utilities/constants/titles";

export default function WaterElectrical() {
  const current = new Date();

  const [time, setTime] = useState({
    month: current.getMonth() + 1,
    year: current.getFullYear(),
  });

  const year = [];

  for (var i = current.getFullYear(); i > current.getFullYear() - 5; i--) {
    year.push({ value: i, label: i.toString() });
  }

  const month = MONTH;

  const [data, setData] = useState();

  const [tableData, setTableData] = useState();

  const [areaSelected, setAreaSelected] = useState();

  const [roomSelected, setRoomSelected] = useState();

  const [isShowTable, setIsShowTable] = useState(false);

  useEffect(() => {
    const params = queryString.stringify(time);
    getStatistical(params, (output) => {
      if (output) {
        setData(output);
        setIsShowTable(false);
      }
    });
  }, [time]);

  const handleClickBox = (areaname, areaSlug) => {
    const params = {
      year: time.year,
      month: time.month,
      area: areaSlug,
    };

    getFinancial(queryString.stringify(params), (output) => {
      if (output) {
        setTableData(output);
      }
    });

    setAreaSelected(areaname);
    setIsShowTable(true);
  };

  const onGridReady = (params) => {
    let _gridApi = params.api;
    _gridApi.forEachNode(function (rowNode, index) {
      rowNode.id = index;
    });
  };

  const handleTimeChange = (params, name) => {
    setTime({ ...time, [name]: params.value });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const columnDefs = [
    {
      field: "name",
      filter: "agTextColumnFilter",
      cellStyle: {
        fontSize: "20px",
        textAlign: "center",
      },
      cellRenderer: (param) => {
        return `<span style='color:blue'>${param.value}</span>`;
      },
    },

    {
      field: "isPaid",
      headerName: "Trạng thái",
      filter: "agTextColumnFilter",
      cellStyle: {
        color: "#2f80fd",
        textAlign: "center",
      },

      cellRenderer: (param) => {
        const bgColor = param.value === true ? "green;" : "#EB5757";
        return `<div style="color: ${bgColor};font-size:16px;text-align: center;">${
          param.value === true ? "Đã đóng tiền" : "Chưa đóng tiền"
        }</div>`;
      },
    },
    {
      field: "id",
      filter: "agNumberColumnFilter",
      cellStyle: {
        fontSize: "20px",
        textAlign: "center",
      },
    },
  ];
  const hideModal = () => {
    setIsModalVisible(false);
  };
  const handleCellClicked = (params) => {
    setRoomSelected(params.data);
    setIsModalVisible(true);
  };
  const onCancel = () => {
    setIsModalVisible(false);
  };
  const rowClassRules = {
    odd: function (params) {
      return params.node.rowIndex % 2 === 0;
    },
    even: function (params) {
      return params.node.rowIndex % 2 !== 0;
    },
  };
  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    floatingFilter: true,
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  console.log("Data", isShowTable);
  if (data !== undefined) {
    return (
      <div className="col col-full pl-48 pr-48">
        {data && (
          <Box paddingRight={15} style={{ width: "100%" }} display={"flex"}>
            <div className="col col-half">
              <div className="col col-two-third">
                <div className="col col-half  pd-8">
                  <Typography>Lựa chọn tháng</Typography>
                  <Select
                    className="week-select col-full"
                    options={month}
                    value={month.find((index) => index.value === time.month)}
                    onChange={(params) => handleTimeChange(params, "month")}
                  />
                </div>
                <div className="col col-half pd-8">
                  <Typography>Lựa chọn năm</Typography>
                  <Select
                    className="week-select col-full"
                    options={year}
                    value={year.find((index) => index.value === time.year)}
                    onChange={(params) => handleTimeChange(params, "year")}
                  />
                </div>
              </div>
              <div className="col col-full">
                <Box>
                  {data.map((n, index) => {
                    return (
                      <CircularProgressWithLabel
                        key={index}
                        name={n.name}
                        value={10}
                        paid={n.paid}
                        total={n.total}
                        percentage={
                          n.total !== 0
                            ? Number(((n.paid / n.total) * 100).toFixed(2))
                            : 0
                        }
                        onClick={() => {
                          handleClickBox(n.name, n.slug);
                        }}
                      />
                    );
                  })}
                </Box>
              </div>
            </div>
            {tableData ? (
              <div className="dataTable col col-half">
                <div
                  style={{
                    margin: "20px 0 20px 0",
                    fontSize: "20px",
                  }}
                >
                  {areaSelected}
                </div>

                <div className={"ag-theme-alpine grid"}>
                  {
                    <AgGridReact
                      animateRows
                      enableColResize
                      pagination={true}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      rowClassRules={rowClassRules}
                      onCellClicked={handleCellClicked}
                      getRowNodeId={(data) => data.name}
                      onGridReady={onGridReady}
                      rowData={tableData.room}
                      paginationAutoPageSize={true}
                    />
                  }
                </div>
              </div>
            ) : (
              <div style={{fontWeight:'700',fontSize:'24px'}}> Chọn vào một khu để hiện ra thông tin chi tiết</div>
            )}
            <ReactModal
              isOpen={isModalVisible}
              onRequestClose={hideModal}
              style={customStyles}
            >
              <ShowBill
                selectedMonth={time.month}
                selectedYear={time.year}
                room={roomSelected}
                area={areaSelected}
                onCancel={onCancel}
              />
            </ReactModal>
          </Box>
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

function CircularProgressWithLabel(props) {
  return (
    <Box
      id={1}
      position="relative"
      display="inline-flex"
      paddingTop="20px"
      style={{ cursor: "pointer", transformOrigin: "0 0 0" }}
      onClick={props.onClick}
    >
      <Box
        position="relative"
        display="inline-flex"
        boxShadow={2}
        height={350}
        width={200}
        justifyContent="center"
        marginRight={"20px"}
        marginBottom={"20px"}
        className="Box-component"
      >
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          justifyContent="center"
        >
          <Typography
            variant="h3"
            component="div"
            color="textSecondary"
            style={{ paddingTop: "20px" }}
          >
            {`${props.paid}/${props.total}`}
          </Typography>
        </Box>
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            component="div"
            color="textSecondary"
            style={{ paddingTop: "80px" }}
          >
            Còn thiếu {props.total - props.paid} phòng
          </Typography>
        </Box>
        <CircularProgress
          variant="determinate"
          color={"primary"}
          size={150}
          style={{
            color: "olivedrab",
            marginTop: "130px",
            position: "absolute",
          }}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          color={"primary"}
          size={150}
          style={{ color: "maroon", marginTop: "130px" }}
          value={props.percentage}
        />

        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          justifyContent="center"
        >
          <Typography
            variant="h5"
            component="div"
            color="textSecondary"
            style={{
              paddingTop: "190px",
              paddingLeft: "20px",
              fontSize: "18px",
              paddingRight: "15px",
            }}
          >
            {props.percentage}%
          </Typography>
        </Box>
        <Box position="absolute" bottom={5}>
          <Typography variant="h4" component="div" color="textSecondary">
            {props.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
