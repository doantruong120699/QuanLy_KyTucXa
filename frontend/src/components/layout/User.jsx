import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import * as ROUTER from "../../utilities/constants/router";
import { getAuth } from "../../utilities/helper";

const User = () => {
  const [isShown, setIsShown] = useState(false);

  const history = useHistory();
  const logoutWrapper = useRef(null);

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

  const logout = () => {
    localStorage.clear();
    history.push(ROUTER.ROUTE_LOGIN);
  };

  var styleIcon = isShown ? "fi-rr-caret-up" : "fi-rr-caret-down";
  useClickOutside(logoutWrapper);

  const user = getAuth();
  return (
    <div ref={logoutWrapper} className="style-userContainer">
      <div className="style-userInfor" onClick={() => setIsShown(!isShown)}>
        <div className="style-avatarContainer"></div>
        <div className="infor-box">
          <span className="style-nameUser">
            {user.first_name} {user.last_name}
          </span>
          <span className="style-roleUser">Sinh viên</span>
        </div>
        <div className="icon-custome">
          <i className={styleIcon} />
        </div>
      </div>
      {isShown && (
        <div className="style-dropdownContainer">
          <div
            className="style-dropdownItem"
            onClick={() => {
              history.push(ROUTER.ROUTE_MY_PROFILE);
            }}
          >
            <i className="fi-sr-user" />
            <span>Trang cá nhân</span>
          </div>
          <div className="style-dropdownItem" onClick={() => logout()}>
            <i className="fi-sr-sign-out" />
            <span className="">Đăng xuất</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default User;
