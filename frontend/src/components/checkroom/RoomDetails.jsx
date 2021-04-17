import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoomDetails } from "../../redux/actions/checkroom";
import roomImg from "../../assets/images/room/bedroom.jpg";

const RoomDetails = () => {
  const { roomID } = useParams();

  const [roomState, setRoom] = useState();

  useEffect(() => {
    getRoomDetails(roomID, (output) => {
      if (output) {
        console.log(output);
        setRoom(output);
      }
    });
  }, []);

  return (
    <div className="style-background-container">
      {roomState && (
        <div className="col col-full style-lg-box bg-color-white">
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
                      <i className="fi-rr-search-alt"></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default RoomDetails;
