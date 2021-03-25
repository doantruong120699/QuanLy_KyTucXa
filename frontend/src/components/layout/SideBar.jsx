import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo/logo.jpg";
import Footer from "./Footer";
//import NavLink from "./NavLink";
import * as TitleList from "../../utilities/constants/titles";
import { useDispatch } from "react-redux";
import { actFetchTitleNavigation } from "../../redux/actions/dashboard";
const SideBar = () => {
  const dispatch = useDispatch();

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
        to={TitleList.NAVIGATION_TITLE[0].path}
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
                to={titleNav.path}
                style={{ textDecoration: "none" }}
                activeClassName="style-activeNavlink"
                className="style-navLink"
                onClick={() =>
                  dispatch(actFetchTitleNavigation(titleNav.title))
                }
              >
                <i className={iconStyle[index]} />
                <span>{titleNav.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default SideBar;
