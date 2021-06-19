import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Button, createMuiTheme, Menu, MenuItem } from "@material-ui/core";
import ReactModal from "react-modal";
import AddAccount from "../AddAccount/index";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDetailedAccount } from "../../../redux/actions/account";

export default function MoreButton(props) {
  const { rowUser, permission, faculty, class_in_university, position, area } =
    props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [user, setUser] = useState();

  useEffect(() => {
    getDetailedAccount(rowUser.publicId, (output) => {
      if (output) {
        setUser(output);
      }
    });
  }, []);

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
    console.log("rowUser.isActive", rowUser.isActive);
  };
  console.log("rowUser.id", rowUser.publicId);
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
            {rowUser.isActive === true ? (
              <div style={{ color: "red" }}>Khoá tài khoản</div>
            ) : (
              <div style={{ color: "green" }}>Mở tài khoản</div>
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
        <AddAccount
          userInfor={user}
          permission={permission}
          faculty={faculty}
          class_in_university={class_in_university}
          position={position}
          area={area}
          type={"update"}
        />
      </ReactModal>
    </div>
  );
}
