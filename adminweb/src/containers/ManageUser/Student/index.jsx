import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router-dom";
import * as ROUTER from "../../../utilities/constants/router";
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
import React, { useState } from "react";
import ReactModal from "react-modal";

export default function Student() {
  const dataArea = [
    {
      id: 1,
      name: "A",
      slug: "a",
      rooms: [
        {
          id: 1,
          name: "101",
          slug: "101",
          number_now: 5,
          typeroom: {
            id: 1,
            name: "Type 1",
            price: 200000,
            number_max: 8,
            slug: "type-1",
          },
          area: {
            id: 1,
            name: "A",
            slug: "a",
          },
          status: "F",
          created_at: "2021-03-15T14:40:15.339962Z",
          last_update: "2021-03-18T15:36:20.411397Z",
        },
        {
          id: 2,
          name: "102",
          slug: "102",
          number_now: 4,
          typeroom: {
            id: 2,
            name: "Type 2",
            price: 150000,
            number_max: 8,
            slug: "type-2",
          },
          area: {
            id: 1,
            name: "A",
            slug: "a",
          },
          status: "F",
          created_at: "2021-03-15T14:40:37.232087Z",
          last_update: "2021-04-07T09:14:11.123500Z",
        },
        {
          id: 3,
          name: "103",
          slug: "103",
          number_now: 4,
          typeroom: {
            id: 1,
            name: "Type 1",
            price: 200000,
            number_max: 8,
            slug: "type-1",
          },
          area: {
            id: 1,
            name: "A",
            slug: "a",
          },
          status: "A",
          created_at: "2021-04-14T07:34:53.112768Z",
          last_update: "2021-04-21T16:06:51.341576Z",
        },
      ],
    },
    {
      id: 2,
      name: "B",
      slug: "b",
      rooms: [
        {
          id: 4,
          name: "101",
          slug: "101",
          number_now: 5,
          typeroom: {
            id: 1,
            name: "Type 1",
            price: 200000,
            number_max: 8,
            slug: "type-1",
          },
          area: {
            id: 2,
            name: "B",
            slug: "b",
          },
          status: "F",
          created_at: "2021-03-15T14:40:15.339962Z",
          last_update: "2021-03-18T15:36:20.411397Z",
        },
        {
          id: 5,
          name: "102",
          slug: "102",
          number_now: 4,
          typeroom: {
            id: 2,
            name: "Type 2",
            price: 150000,
            number_max: 8,
            slug: "type-2",
          },
          area: {
            id: 2,
            name: "B",
            slug: "b",
          },
          status: "F",
          created_at: "2021-03-15T14:40:37.232087Z",
          last_update: "2021-04-07T09:14:11.123500Z",
        },
        {
          id: 6,
          name: "103",
          slug: "103",
          number_now: 4,
          typeroom: {
            id: 1,
            name: "Type 1",
            price: 200000,
            number_max: 8,
            slug: "type-1",
          },
          area: {
            id: 2,
            name: "B",
            slug: "b",
          },
          status: "F",
          created_at: "2021-04-14T07:34:53.112768Z",
          last_update: "2021-04-21T16:06:51.341576Z",
        },
      ],
    },
    {
      id: 4,
      name: "C",
      slug: "c",
      rooms: [
        {
          id: 7,
          name: "101",
          slug: "101",
          number_now: 5,
          typeroom: {
            id: 1,
            name: "Type 1",
            price: 200000,
            number_max: 8,
            slug: "type-1",
          },
          area: {
            id: 3,
            name: "C",
            slug: "c",
          },
          status: "F",
          created_at: "2021-03-15T14:40:15.339962Z",
          last_update: "2021-03-18T15:36:20.411397Z",
        },
        {
          id: 8,
          name: "102",
          slug: "102",
          number_now: 4,
          typeroom: {
            id: 2,
            name: "Type 2",
            price: 150000,
            number_max: 8,
            slug: "type-2",
          },
          area: {
            id: 3,
            name: "C",
            slug: "c",
          },
          status: "F",
          created_at: "2021-03-15T14:40:37.232087Z",
          last_update: "2021-04-07T09:14:11.123500Z",
        },
        {
          id: 9,
          name: "103",
          slug: "103",
          number_now: 4,
          typeroom: {
            id: 1,
            name: "Type 1",
            price: 200000,
            number_max: 8,
            slug: "type-1",
          },
          area: {
            id: 3,
            name: "C",
            slug: "c",
          },
          status: "A",
          created_at: "2021-04-14T07:34:53.112768Z",
          last_update: "2021-04-21T16:06:51.341576Z",
        },
      ],
    },
  ];

  const room = [
    {
      id: 1,
      name: "101",
      slug: "101",
      number_now: 5,
      typeroom: {
        id: 1,
        name: "Type 1",
        price: 200000,
        number_max: 8,
        slug: "type-1",
      },
      area: {
        id: 1,
        name: "A",
        slug: "a",
      },
      status: "F",
      created_at: "2021-03-15T14:40:15.339962Z",
      last_update: "2021-03-18T15:36:20.411397Z",
    },
    {
      id: 2,
      name: "102",
      slug: "102",
      number_now: 4,
      typeroom: {
        id: 2,
        name: "Type 2",
        price: 150000,
        number_max: 8,
        slug: "type-2",
      },
      area: {
        id: 1,
        name: "A",
        slug: "a",
      },
      status: "F",
      created_at: "2021-03-15T14:40:37.232087Z",
      last_update: "2021-04-07T09:14:11.123500Z",
    },
    {
      id: 3,
      name: "103",
      slug: "103",
      number_now: 4,
      typeroom: {
        id: 1,
        name: "Type 1",
        price: 200000,
        number_max: 8,
        slug: "type-1",
      },
      area: {
        id: 1,
        name: "A",
        slug: "a",
      },
      status: "A",
      created_at: "2021-04-14T07:34:53.112768Z",
      last_update: "2021-04-21T16:06:51.341576Z",
    },

    {
      id: 4,
      name: "101",
      slug: "101",
      number_now: 5,
      typeroom: {
        id: 1,
        name: "Type 1",
        price: 200000,
        number_max: 8,
        slug: "type-1",
      },
      area: {
        id: 2,
        name: "B",
        slug: "b",
      },
      status: "F",
      created_at: "2021-03-15T14:40:15.339962Z",
      last_update: "2021-03-18T15:36:20.411397Z",
    },
    {
      id: 5,
      name: "102",
      slug: "102",
      number_now: 4,
      typeroom: {
        id: 2,
        name: "Type 2",
        price: 150000,
        number_max: 8,
        slug: "type-2",
      },
      area: {
        id: 2,
        name: "B",
        slug: "b",
      },
      status: "F",
      created_at: "2021-03-15T14:40:37.232087Z",
      last_update: "2021-04-07T09:14:11.123500Z",
    },
    {
      id: 6,
      name: "103",
      slug: "103",
      number_now: 4,
      typeroom: {
        id: 1,
        name: "Type 1",
        price: 200000,
        number_max: 8,
        slug: "type-1",
      },
      area: {
        id: 2,
        name: "B",
        slug: "b",
      },
      status: "F",
      created_at: "2021-04-14T07:34:53.112768Z",
      last_update: "2021-04-21T16:06:51.341576Z",
    },
    {
      id: 7,
      name: "101",
      slug: "101",
      number_now: 5,
      typeroom: {
        id: 1,
        name: "Type 1",
        price: 200000,
        number_max: 8,
        slug: "type-1",
      },
      area: {
        id: 3,
        name: "C",
        slug: "c",
      },
      status: "F",
      created_at: "2021-03-15T14:40:15.339962Z",
      last_update: "2021-03-18T15:36:20.411397Z",
    },
    {
      id: 8,
      name: "102",
      slug: "102",
      number_now: 4,
      typeroom: {
        id: 2,
        name: "Type 2",
        price: 150000,
        number_max: 8,
        slug: "type-2",
      },
      area: {
        id: 3,
        name: "C",
        slug: "c",
      },
      status: "F",
      created_at: "2021-03-15T14:40:37.232087Z",
      last_update: "2021-04-07T09:14:11.123500Z",
    },
    {
      id: 9,
      name: "103",
      slug: "103",
      number_now: 4,
      typeroom: {
        id: 1,
        name: "Type 1",
        price: 200000,
        number_max: 8,
        slug: "type-1",
      },
      area: {
        id: 3,
        name: "C",
        slug: "c",
      },
      status: "A",
      created_at: "2021-04-14T07:34:53.112768Z",
      last_update: "2021-04-21T16:06:51.341576Z",
    },
  ];
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
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
  const handleClickRoom = () => {
    console.log("Room is clicked");
    setIsModalVisible(true);
  };
  const peopleInARoom = [
    {
      id: 1,
      firstName: "Anh",
      lastName: "To",
      account: "anh_to@datahouse.com",
      activeDate: "20/3/2020",
    },
    {
      id: 2,
      firstName: "Ben",
      lastName: "Phan",
      account: "ben_phan@datahouse.com",
      activeDate: "21/3/2020",
    },
    {
      id: 3,
      firstName: "Truong",
      lastName: "Doan",
      account: "doan_truong@demailam.com",
      activeDate: "20/4/2020",
    },
    {
      id: 4,
      firstName: "Quang",
      lastName: "Tran",
      account: "quang_tran@demailam.com",
      activeDate: "22/5/2020",
    },
  ];
  const convertDataForTable = (data) => {
    return data.map((n) => ({
      name: n.lastName + " " + n.firstName,
      account: n.account,
      activeDate: n.activeDate,
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
      label: "Active Date",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const handleClickAddPeople = () => {
    console.log("Add people");
  };
  const handleClickDeletePeople = () => {
    console.log("Delete people");
  };
  const options = {
    filterType: "textField",
    customFooter: () => {
      return;
    },
    customHeadRender: () => {
      return null;
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
  return (
    <div className="style-background-container">
      <Box>
        <Box
        className={"notification"}
          display={dataNotification.length > 0 ? "block" : "none"}
          boxShadow={1}
          borderRadius={5}
          backgroundColor={"palevioletred"}
          marginBottom={5}
          color="red"
          width={350}
          textAlign="center"
          right={5}
          style={{cursor:"pointer"}}
        >
          <NotificationsIcon />
          <span
            style={{ marginLeft: "5px" }}
          >{`Có ${dataNotification.length} yêu cầu mới `}</span>
        </Box>
      </Box>
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
                      onClick={handleClickRoom}
                    />
                    <ReactModal
                      isOpen={isModalVisible}
                      onRequestClose={hideModal}
                      style={customStyles}
                    >
                      <div>
                        <MuiThemeProvider theme={getMuiTheme()}>
                          <MUIDataTable
                            title={"Thành viên trong phòng"}
                            data={convertDataForTable(peopleInARoom)}
                            columns={columns}
                            options={options}
                          />
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
                            onClick={handleClickAddPeople}
                          >
                            Thêm người
                          </Button>
                        </div>
                      </div>
                    </ReactModal>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
