/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRooms as GetRooms } from "../redux/actions/checkroom";
import Room from "../components/checkroom/Room";
import { getRoom } from "../utilities/DataRender/checkroom";
import * as TitleList from "../utilities/constants/titles";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import * as ROUTER from "../utilities/constants/router";

const Checkroom = () => {
  const [roomState, setState] = useState(null);

  const history = useHistory();

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
    <div className="style-background-container">
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
                      getDetails={() =>
                        history.push(
                          `${ROUTER.ROUTE_CHECKROOM}/detail/${room.slug}`
                        )
                      }
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
