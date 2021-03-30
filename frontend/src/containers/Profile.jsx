import React, { useState, useEffect } from "react";
import { profile as GetProfile } from "../redux/actions/profile";
import Avatar from "../components/profile/Avatar";
import SummaryInfo from "../components/profile/SummaryInfo";
import StudyInfo from "../components/profile/StudyInfo";
import RoomInfo from "../components/profile/RoomInfo";
import EmployeeInfo from "../components/profile/EmployeeInfo";
import { getAuth } from "../utilities/helper";
import ProfileContext from "../components/profile/ProfileContext";
import { getHandledDataRender } from "../components/profile/DataRender";
const Profile = () => {
  const [profileState, setProfile] = useState({
    dataRender: null,
    origin: null,
  });

  const updateState = (origin) => {
    setProfile({
      dataRender: getHandledDataRender(origin),
      origin: origin,
    });
  };

  const isEmployee = getAuth().group[0] === "nhanvien_group";

  useEffect(() => {
    const GetProfileUser = () => {
      var token = localStorage.getItem("token");
      GetProfile(token, (output) => {
        if (output) {
          updateState(output);
        }
      });
    };
    GetProfileUser();
  }, []);
  return (
    <ProfileContext.Provider
      value={{ dataRender: null, updateOrigin: null, origin: null }}
    >
      {profileState.dataRender && profileState.origin && (
        <div className="style-profile-container">
          <div className="col col-full">
            <div className="col col-third justify-content-ct">
              <Avatar />
            </div>
            <div className="col col-two-third">
              <SummaryInfo
                dataRender={profileState.dataRender}
                isEmployee={isEmployee}
              />
            </div>
          </div>
          {!isEmployee ? (
            <div className="col col-full">
              <div className="col col-half pt-48 pr-20">
                <StudyInfo
                  mssv={profileState.dataRender.id.value}
                  className={profileState.dataRender.grade.value}
                  position={profileState.dataRender.position.value}
                  faculty={profileState.dataRender.faculty.value}
                />
              </div>
              <div className="col col-half pt-48 pl-20">
                <RoomInfo
                  name={profileState.dataRender.room.value}
                  area={profileState.dataRender.area.value}
                />
              </div>
            </div>
          ) : (
            <div className="col col-full mt-48">
              <EmployeeInfo
                msnv={profileState.dataRender.id.value}
                position={profileState.dataRender.position.value}
                area={profileState.dataRender.area.value}
              />
            </div>
          )}
        </div>
      )}
    </ProfileContext.Provider>
  );
};
export default React.memo(Profile);
