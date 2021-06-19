import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect } from "react";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
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
  useEffect(() => {
    const params = "";
    getAccounts(params, (output) => {
      var data;
      if (output) {
        console.log("output", output);
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
            isActive: true,
            activeDate: moment(new Date(value.created_at)).format("DD-MM-YYYY"),
          };
        });
        setData(data);
      }
    });
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

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          width: "fit-content",

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

  const convertDataForTable = (data) => {
    console.log("Data", data);
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
      isActive: n.isActive,
    }));
  };

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
        filter: true,
        sort: true,
      },
    },
    {
      name: "area",
      label: "Khu vực",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "my_class",
      label: "Lớp học phần",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "faculty",
      label: "Khoa",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "SĐT liên lạc",
      options: {
        filter: true,
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
        filter: true,
        sort: true,
      },
    },
    {
      name: "isActive",
      label: "Trạng thái",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <div>{value === true ? "Mở" : "Khoá"}</div>;
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
          />
        ),
        setCellProps: () => ({ style: { width: "10px" } }),
      },
    },
  ];
  const handleRowClick = (_value, meta) => {};

  const options = {
    filterType: "textField",
    selectableRows: "none",
    onRowClick: handleRowClick,
  };
  const [isYesNoModalVisible, setIsYesNoModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
  };
  const handleAddAccount = () => {
    setIsModalVisible(true);
  };
  const handleSuccessSubmit = () => {
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
            isActive: true,
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
  console.log("permission", permission);
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
                onOk={() => {
                  console.log("OK");
                }}
                onCancel={() => {
                  setIsYesNoModalVisible(false);
                }}
              />
              <Typography variant="h4" style={{ width: "100%" }}>
                Tài Khoản
              </Typography>
              <Box>
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
