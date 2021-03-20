import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo/logo.jpg";
import Footer from "./Footer";
import NavLink from "./NavLink";
import * as TitleList from "../../utilities/constants/titles";
import { useDispatch } from "react-redux";
import { actFetchTitleNavigation } from "../../redux/actions/dashboard";
const SideBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeState, setActiveState] = useState("/dashboard");

  const setActive = (title, path) => {
    dispatch(actFetchTitleNavigation(title));
    history.push(path);
  };

  useEffect(() => {
    setActiveState(history.location.pathname);
  }, [history.location.pathname]);

  const iconStyle = [
    "fi-sr-apps",
    "fi-sr-eye",
    "fi-sr-graduation-cap",
    "fi-sr-users",
    "fi-sr-globe",
  ];
  return (
    <div className="style-sidebarContainer">
      <Link
        to="/dashboard"
        style={{ textDecoration: "none" }}
        onClick={() =>
          dispatch(actFetchTitleNavigation(TitleList.NAVIGATION_TITLE[0].title))
        }
      >
        <div className="style-logo">
          <img src={logo} alt="" width="75" height="75" />
          <div>
            <p className="style-nameApp">Dormitory</p>
            <p className="style-nameSchool">Trường ĐH Bách Khoa</p>
          </div>
        </div>
      </Link>
      <div>
        <div className="style-titleNav">
          <span>Main Menu</span>
        </div>
        <div className="style-navMenu">
          {TitleList.NAVIGATION_TITLE.map((titleNav, index) => {
            return (
              <NavLink
                key={index}
                title={titleNav.title}
                iconStyle={iconStyle[index]}
                path={titleNav.path}
                active={activeState.startsWith(titleNav.path)}
                onClick={() => setActive(titleNav.title, titleNav.path)}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default SideBar;
