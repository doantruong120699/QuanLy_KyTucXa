import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.jpg";
import Footer from "../Footer/Footer";
import NavLink from "./NavLink/NavLink";
import * as TitleList from "../../constants/utilities";
import { useDispatch } from "react-redux";
import { actFetchTitleNavigation } from "../../actions/actions";
import "./SideBar.css";
const SideBar = () => {
  const dispatch = useDispatch();

  const [activeState, setActiveState] = useState({
    active: 0,
  });

  const setActive = (index, title) => {
    dispatch(actFetchTitleNavigation(title));
    setActiveState({ ...activeState, active: index });
  };
  const iconStyle = [
    "fi-rr-apps",
    "fi-rr-eye",
    "fi-rr-graduation-cap",
    "fi-rr-users",
    "fi-rr-globe",
  ];
  return (
    <div className="style-sidebarContainer">
      <Link to="/" style={{ textDecoration: "none" }}>
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
                path={titleNav.path}
                iconStyle={iconStyle[index]}
                active={activeState.active === index}
                onClick={() => setActive(index, titleNav.title)}
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
