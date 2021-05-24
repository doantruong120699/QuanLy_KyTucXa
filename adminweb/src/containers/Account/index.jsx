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
import { getAccounts } from "../../redux/actions/account";
import moment from "moment";

export default function Account() {
  const [data, setData] = useState();

  useEffect(() => {
    const params = "";
    getAccounts(params, (output) => {
      var data;
      if (output) {
        data = output.results.map((value, index) => {
          return {
            order: index + 1,
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
  }, []);

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
    <div>
      {data && (
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
      )}
    </div>
  );
}
