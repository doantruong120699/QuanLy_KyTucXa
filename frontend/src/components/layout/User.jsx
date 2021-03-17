import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as TitileList from "../../utilities/constants/titles";
import * as route from "../../utilities/constants/router";
import { actFetchTitleNavigation } from "../../redux/actions/dashboard";

const User = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [isShown, setIsShown] = useState(false);

  const logoutWrapper = useRef(null);

  const logout = () => {
    localStorage.removeItem("user");
    history.push(route.ROUTE_LOGIN);
  };

  const useClickOutside = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShown(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const gotoMyProfile = (title) => {
    history.push(TitileList.MY_PROFILE_TITLE.path);
    dispatch(actFetchTitleNavigation(title));
  };
  var styleIcon = isShown ? "fi-rr-caret-up" : "fi-rr-caret-down";
  useClickOutside(logoutWrapper);
  return (
    <div ref={logoutWrapper} className="style-userContainer">
      <div className="style-userInfor" onClick={() => setIsShown(!isShown)}>
        <div className="style-avatarContainer"></div>
        <div className="infor-box">
          <span className="style-nameUser">Jerry Smith</span>
          <span className="style-roleUser">Student</span>
        </div>
        <div className="icon-custome">
          <i class={styleIcon} />
        </div>
      </div>
      {isShown && (
        <div className="style-dropdownContainer">
          <div
            className="style-dropdownItem"
            onClick={() => gotoMyProfile(TitileList.MY_PROFILE_TITLE.title)}
          >
            <i class="fi-sr-user" />
            <span>Trang cá nhân</span>
          </div>
          <div className="style-dropdownItem" onClick={logout}>
            <i class="fi-sr-sign-out" />
            <span className="">Đăng xuất</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default User;
