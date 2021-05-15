import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import ReactModal from "react-modal";
import DetailRoom from "./DetailRoom";

import "./styles.css";

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
        height={400}
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
            {`${props.paid.length}/${props.array.length}`}
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
            {`Còn thiếu ${props.unpaid.length} phòng`}
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
            {`${props.percentage}%`}
          </Typography>
        </Box>
        <Box position="absolute" bottom={5}>
          <Typography variant="h3" component="div" color="textSecondary">
            {`Khu ${props.name}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function WaterElectrical() {
  const history = useHistory();

  const [data, setData] = useState([
    {
      id: 1,
      name: "A",
      room: [
        {
          name: "101",
          isPaid: true,
        },
        {
          name: "102",
          isPaid: false,
        },
        {
          name: "103",
          isPaid: true,
        },
        {
          name: "104",
          isPaid: false,
        },
        {
          name: "201",
          isPaid: true,
        },
        {
          name: "202",
          isPaid: false,
        },
        {
          name: "203",
          isPaid: false,
        },
        {
          name: "204",
          isPaid: true,
        },
        {
          name: "301",
          isPaid: true,
        },
        {
          name: "302",
          isPaid: false,
        },
        {
          name: "303",
          isPaid: true,
        },
        {
          name: "304",
          isPaid: true,
        },
      ],
    },
    {
      id: 2,
      name: "B",
      room: [
        {
          name: "101",
          isPaid: false,
        },
        {
          name: "102",
          isPaid: false,
        },
        {
          name: "103",
          isPaid: true,
        },
        {
          name: "104",
          isPaid: true,
        },
        {
          name: "201",
          isPaid: false,
        },
        {
          name: "202",
          isPaid: false,
        },
        {
          name: "203",
          isPaid: true,
        },
        {
          name: "204",
          isPaid: true,
        },
        {
          name: "301",
          isPaid: false,
        },
        {
          name: "302",
          isPaid: false,
        },
        {
          name: "303",
          isPaid: true,
        },
        {
          name: "304",
          isPaid: true,
        },
      ],
    },
    {
      id: 3,
      name: "C",
      room: [
        {
          name: "101",
          isPaid: true,
        },
        {
          name: "102",
          isPaid: true,
        },
        {
          name: "103",
          isPaid: true,
        },
        {
          name: "104",
          isPaid: true,
        },
        {
          name: "201",
          isPaid: true,
        },
        {
          name: "202",
          isPaid: true,
        },
        {
          name: "203",
          isPaid: true,
        },
        {
          name: "204",
          isPaid: true,
        },
        {
          name: "301",
          isPaid: false,
        },
        {
          name: "302",
          isPaid: true,
        },
        {
          name: "303",
          isPaid: true,
        },
        {
          name: "304",
          isPaid: true,
        },
      ],
    },
  ]);
  //const [detailedRoom,setDetailedRoom]
  const [tabSelected, setTabSelected] = useState(1);
  const [areaSelected, setAreaSelected] = useState("");
  const [isShowTable, setIsShowTable] = useState(false);
  const [tableData, setTableData] = useState(data.filter((n) => n.id === 1));
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const onGridReady = (params) => {
    let _gridApi = params.api;
    _gridApi.forEachNode(function (rowNode, index) {
      rowNode.id = index;
    });
    setGridApi(_gridApi);
    setGridColumnApi(params.columnApi);
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
      cellRenderer: (param) => {
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

  const handleClickBox = (id) => {
    setAreaSelected(data.filter((n) => n.id === id)[0].name);

    if (tabSelected !== id) {
      setTabSelected(id);
      setTableData(data.filter((n) => n.id === id));
      //console.log("AAAA", data.filter((n) => n.id === id)[0].name);
      setIsShowTable(true);
    } else setIsShowTable(!isShowTable);
  };
  //const data =
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

  return (
    <Box paddingRight={15} style={{ width: "100%" }}>
      <Grow in={true} timeout={1000} style={{ transformOrigin: "0 0 0" }}>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          {data.map((n) => {
            const array = n.room;
            const paid = array.filter((m) => m.isPaid === true);
            const unpaid = array.filter((m) => m.isPaid === false);
            return (
              <CircularProgressWithLabel
                name={n.name}
                array={array}
                paid={paid}
                unpaid={unpaid}
                percentage={((paid.length / array.length) * 100).toFixed(2)}
                availableRoom={n.availableRoom}
                onClick={() => {
                  handleClickBox(n.id);
                }}
              />
            );
          })}
        </Box>
      </Grow>
      <Grow in={isShowTable} timeout={500} style={{ transformOrigin: "0 0 0" }}>
        <div className={"dataTable"}>
          <div
            style={{
              margin: "20px 0 20px 0",
              fontSize: "40px",
            }}
          >{`Khu ${areaSelected}`}</div>

          <div className={"ag-theme-alpine grid"}>
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
              rowData={tableData[0].room}
              paginationAutoPageSize={true}

            />
          </div>
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
  );
}
