import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { Button, createMuiTheme, Menu, MenuItem } from "@material-ui/core";
import UpdateAccount from "../UpdateAccount/index";
import { BsThreeDotsVertical } from "react-icons/bs";
import { renderAccount } from "../../../utilities/constants/DataRender/account";

export default function MoreButton(props) {
  const {
    permission,
    faculty,
    class_in_university,
    position,
    area,
    updateState,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("MoreButton", props.rowUser);
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

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const onOpenEditForm = () => {
    setIsModalVisible(true);
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
          <MenuItem onClick={onOpenEditForm}>
            <div style={{ color: "#005CC8" }}>Chỉnh sửa</div>
          </MenuItem>
        </Menu>
      </ThemeProvider>
      {props.rowUser && (
        <UpdateAccount
          public_id={props.rowUser.public_id}
          userInfor={renderAccount(props.rowUser)}
          hideModal={hideModal}
          updateState={updateState}
          isOpen={isModalVisible}
          permission={permission}
          faculty={faculty}
          class_in_university={class_in_university}
          position={position}
          area={area}
        />
      )}
    </div>
  );
}
