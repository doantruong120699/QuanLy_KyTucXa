/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { profile as GetProfile } from "../redux/actions/profile";
import Avatar from "../components/profile/Avatar";
import SummaryInfo from "../components/profile/SummaryInfo";
import StudyInfo from "../components/profile/StudyInfo";
import RoomInfo from "../components/profile/RoomInfo";
import EmployeeInfo from "../components/profile/EmployeeInfo";
import { getAuth } from "../utilities/helper";
import { getHandledEmployeeDataRender } from "../utilities/dataRender/profile";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
const Profile = () => {
  const [profileState, setProfile] = useState({
    profile: null,
    username: null,
    position: null,
    area: null,
    room: null,
  });

  const [filter, setFilter] = useState({ profile: profileState.profile });

  const updateOrigin = (data) => {
    setFilter({
      profile: getHandledEmployeeDataRender(data),
    });
  };

  const isEmployee = getAuth().group[0] === "nhanvien_group";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchTitleNavigation("Thông tin cá nhân"));

    const GetProfileUser = () => {
      GetProfile((output) => {
        if (output) {
          setProfile({
            profile: getHandledEmployeeDataRender(output),
            username: output.username,
            position: output.profile.position
              ? output.profile.position.name
              : null,
            area: output.profile.area ? output.profile.area.name : null,
            room: output.room,
          });
        }
      });
    };
    GetProfileUser();
  }, [filter]);

  return (
    <div>
      {profileState.profile && (
        <div className="style-background-container">
          <div className="col col-full">
            <div className="col col-third justify-content-ct">
              <Avatar />
            </div>
            <div className="col col-two-third">
              <SummaryInfo
                dataRender={profileState.profile}
                updateOrigin={updateOrigin}
              />
            </div>
          </div>
          {!isEmployee ? (
            <div className="col col-full">
              <div className="col col-half pt-48 pr-20">
                <StudyInfo
                  id={profileState.username}
                  grade={profileState.profile.grade.value}
                  faculty={profileState.profile.faculty.value}
                />
              </div>
              <div className="col col-half pt-48 pl-20">
                <RoomInfo room={profileState.room} area={profileState.area} />
              </div>
            </div>
          ) : (
            <div className="col col-full mt-48">
              <EmployeeInfo
                position={profileState.position}
                username={profileState.username}
                area={profileState.area}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default React.memo(Profile);
