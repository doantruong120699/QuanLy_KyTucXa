import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Button, createMuiTheme, Menu, MenuItem } from "@material-ui/core";
import ReactModal from "react-modal";
import NotificationForm from "./NotificationForm";

import { BsThreeDotsVertical } from "react-icons/bs";

export default function MoreButton(rowUser) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: { zIndex: 1000 },
  };
  const onOpenNotificationForm = () => {
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
          <MenuItem onClick={onOpenNotificationForm}>
            <div style={{ color: "#005CC8" }}>Gửi thông báo</div>
          </MenuItem>
        </Menu>
      </ThemeProvider>
      <ReactModal
        isOpen={isModalVisible}
        onRequestClose={hideModal}
        style={customStyles}
      >
        <NotificationForm rowUser={rowUser.rowUser} />
      </ReactModal>
    </div>
  );
}
