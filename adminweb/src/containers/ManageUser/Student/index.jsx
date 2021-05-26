import "react-tabs/style/react-tabs.css";
import React, { useState, useEffect } from "react";
import Room from "./Room";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ReactModal from "react-modal";
import { getRoomDetails, getRooms } from "../../../redux/actions/humanResource";
import { getRoom } from "../../../utilities/constants/DataRender/checkroom";
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

  const hideModal = () => {
    setIsModalVisible(false);
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
            height: "15px",
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

  const handleDeletePeople = (params) => {
    console.log(params);
  };
  const convertDataForTable = (data) => {
    return data.list_user.map((n) => ({
      publicId: n.public_id,
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
        customBodyRender: () => {
          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeletePeople}
              style={({ marginLeft: "20px" }, { height: "25px" })}
            >
              Xoá
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "textField",

    pagination: false,
    selectableRows: false,
    customHeadRender: () => {
      return null;
    },
    onRowClick: (params, rowMeta) => {},
  };

  const handleClickAddPeopleWithParams = (params) => {
    console.log("AAAAAAAA", params);
  };

  return (
    <div className="col col-full pl-48">
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
