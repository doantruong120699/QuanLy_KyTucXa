import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ReactModal from "react-modal";
import AddAccount from "./AddAccount";
import MoreButton from "./MoreButton";

export default function Account() {
  const data = [
    {
      id: 1,
      firstName: "Anh",
      lastName: "To",
      account: "anh_to@datahouse.com",
      role: "Student",
      activeDate: "20/3/2020",
      isActive: true,
    },
    {
      id: 2,
      firstName: "Ben",
      lastName: "Phan",
      account: "ben_phan@datahouse.com",
      role: "Student",
      activeDate: "21/3/2020",
      isActive: false,
    },
    {
      id: 3,
      firstName: "Truong",
      lastName: "Doan",
      account: "doan_truong@demailam.com",
      role: "Student",
      activeDate: "20/4/2020",
      isActive: true,
    },
    {
      id: 4,
      firstName: "Quang",
      lastName: "Tran",
      account: "quang_tran@demailam.com",
      role: "Student",
      activeDate: "22/5/2020",
      isActive: true,
    },
    {
      id: 5,
      firstName: "Admin",
      lastName: "le",
      account: "admin_le@datahouse.com",
      role: "Super Admin",
      activeDate: "21/2/2017",
      isActive: true,
    },
    {
      id: 6,
      firstName: "Financial",
      lastName: "Admin",
      account: "financial_admin@demailam.com",
      role: "Student",
      activeDate: "21/3/2020",
      isActive: true,
    },
    {
      id: 7,
      firstName: "Human",
      lastName: "Resource",
      account: "human_resource@demailam.com",
      role: "Student",
      activeDate: "20/3/2020",
      isActive: true,
    },
    {
      id: 8,
      firstName: "Van",
      lastName: "Pham",
      account: "pham_van@demailam.com",
      role: "Staff",
      activeDate: "20/3/2020",
      isActive: true,
    },
    {
      id: 9,
      firstName: "Ton",
      lastName: "Hoang",
      account: "hoang_lan_ton@demailam.com",
      role: "Staff",
      activeDate: "20/3/2020",
      isActive: true,
    },
    {
      id: 10,
      firstName: "De Boer",
      lastName: "Frank",
      account: "fboer@demailam.com",
      role: "Student",
      activeDate: "20/3/2020",
      isActive: true,
    },
    {
      id: 11,
      firstName: "B",
      lastName: "Nguyen",
      account: "nguyen_b@demailam.com",
      role: "Staff",
      isActive: true,
      activeDate: "20/3/2020",
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
  const convertDataForTable = (data) => {
    return data.map((n) => ({
      name: n.lastName + " " + n.firstName,
      account: n.account,
      role: n.role,
      activeDate: n.activeDate,
      isActive: n.isActive,
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
      name: "role",
      label: "Role",
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
    {
      name: "isActive",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <div>{value === true ? "Enable" : "Disable"}</div>;
        },
      },
    },
    {
      label: "ACTION",
      name: "userId",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (userId, tableMetaData) => (
          <MoreButton rowUser={data[tableMetaData.rowIndex]} />
        ),
        setCellProps: () => ({ style: { width: "10px" } }),
      },
    },
  ];
  const handleRowClick = (_value, meta) => {};
  const options = {
    filterType: "textField",
    selectableRows: false,
    onRowClick: handleRowClick,
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
  };
  const handleAddAccount = () => {
    setIsModalVisible(true);
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
  return (
    <div className="account_page">
      <Box marginBottom={5}>
        <Typography variant="h4">Tài Khoản</Typography>
      </Box>
      <Box marginBottom={5}>
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
        <AddAccount />
      </ReactModal>
    </div>
  );
}
