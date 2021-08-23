/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAvatarUserNavigation,
  actFetchUserNavigation,
  changeAvatar,
  profile as GetProfile,
  updateProfile,
} from "../redux/actions/profile";
import Avatar from "../components/profile/Avatar";
import SummaryInfo from "../components/profile/SummaryInfo";
import StudyInfo from "../components/profile/StudyInfo";
import RoomInfo from "../components/profile/RoomInfo";
import EmployeeInfo from "../components/profile/EmployeeInfo";
import { getAuth, setProp } from "../utilities/helper";
import { getHandledEmployeeDataRender } from "../utilities/DataRender/profile";
import { actFetchTitleNavigation } from "../redux/actions/dashboard";
import { changePass } from "../redux/actions/changePass";
import Alertness from "../components/common/Alertness";
import Loader from "../components/common/Loader";
import * as ALERTMESSAGE from "../utilities/constants/AlertMessage";
import * as APIALERTMESSAGE from "../utilities/constants/APIAlertMessage";

const Profile = () => {
  const [profileState, setProfile] = useState(null);

  const [open, setOpen] = useState(false);

  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const loader = useSelector((state) => state.profile.loading);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const updateOrigin = (data) => {
    setProfile({
      ...profileState,
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
            position: output.profile?.position?.name,
            room: output.room,
            grade: output.profile?.my_class,
            faculty: output.profile?.faculty,
            area: output.profile?.area?.name,
            avatarUrl: output.profile?.avatar,
          });
        }
      });
    };
    GetProfileUser();
  }, []);

  const updateUserProfile = (data) => {
    updateProfile(data, (output) => {
      if (output) {
        switch (output.message) {
          case APIALERTMESSAGE.UPDATE_PROFILE_SUCCESSFULLY:
            const user = getAuth();
            user.first_name = data.first_name;
            user.last_name = data.last_name;

            setProp("first_name", data.first_name);
            setProp("last_name", data.last_name);

            dispatch(actFetchUserNavigation(user));

            setNotification({
              type: "type-success",
              content: ALERTMESSAGE.UPDATE_PROFILE_SUCCESSFULLY,
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

  const changeUserPassword = (data) => {
    changePass(data, (output, status) => {
      if (output) {
        switch (status) {
          case 200:
            setNotification({
              type: "type-success",
              content: ALERTMESSAGE.SUCCESSFULLY_RESET_PASSWORD,
            });
            break;
          case 454:
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.INCORRECT_OLD_PASSWORD,
            });
            break;
          default:
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.SYSTEM_ERROR,
            });
            break;
        }
        onOpen();
      } else {
        setNotification({
          type: "type-error",
          content: ALERTMESSAGE.SYSTEM_ERROR,
        });
      }
    });
  };

  function onSaveAvatar(file) {
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      changeAvatar(formData, (output) => {
        if (output) {
          console.log(output);
          dispatch(
            actFetchAvatarUserNavigation({
              avatar: output.avatar,
            })
          );
          setProfile({
            ...profileState,
            avatarUrl: output.avatar,
          });
        }
      });
    }
  }

  return (
    <div className="style-background-container" style={{ height: "85vh" }}>
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {profileState && (
            <div>
              <div className="col col-full">
                <div className="col col-third justify-content-ct">
                  <Avatar
                    changeAvatar={onSaveAvatar}
                    avatarUrl={profileState.avatarUrl}
                  />
                </div>
                <div className="col col-two-third">
                  <SummaryInfo
                    dataRender={profileState.profile}
                    updateOrigin={updateOrigin}
                    updateUserProfile={updateUserProfile}
                    changeUserPassword={changeUserPassword}
                  />
                </div>
              </div>
              {!isEmployee ? (
                <div className="col col-full">
                  <div className="col col-half pt-48 pr-20">
                    <StudyInfo
                      id={profileState.username}
                      grade={profileState.grade}
                      faculty={profileState.faculty}
                    />
                  </div>
                  <div className="col col-half pt-48 pl-20">
                    <RoomInfo room={profileState.room} />
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
  );
};
export default React.memo(Profile);
