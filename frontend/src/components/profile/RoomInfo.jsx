import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alertness from "../common/Alertness";
import Button from "../common/Button";
import * as ROUTER from "../../utilities/constants/router";
import * as ALERTMESSAGE from "../../utilities/constants/AlertMessage";

const RoomInfo = (props) => {
  const history = useHistory();

  const { room, area } = props;

  const [open, setOpen] = useState(false);

  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const viewRoom = (room) => {
    if (!room) {
      setNotification({
        type: "type-error",
        content: ALERTMESSAGE.UNSIGNED_ROOM,
      });
      onOpen();
    } else {
      history.push(`${ROUTER.ROUTE_CHECKROOM}/detail/${room.slug}`);
    }
  };
  return (
    <div className="col col-full style-lg-box bg-color-white style-profile-room">
      <span className="style-notiTitle">Thông tin phòng</span>
      <div className="col col-full">
        <span className="pl-16">Tên phòng: </span>
        <span>{room ? room.name : null}</span>
      </div>
      <div className="col col-full">
        <span className="pl-16">Khu: </span>
        <span>{area}</span>
      </div>
      <div className="col col-half style-detail-btn">
        <Button
          type="normal-ubg"
          content="Xem chi tiết"
          isDisable={false}
          onClick={() => viewRoom(room)}
        />
      </div>
      <div>
        <Alertness
          open={open}
          onClose={onClose}
          type={notification.type}
          content={notification.content}
        />
      </div>
    </div>
  );
};
export default RoomInfo;
