import React, { useState, useEffect } from "react";
import { profile as GetProfile } from "../redux/actions/profile";
import Avatar from "../components/profile/Avatar";
import SummaryInfo from "../components/profile/SummaryInfo";
import StudyInfo from "../components/profile/StudyInfo";
import RoomInfo from "../components/profile/RoomInfo";
import EmployeeInfo from "../components/profile/EmployeeInfo";
import { getAuth } from "../utilities/helper";
const Profile = () => {
  const [profileState, setProfile] = useState(null);

  const GetProfileUser = () => {
    var token = localStorage.getItem("token");
    GetProfile(token, (output) => {
      if (output) {
        setProfile(output);
      }
    });
  };

  const isEmployee = getAuth().group[0] === "nhanvien_group";
  const username = getAuth().username;

  useEffect(() => {
    GetProfileUser();
  }, []);

  return (
    <div>
      {profileState && (
        <div className="style-profile-container">
          <div className="col col-full">
            <div className="col col-third justify-content-ct">
              <Avatar />
            </div>
            <div className="col col-two-third">
              <SummaryInfo
                name={profileState.first_name}
                username={username}
                email={profileState.email}
                address={profileState.profile.address}
                phone={profileState.profile.phone}
                gender={profileState.profile.gender}
                identification={profileState.profile.identify_card}
                birthday={profileState.profile.birthday}
              />
            </div>
          </div>
          {!isEmployee ? (
            <div className="col col-full">
              <div className="col col-half pt-48 pr-20">
                <StudyInfo
                  mssv={"102170004"}
                  className={profileState.profile.my_class}
                  position={profileState.profile.position.name}
                  faculty={profileState.profile.faculty.name}
                />
              </div>
              <div className="col col-half pt-48 pl-20">
                <RoomInfo
                  name={""}
                  area={profileState.profile.area.name}
                  type={""}
                />
              </div>
            </div>
          ) : (
            <div className="col col-full mt-48">
              <EmployeeInfo
                msnv={"102170004"}
                position={profileState.profile.position.name}
                area={profileState.profile.area.name}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default React.memo(Profile);
