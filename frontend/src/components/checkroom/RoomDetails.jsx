import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getRoomDetails,
  registerRoom,
  getPaymentMethods,
  getSchoolYear,
  payAllRoom,
} from "../../redux/actions/checkroom";

import Button from "../common/Button";
import RoomRegistration from "./RoomRegistration";
import { getAuth } from "../../utilities/helper";
import roomImg from "../../assets/images/room/bedroom.jpg";
import * as ROUTER from "../../utilities/constants/router";
import * as ALERTMESSAGE from "../../utilities/constants/AlertMessage";
import Alertness from "../common/Alertness";
import Loader from "../common/Loader";
import RoomPayAll from "./RoomPayAll";

const RoomDetails = () => {
  const { roomID } = useParams();

  const history = useHistory();

  const loader = useSelector((state) => state.checkroom.loading);

  const [roomState, setRoom] = useState();

  const [modalRegistration, setModalRegisstration] = useState(false);

  const [modalPayAll, setModalPayAll] = useState(false);
  //const [modal, setModal] = useState(false);

  const setRegistration = (value) => {
    const permission = getAuth().permission;
    if (!permission.includes(value)) {
      setNotification({
        type: "type-error",
        content: "Bây giờ không phải là thời gian đăng kí!",
      });
      onOpen();
      return;
    }

    setModalRegisstration(true);
  };

  const setPayAll = (value) => {
    const permission = getAuth().permission;
    if (!permission.includes(value)) {
      setNotification({
        type: "type-error",
        content: "Bây giờ không phải là thời gian đăng kí!",
      });
      onOpen();
      return;
    }

    setModalPayAll(true);
  };

  const setCloseModalRegistration = () => setModalRegisstration(false);

  const setCloseModalPayAll = () => setModalPayAll(false);

  const [open, setOpen] = useState(false);

  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const isEmployee = getAuth().group[0] === "nhanvien_group";

  const [payment, setPayment] = useState();

  useEffect(() => {
    let mounted = true;

    getRoomDetails(roomID, (output) => {
      if (output) {
        if (mounted) {
          setRoom(output);
        }
      }
    });

    getPaymentMethods((output) => {
      if (output) {
        if (mounted) {
          setPayment(output);
        }
      }
    });

    window.scrollTo(0, 0);
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [schoolYear, setSchoolYear] = useState(null);

  useEffect(() => {
    let mounted = true;

    const GetSchoolYear = () =>
      getSchoolYear((output) => {
        if (mounted) {
          setSchoolYear(output);
        }
      });

    GetSchoolYear();

    return () => (mounted = false);
  }, []);

  const registerUserRoom = (data) => {
    registerRoom(data, (output) => {
      if (output) {
        switch (output.status) {
          case "fail":
            setNotification({
              type: "type-error",
              content: output.notification,
            });
            break;
          case "successful":
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

  const payAllUserRoom = (data) => {
    payAllRoom(data, (output) => {
      if (output) {
        switch (output.status) {
          case "fail":
            setNotification({
              type: "type-error",
              content: output.notification,
            });
            break;
          case "successful":
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
    <div className="style-background-container" style={{ height: "85vh" }}>
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
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
                <div>
                  <div className="col style-room-registration">
                    <Button
                      type="normal-blue"
                      content="Đăng ký"
                      onClick={() => setRegistration("registration_stage_3")}
                    />
                  </div>
                  <div className="col style-room-full-registration">
                    <Button
                      type="normal-blue"
                      content="Bao phòng"
                      onClick={() => setPayAll("registration_stage_2")}
                    />
                  </div>
                  <div className="col style-room-adjourn">
                    <Button
                      type="normal-blue"
                      content="Gia Hạn"
                      onClick={() => setRegistration("registration_stage_1")}
                    />
                  </div>
                </div>
              )}
              <RoomRegistration
                open={modalRegistration}
                onClose={setCloseModalRegistration}
                name={roomState.name}
                id={roomState.id}
                registerRoom={registerUserRoom}
                payment={payment}
                schoolYear={schoolYear}
              />
              <RoomPayAll
                open={modalPayAll}
                onClose={setCloseModalPayAll}
                name={roomState.name}
                id={roomState.id}
                registerRoom={payAllUserRoom}
                payment={payment}
                rooms={roomState.typeroom.number_max - roomState.number_now}
                schoolYear={schoolYear}
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
      )}
    </div>
  );
};
export default RoomDetails;
