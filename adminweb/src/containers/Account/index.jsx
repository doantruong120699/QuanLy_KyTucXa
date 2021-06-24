import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "../../components/common/Button";
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
import { getEmptyAccount } from "../../utilities/constants/DataRender/account";
export default function Account() {
  const [data, setData] = useState();
  const [isUpdate, setUpdate] = useState();
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
  }, [isUpdate]);

  function updateState() {
    setUpdate((prev) => !prev);
  }

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
            updateState={updateState}
            permission={permission}
            faculty={faculty}
            class_in_university={class_in_university}
            position={position}
            area={area}
          />
        ),
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

  if (data) {
    return (
      <div className="pl-24 pr-24">
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
              <div className="col col-full">
                <Button
                  type="normal-blue"
                  content="Tạo"
                  isDisable={false}
                  onClick={handleAddAccount}
                />
              </div>
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
            <AddAccount
              userInfor={getEmptyAccount()}
              hideModal={hideModal}
              updateState={updateState}
              isOpen={isModalVisible}
              permission={permission}
              faculty={faculty}
              class_in_university={class_in_university}
              position={position}
              area={area}
            />
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
