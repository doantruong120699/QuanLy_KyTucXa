import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  profile as GetProfile,
  faculty as GetFaculties,
  grade as GetGrades,
} from "../redux/actions/profile";
import Avatar from "../components/profile/Avatar";
import SummaryInfo from "../components/profile/SummaryInfo";
import StudyInfo from "../components/profile/StudyInfo";
import RoomInfo from "../components/profile/RoomInfo";
import EmployeeInfo from "../components/profile/EmployeeInfo";
import { getAuth } from "../utilities/helper";
import ProfileContext from "../components/profile/ProfileContext";
import { getHandledDataRender } from "../components/profile/DataRender";
import * as TitleList from "../utilities/constants/titles";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
const Profile = () => {
  const [profileState, setProfile] = useState({
    profile: null,
    username: null,
    position: null,
    area: null,
    room: null,
  });
  const [studyState, setStudy] = useState({
    faculty: null,
    grade: null,
  });

  const updateOrigin = (data) => {
    setProfile({ ...profileState, profile: getHandledDataRender(data) });
  };

  const isEmployee = getAuth().group[0] === "nhanvien_group";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchTitleNavigation(TitleList.NAVIGATION_TITLE[5].title));
    const GetProfileUser = () => {
      GetProfile((output) => {
        if (output) {
          console.log(output);
          console.log(getHandledDataRender(output));
          setProfile({
            profile: getHandledDataRender(output),
            username: output.username,
            position: output.profile.position.name,
            area: output.profile.area.name,
            room: output.room,
          });
        }
      });
    };

    let studyInfo = { faculty: null, grade: null };
    const GetAllFaculties = () => {
      GetFaculties((output) => {
        if (output) {
          studyInfo.faculty = output;
        }
      });
    };

    const GetAllGrades = () => {
      GetGrades((output) => {
        if (output) {
          studyInfo.grade = output;
        }
      });
    };
    GetAllFaculties();
    GetAllGrades();
    setStudy(studyInfo);
    GetProfileUser();
  }, []);
  const { profile } = profileState;
  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateOrigin: updateOrigin.bind(this),
      }}
    >
      {profileState.profile && (
        <div className="style-profile-container">
          <div className="col col-full">
            <div className="col col-third justify-content-ct">
              <Avatar />
            </div>
            <div className="col col-two-third">
              <SummaryInfo
                dataRender={profileState.profile}
                isEmployee={isEmployee}
                studyInfo={studyState}
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
    </ProfileContext.Provider>
  );
};
export default React.memo(Profile);
