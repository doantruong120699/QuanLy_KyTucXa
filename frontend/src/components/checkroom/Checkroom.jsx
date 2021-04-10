import React, { useState, useEffect } from "react";
import { getRooms as GetRooms } from "../../redux/actions/checkroom";
import Room from "../checkroom/Room";
const Checkroom = () => {
  const [roomState, setState] = useState(null);

  useEffect(() => {
    const GetAllRooms = () => {
      GetRooms((output) => {
        if (output) {
          setState(output);
        }
      });
    };
    GetAllRooms();
  }, []);
  return (
    <div className="style-checkroom">
      {roomState &&
        roomState.results.map((data, index) => {
          return (
            <div
              key={index}
              className="col col-full style-areaBox style-lg-box"
            >
              <div className="col col-5 pd-8">
                <Room
                  name={data.name}
                  maximum={8}
                  numberNow={data.number_now}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Checkroom;
