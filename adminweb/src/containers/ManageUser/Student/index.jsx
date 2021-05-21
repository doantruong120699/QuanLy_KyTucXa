import "react-tabs/style/react-tabs.css";
import React, { useState, useEffect } from "react";
import Room from "./Room";
import MUIDataTable from "mui-datatables";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./styles.css";
import ReactModal from "react-modal";
import { getRoomDetails, getRooms } from "../../../redux/actions/humanResource";
import { getRoom } from "../../../utilities/constants/dataRender/checkroom";
import queryString from "query-string";
import Pagination from "../../../components/common/Pagination";

export default function Student() {
  const [dataArea, setDataArea] = useState();
  const [peopleInRoom, setPeopleInRoom] = useState();

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  useEffect(() => {
    const paramsString = queryString.stringify(filter);

    const GetAllRooms = () => {
      getRooms(paramsString, (output) => {
        if (output) {
          const pagination = {
            page: output.current_page,
            page_size: output.page_size,
            totals: output.totals,
          };
          setDataArea(getRoom(output));
          setPagination(pagination);
        }
      });
    };
    GetAllRooms();
  }, [filter]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalNotiVisible, setIsModalNotiVisible] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
    setIsModalNotiVisible(false);
  };
  const AddButton = withStyles((theme) => ({
    root: {
      width: "100px",
      marginRight: "20px",
    },
  }))(Button);

  const DeleteButton = withStyles((theme) => ({
    root: {
      width: "100px",
    },
  }))(Button);

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
  const handleClickRoom = (slug) => {
    getRoomDetails(slug, (output) => {
      if (output) {
        setPeopleInRoom(convertDataForTable(output));
      }
    });
    setIsModalVisible(true);
  };

  const handleDeletePeople = (params) => {};
  const convertDataForTable = (data) => {
    return data.list_user.map((n) => ({
      name: n.last_name + " " + n.first_name,
      account: n.username,
      activeDate: n.birthday,
    }));
  };
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "account",
      label: "Account",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "activeDate",
      label: "Birthday",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "",
      label: "",
      options: {
        customBodyRender: (value) => {
          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={(params) => handleDeletePeople}
              style={{ marginLeft: "20px" }}
            >
              Xoá
            </Button>
          );
        },
      },
    },
  ];
  const handleClickAddPeople = () => {
    console.log("Add people");
  };

  const options = {
    filterType: "textField",
   
    pagination: true,
    selectableRows: false,
    customHeadRender: () => {
      return null;
    },
    onRowClick: (params, rowMeta) => {
      console.log("params", params);
      console.log("event", rowMeta);
    },
  };
  const dataNotification = [
    {
      id: 1,
      request: "requestRoom@demailam.com",
      roomRequested: 101,
      area: "A",
      createdDate: "05/09/2021",
    },
  ];
  const columnsNoti = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "request",
      label: "Email người gửi",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "roomRequested",
      label: "Phòng",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "area",
      label: "Khu",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdDate",
      label: "Ngày gửi yêu cầu",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "",
      label: "",
      options: {
        customBodyRender: (value) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={(params) => handleClickAddPeople}
              style={{ marginLeft: "20px" }}
            >
              Xác nhận
            </Button>
          );
        },
      },
    },
  ];
  const handleClickAddPeopleWithParams = (params) => {
    console.log("AAAAAAAA", params);
  };
  const handleOpenNotiModal = () => {
    setIsModalNotiVisible(true);
  };
  return (
    <div className="style-background-container">
      <Box>
        <Box
          className={"notification"}
          display={dataNotification.length > 0 ? "block" : "none"}
          boxShadow={1}
          borderRadius={5}
          marginBottom={5}
          color="red"
          width={350}
          textAlign="center"
          right={5}
          style={{ cursor: "pointer" }}
          onClick={handleOpenNotiModal}
        >
          <NotificationsIcon />
          <span
            style={{ marginLeft: "5px" }}
          >{`Có ${dataNotification.length} yêu cầu mới `}</span>
        </Box>
      </Box>
      <ReactModal
        isOpen={isModalNotiVisible}
        onRequestClose={hideModal}
        style={customStyles}
      >
        <div>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Yêu cầu vào phòng"}
              data={dataNotification}
              columns={columnsNoti}
              options={options}
            />
          </MuiThemeProvider>
        </div>
      </ReactModal>
      {dataArea &&
        dataArea.map((area, index) => {
          return (
            <div
              key={index}
              className="col col-full style-lg-box bg-color-white mb-24"
            >
              <p className="bold-text">{area.name}</p>
              {area.rooms.map((room, i) => {
                return (
                  <div key={i} className="col col-5 pd-8">
                    <Room
                      name={room.name}
                      maximum={room.typeroom.number_max}
                      numberNow={room.number_now}
                      onClick={() => handleClickRoom(room.slug)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      <ReactModal
        isOpen={isModalVisible}
        onRequestClose={hideModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"Thành viên trong phòng"}
              data={peopleInRoom}
              columns={columns}
              options={options}
            ></MUIDataTable>
          </MuiThemeProvider>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={(params) => handleClickAddPeopleWithParams}
            >
              Thêm người
            </Button>
          </div>
        </div>
      </ReactModal>
      <div className="col col-full">
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
