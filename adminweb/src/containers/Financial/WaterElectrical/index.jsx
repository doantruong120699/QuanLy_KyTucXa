import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import Select from "react-select";
import ReactModal from "react-modal";
import DetailRoom from "./DetailRoom";
import queryString from "querystring";
import moment from "moment";
import "./styles.css";
import { getFinancial, getStatistical } from "../../../redux/actions/financial";
import { month as MONTH } from "../../../utilities/constants/titles";

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
        height={450}
        width={300}
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
              fontSize: "30px",
              paddingRight: "15px",
            }}
          >
            {props.percentage}%
          </Typography>
        </Box>
        <Box position="absolute" bottom={5}>
          <Typography variant="h3" component="div" color="textSecondary">
            {props.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

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

  useEffect(() => {
    const params = queryString.stringify(time);
    console.log(params);
    getStatistical(params, (output) => {
      if (output) {
        console.log(output);
        setData(output);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const handleClickBox = (areaSlug, areaname) => {
    const params = {
      year: time.year,
      month: time.month,
      area: areaSlug,
    };

    getFinancial(queryString.stringify(params), (output) => {
      if (output) {
        console.log(output);
        setTableData(output);
      }
    });
    setAreaSelected(areaname);
    setIsShowTable(true);
  };

  const [areaSelected, setAreaSelected] = useState("");
  const [isShowTable, setIsShowTable] = useState(false);

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
      headerName: "",
      field: "details",
      cellStyle: { textAlign: "center", cursor: "pointer" },
      resizeable: true,
      filter: false,
      cellRenderer: () => {
        return "<span style='color:blue'>Xem chi tiết</span>";
      },
    },
  ];
  const hideModal = () => {
    setIsModalVisible(false);
  };
  const handleCellClicked = (params) => {
    if (params.colDef.field === "details") {
      console.log("Xem chi tiet ne!", params);
      setIsModalVisible(true);
    }
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
  return (
    <div>
      {data && (
        <Box paddingRight={15} style={{ width: "100%" }}>
          <div className="col col-full">
            <div className="col col-half">
              <Typography>Lựa chọn tháng</Typography>
              <Select
                className="week-select"
                options={month}
                value={month.find((index) => index.value === time.month)}
                onChange={(params) => handleTimeChange(params, "month")}
              />
            </div>
            <div className="col col-half">
              <Typography>Lựa chọn năm</Typography>
              <Select
                className="week-select"
                options={year}
                value={year.find((index) => index.value === time.year)}
                onChange={(params) => handleTimeChange(params, "year")}
              />
            </div>
          </div>
          <div className="col col-full">
            <Grow in={true} timeout={1000} style={{ transformOrigin: "0 0 0" }}>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                {data.map((n, index) => {
                  return (
                    <CircularProgressWithLabel
                      key={index}
                      name={n.name}
                      value={10}
                      paid={n.paid}
                      total={n.total}
                      percentage={Number(((n.paid / n.total) * 100).toFixed(2))}
                      onClick={() => {
                        handleClickBox(n.name);
                      }}
                    />
                  );
                })}
              </Box>
            </Grow>
          </div>
          <Grow
            in={isShowTable}
            timeout={500}
            style={{ transformOrigin: "0 0 0" }}
          >
            <div className="dataTable">
              <div
                style={{
                  margin: "20px 0 20px 0",
                  fontSize: "40px",
                }}
              >
                {areaSelected}
              </div>

              {tableData && (
                <div className="ag-theme-alpine grid">
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
                </div>
              )}
            </div>
          </Grow>
          <ReactModal
            isOpen={isModalVisible}
            onRequestClose={hideModal}
            style={customStyles}
          >
            <DetailRoom />
          </ReactModal>
        </Box>
      )}
    </div>
  );
}
