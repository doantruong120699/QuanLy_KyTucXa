import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

export default function Account() {
  const data = [
    {
      id: 1,
      firstName: "Anh",
      lastName: "To",
      account: "anh_to@datahouse.com",
      role: "Student",
      activeDate: "20/3/2020",
    },
    {
      id: 2,
      firstName: "Ben",
      lastName: "Phan",
      account: "ben_phan@datahouse.com",
      role: "Student",
      activeDate: "21/3/2020",
    },
    {
      id: 3,
      firstName: "Truong",
      lastName: "Doan",
      account: "doan_truong@demailam.com",
      role: "Student",
      activeDate: "20/4/2020",
    },
    {
      id: 4,
      firstName: "Quang",
      lastName: "Tran",
      account: "quang_tran@demailam.com",
      role: "Student",
      activeDate: "22/5/2020",
    },
    {
      id: 5,
      firstName: "Admin",
      lastName: "le",
      account: "admin_le@datahouse.com",
      role: "Super Admin",
      activeDate: "21/2/2017",
    },
    {
      id: 6,
      firstName: "Financial",
      lastName: "Admin",
      account: "financial_admin@demailam.com",
      role: "Student",
      activeDate: "21/3/2020",
    },
    {
      id: 7,
      firstName: "Human",
      lastName: "Resource",
      account: "human_resource@demailam.com",
      role: "Student",
      activeDate: "20/3/2020",
    },
    {
      id: 8,
      firstName: "Van",
      lastName: "Pham",
      account: "pham_van@demailam.com",
      role: "Staff",
      activeDate: "20/3/2020",
    },
    {
      id: 9,
      firstName: "Ton",
      lastName: "Hoang",
      account: "hoang_lan_ton@demailam.com",
      role: "Staff",
      activeDate: "20/3/2020",
    },
    {
      id: 10,
      firstName: "De Boer",
      lastName: "Frank",
      account: "fboer@demailam.com",
      role: "Student",
      activeDate: "20/3/2020",
    },
    {
      id: 11,
      firstName: "B",
      lastName: "Nguyen",
      account: "nguyen_b@demailam.com",
      role: "Staff",
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
  ];

  const options = {
    filterType: "textField",
  };

  return (
    <div className="account_page">
      <Box marginBottom={10}>
        <Typography variant="h4">Tài Khoản</Typography>
      </Box>
      <Box marginLeft={0}>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Account List"}
            data={convertDataForTable(data)}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </Box>
    </div>
  );
}
