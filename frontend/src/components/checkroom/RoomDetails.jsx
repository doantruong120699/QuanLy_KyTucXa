import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getRoomDetails, registerRoom } from "../../redux/actions/checkroom";
import Button from "../common/Button";
import RoomRegistration from "./RoomRegistration";
import { getAuth } from "../../utilities/helper";
import roomImg from "../../assets/images/room/bedroom.jpg";
import * as ROUTER from "../../utilities/constants/router";
import * as ALERTMESSAGE from "../../utilities/constants/AlertMessage";
import * as APIALERTMESSAGE from "../../utilities/constants/APIAlertMessage";
import Alertness from "../common/Alertness";

const RoomDetails = () => {
  const { roomID } = useParams();

  const history = useHistory();

  const [roomState, setRoom] = useState();

  const [modal, setModal] = useState(false);

  const setOpenModal = () => setModal(true);

  const setCloseModal = () => setModal(false);

  const [open, setOpen] = useState(false);

  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const isEmployee = getAuth().group[0] === "nhanvien_group";

  useEffect(() => {
    getRoomDetails(roomID, (output) => {
      if (output) {
        setRoom(output);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUserRoom = (data) => {
    registerRoom(data, (output) => {
      if (output) {
        switch (output.notification) {
          case APIALERTMESSAGE.INVALID_TIME:
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.INVALID_TIME,
            });
            break;
          case APIALERTMESSAGE.UNAUTHORIZED_ROOM:
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.UNAUTHORIZED_ROOM,
            });
            break;
          case APIALERTMESSAGE.REGISTER_SUCCESSFULLY:
            setNotification({
              type: "type-success",
              content: ALERTMESSAGE.REGISTER_SUCCESSFULLY,
            });
            break;
          default:
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.SYSTEM_ERROR,
            });
            break;
        }
      } else {
        setNotification({
          type: "type-error",
          content: ALERTMESSAGE.SYSTEM_ERROR,
        });
      }
      onOpen();
    });
  };
  return (
    <div className="style-background-container">
      {roomState && (
        <div className="col col-full style-lg-box bg-color-white position-relative">
          <p className="text-20 bold-text pl-24 pb-16">
            Phòng {roomState.name} - {roomState.area.name}
          </p>
          <div className="col col-half pl-24 pr-24">
            <div className="col col-full">
              <img className="style-img" src={roomImg} alt="bedroom" />
            </div>
            <div className="col col-full text-align-ct mt-24 mb-24">
              <div className="col col-third style-separation-border">
                <p className="bold-text text-uppercase">Loại phòng</p>
                <p className="pt-12">{roomState.typeroom.name}</p>
              </div>
              <div className="col col-third style-separation-border">
                <p className="bold-text text-uppercase">Giá phòng</p>
                <p className="pt-12">
                  {roomState.typeroom.price.toLocaleString()}vnd
                </p>
                <p></p>
              </div>
              <div className="col col-third style-separation-border">
                <p className="bold-text text-uppercase">Số lượng tối đa</p>
                <p className="pt-12">{roomState.typeroom.number_max}</p>
              </div>
            </div>
          </div>
          <div className="col col-half pl-24 pr-24">
            <p className="mb-8">
              Có {roomState.list_user.length} người đã thuê phòng
            </p>
            {roomState.list_user.map((student, index) => {
              return (
                <div key={index} className="col col-half pd-8">
                  <div className="col col-full style-sm-box bg-color-yellow style-sm-tag">
                    <div className="col col-two-third">
                      <p className="text-uppercase bold-text">
                        {student.last_name} {student.first_name}
                      </p>
                      <p className="text-12">{student.my_class_id}</p>
                    </div>
                    <div className="col col-third text-align-ct text-20 pt-8">
                      <i
                        className="fi-rr-search-alt"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push(
                            `${ROUTER.ROUTE_STUDENTS}${ROUTER.ROUTE_DETAILED_STUDENTS}/${student.public_id}`
                          )
                        }
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {!isEmployee && (
            <div className=" col style-room-registration">
              <Button
                type="normal-blue"
                content="Đăng ký"
                onClick={setOpenModal}
              />
            </div>
          )}
          <RoomRegistration
            open={modal}
            onClose={setCloseModal}
            name={roomState.name}
            id={roomState.id}
            registerRoom={registerUserRoom}
          />
          <div>
            <Alertness
              open={open}
              onClose={onClose}
              type={notification.type}
              content={notification.content}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default RoomDetails;
