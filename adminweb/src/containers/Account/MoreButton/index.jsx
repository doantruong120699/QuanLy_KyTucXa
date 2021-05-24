import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Button, createMuiTheme, Menu, MenuItem } from "@material-ui/core";
import ReactModal from "react-modal";
import AddAccount from "../AddAccount/index";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function MoreButton(rowUser) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = {
    email: "admin@gmail.com",
    username: "admin@gmail.com",
    first_name: "Nam",
    last_name: "Trần",
    id: 13,
    room: {},
    group_list: [1, 2, 3],
    permissions_list: [33, 34, 35],
    profile: {
      birthday: "2021-05-18",
      address: "Liên Chiểu Đà Nẵng",
      identify_card: "1234567898",
      gender: true,
      phone: "0388012232",
      created_at: "2021-05-18T15:37:00.102536Z",
      faculty: null,
      my_class: null,
      position: {
        id: 3,
        name: "Admin",
        slug: "admin",
      },
      area: {
        id: 1,
        name: "Khu A",
        slug: "area-a",
      },
    },
  };
  const handleClick = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = createMuiTheme({
    overrides: {
      MuiList: {
        root: {
          width: "fit-content",
        },
      },
    },
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hideModal = () => {
    setIsModalVisible(false);
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
  const onOpenEditForm = () => {
    setIsModalVisible(true);
  };
  const onConfirmChangeStatus = () => {
    console.log("rowUser", rowUser);
    console.log("rowUser.isActive", rowUser.rowUser.isActive);
  };
  return (
    <div>
      <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
      >
        <BsThreeDotsVertical color={"black"} />
      </Button>
      <ThemeProvider theme={theme}>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
        >
          <MenuItem onClick={onConfirmChangeStatus}>
            {rowUser.rowUser.isActive === true ? (
              <div style={{ color: "red" }}>Disable User</div>
            ) : (
              <div style={{ color: "green" }}>Enable User</div>
            )}
          </MenuItem>
          <MenuItem onClick={onOpenEditForm}>
            <div style={{ color: "#005CC8" }}>Chỉnh sửa</div>
          </MenuItem>
        </Menu>
      </ThemeProvider>
      <ReactModal
        isOpen={isModalVisible}
        onRequestClose={hideModal}
        style={customStyles}
      >
        <AddAccount user={user} />
      </ReactModal>
    </div>
  );
}
