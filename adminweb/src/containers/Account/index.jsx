import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect, useRef } from "react";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ReactModal from "react-modal";
import AddAccount from "./AddAccount";
import MoreButton from "./MoreButton";
import {
  getAccounts,
  getGroupAndPermission,
  getFaculty,
  getClass,
  getPosition,
  getArea,
  getNumberOfAccount,
} from "../../redux/actions/account";
import moment from "moment";
import YesNoModal from "../../components/YesNoModal";
import "./styles.css";
export default function Account() {
  const [data, setData] = useState();
  const [faculty, setFaculty] = useState();
  const [permission, setPermission] = useState();
  const [class_in_university, setClassInUniversity] = useState();
  const [position, setPosition] = useState();
  const [area, setArea] = useState();
  const [isMoreButtonModal, setIsMoreButtonModal] = useState(false);
  const [numberOfAccount, setNumberOfAccount] = useState();
  const tableStateRef = useRef();

  const columns = [
    {
      name: "name",
      label: "Tên",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "account",
      label: "Tài khoản",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Chức vụ",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "area",
      label: "Khu vực",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "my_class",
      label: "Lớp học phần",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "faculty",
      label: "Khoa",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "SĐT liên lạc",
      options: {
        filter: false,
        sort: true,
      },
    },
    // {
    //   name: "identify_card",
    //   label: "CCCD/CMND",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "activeDate",
      label: "Ngày kích hoạt",
      options: {
        filter: false,
        sort: true,
        display: false,
      },
    },
    {
      name: "is_active",
      label: "Trạng thái",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === true ? "green" : "red"}`}>
              {value === true ? "Mở" : "Khoá"}
            </div>
          );
        },
      },
    },
    {
      label: "Khác",
      name: "userId",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (userId, tableMetaData) => (
          <MoreButton
            rowUser={data[tableMetaData.rowIndex]}
            permission={permission}
            faculty={faculty}
            class_in_university={class_in_university}
            position={position}
            area={area}
            onCloseModal={handleCloseModal}
          />
        ),
        setCellProps: () => ({ style: { width: "10px" } }),
      },
    },
  ];
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#re",
          },
          paper: {
            width: "fit-content",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF",
          },
        },
      },
    });

  useEffect(() => {
    //console.log("RERENDER");
    if (setIsMoreButtonModal) {
      setIsMoreButtonModal(false);
    }
    getNumberOfAccount((output) => {
      // console.log("output.results", output.number_user);
      setNumberOfAccount(output.number_user);
    });
    const params = `page=${
      tableStateRef.current?.page ? tableStateRef.current.page + 1 : 1
    }`;
    getAccounts(params, (output) => {
      var data;
      if (output) {
        console.log("output",output)
        data = output.results.map((value, index) => {
          return {
            order: index + 1,
            publicId: value.public_id,
            firstName: value.user.first_name,
            lastName: value.user.last_name,
            account: value.user.username,
            role: value.position ? value.position.name : "--",
            faculty: value.faculty ? value.faculty.name : "--",
            my_class: value.my_class ? value.my_class.name : "--",
            area: value.area ? value.area.name : "--",
            phone: value.phone,
            birthday: value.birthday,
            address: value.address,
            identify_card: value.identify_card,
            is_active: value.user.is_active,
            activeDate: moment(new Date(value.created_at)).format("DD-MM-YYYY"),
          };
        });
        setData(data);
      }
    });
  }, [isMoreButtonModal]);
  useEffect(() => {
    getGroupAndPermission((output) => {
      if (output) {
        setPermission(output);
      }
    });

    getFaculty((output) => {
      if (output) {
        setFaculty(output);
      }
    });

    getClass((output) => {
      if (output) {
        setClassInUniversity(output);
      }
    });

    getPosition((output) => {
      if (output) {
        setPosition(output);
      }
    });

    getArea((output) => {
      if (output) {
        setArea(output);
      }
    });
  }, []);

  const convertDataForTable = (data) => {
    return data.map((n) => ({
      name: n.lastName + " " + n.firstName,
      account: n.account,
      role: n.role,
      area: n.area,
      faculty: n.faculty,
      my_class: n.my_class,
      phone: n.phone,
      birthday: n.birthday,
      identify_card: n.identify_card,
      activeDate: n.activeDate,
      is_active: n.is_active,
    }));
  };

  const handleRowClick = (_value, meta) => {};
  const handleCloseModal = () => {
    //console.log("AAAAA");
    setIsMoreButtonModal(true);
  };
  const options = {
    filter: false,
    selectableRows: "none",
    onRowClick: handleRowClick,
    serverSide: true,
    jumpToPage: true,
    count: numberOfAccount,
    searchPlaceholder: "Tìm kiếm theo tên hoặc tài khoản",
    //count, // Use total number of items
    onTableChange: (action, tableState, event) => {
      handleTableChange(action, tableState);
      //handleKeypress();
    },
  };
  const [isYesNoModalVisible, setIsYesNoModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
  };
  const handleTableChange = async (action, tableState) => {
    console.log("tableState", tableState);
    tableStateRef.current = tableState;
    switch (action) {
      case "changeRowsPerPage":
      case "changePage":
      case "sort":
      case "search":
      case "filterChange":
      case "resetFilters":
        handleTriggerAction();
        break;
      default:
        break;
    }
  };
  const handleTriggerAction = () => {
    const params = getActionParams();
    handleGetUser(params);
  };
  const handleGetUser = (params) => {
    console.log("params", params.search);
    const query = `page=${
      tableStateRef.current?.page ? tableStateRef.current.page + 1 : 1
    }${params.search !== null ? "&keyword=" + params.search : ""}`;
    getAccounts(query, (output) => {
      var data;
      if (output) {
        data = output.results.map((value, index) => {
          return {
            order: index + 1,
            publicId: value.public_id,
            firstName: value.user.first_name,
            lastName: value.user.last_name,
            account: value.user.username,
            role: value.position ? value.position.name : "--",
            faculty: value.faculty ? value.faculty.name : "--",
            my_class: value.my_class ? value.my_class.name : "--",
            area: value.area ? value.area.name : "--",
            phone: value.phone,
            birthday: value.birthday,
            address: value.address,
            identify_card: value.identify_card,
            is_active: value.is_active,
            activeDate: moment(new Date(value.created_at)).format("DD-MM-YYYY"),
          };
        });
        setData(data);
      }
    });
    getNumberOfAccount(query, (output) => {
      // console.log("output.results", output.number_user);
      setNumberOfAccount(output.number_user);
    });
  };
  const getActionParams = () => {
    const tableState = tableStateRef.current;
    const page = tableState?.page || 0;
    const searchText = tableState?.searchText;
    console.log(tableState);
    const params = {
      page: page,
      search: searchText,
    };

    return params;
  };
  const handleAddAccount = () => {
    setIsModalVisible(true);
  };
  const handleSuccessSubmit = () => {
    // console.log("ON SUCCESS");
    setIsModalVisible(false);
    const params = "";
    getAccounts(params, (output) => {
      var data;
      if (output) {
        data = output.results.map((value, index) => {
          return {
            order: index + 1,
            publicId: value.public_id,
            firstName: value.user.first_name,
            lastName: value.user.last_name,
            account: value.user.username,
            role: value.position ? value.position.name : null,
            is_active: value.is_active,
            activeDate: moment(new Date(value.created_at)).format("DD-MM-YYYY"),
          };
        });
        setData(data);
      }
    });
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "53%",
      right: "50%",
      bottom: "-40%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "scroll",
    },
    overlay: { zIndex: 1000 },
  };
  console.log("convertDataForTable(data)",data)
  if (data) {
    return (
      <div>
        {data && (
          <div className="account_page">
            <Box marginBottom={5} className="account-header">
              <YesNoModal
                isModalVisible={isYesNoModalVisible}
                hideModal={() => {}}
                title={"Xác nhận"}
                message={"Mời xác nhận"}
                okText={"OK"}
                cancelText={"Cancel"}
                onCancel={() => {
                  setIsYesNoModalVisible(false);
                }}
              />
              <div className="label"> Tài Khoản</div>
              <Box style={{ marginRight: "2%" }}>
                <Button
                  startIcon={<AddBoxIcon />}
                  style={{
                    backgroundColor: "#005CC8",
                    width: "200px",
                    color: "white",
                  }}
                  onClick={handleAddAccount}
                >
                  Thêm Tài Khoản
                </Button>
              </Box>
            </Box>

            <Box marginLeft={0}>
              <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  title={"Danh sách tài khoản trong hệ thống"}
                  data={convertDataForTable(data)}
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
              <AddAccount
                permission={permission}
                faculty={faculty}
                class_in_university={class_in_university}
                position={position}
                area={area}
                onSuccess={handleSuccessSubmit}
              />
            </ReactModal>
          </div>
        )}
      </div>
    );
  } else
    return (
      <div style={{ fontSize: "30px", textAlign: "center", fontWeight: "700" }}>
        Không có dữ liệu hoặc bạn không có quyền để xem mục này
      </div>
    );
}
