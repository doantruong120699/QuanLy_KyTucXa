/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRooms as GetRooms } from "../redux/actions/checkroom";
import Room from "../components/checkroom/Room";
import { getRoom } from "../utilities/DataRender/checkroom";
import * as TitleList from "../utilities/constants/titles";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
const Checkroom = () => {
  const [roomState, setState] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchTitleNavigation(TitleList.NAVIGATION_TITLE[1].title));

    const GetAllRooms = () => {
      GetRooms((output) => {
        if (output) {
          setState(getRoom(output));
        }
      });
    };
    GetAllRooms();
  }, []);
  return (
    <div className="style-checkroom">
      {roomState &&
        roomState.map((area, index) => {
          return (
            <div
              key={index}
              className="col col-full style-lg-box bg-color-white mb-24"
            >
              <p className="bold-text">{area.name}</p>
              {area.rooms.map((room, i) => {
                return (
                  <div key={i} className="col col-5 pd-8">
                    <Room
                      name={room.name}
                      maximum={room.typeroom.number_max}
                      numberNow={room.number_now}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};
export default Checkroom;
