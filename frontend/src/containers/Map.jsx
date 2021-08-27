/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as ROUTER from "../utilities/constants/router";
import * as TitleList from "../utilities/constants/titles";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
const Map = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchTitleNavigation(TitleList.NAVIGATION_TITLE[1].title));
  }, []);
  function viewArea(area) {
    history.push(`${ROUTER.ROUTE_CHECKROOM}/${area}`);
  }

  return (
    <div className="background-map pd-16">
      <div className="check-room-position">
        <div className="room">
          <div className="room-cong border-room room-item">
            <p className="cong">Cổng</p>
          </div>
          <div className="room-ktx border-room room-item">
            <p>KTX Sinh Viên Quốc Tế </p>
          </div>
          <div className="room-bao-ve border-room room-item">
            <p>Phòng Bảo Vệ</p>
          </div>
          <div className="room-ql-ktx border-room room-item">
            <p>Phòng Ban Quản Lý KTX</p>
          </div>
          <div
            className="room-nha-4 border-room room-item"
            onClick={() => viewArea("area-4")}
          >
            <p>Nhà 4</p>
          </div>
        </div>

        <div className="room room-2">
          <div className="room-canteen border-room room-item">
            <p>Canteen</p>
          </div>
          <div
            className="room-nha-5 border-room room-item"
            onClick={() => viewArea("area-5")}
          >
            <p>Nhà 5</p>
          </div>
          <div
            className="room-ktx-lao border-room room-item"
            onClick={() => viewArea("area-3")}
          >
            <p>KTX Sinh Viên Lào</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
