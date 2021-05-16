import React, { useState } from "react";
import "./styles.css";
import User from "../layout/User";
const AdminNavbar = () => {
  const [isBurgerClicked, setIsBurgerClicked] = useState("false");
  const handleBurgerClick = () => {
    setIsBurgerClicked(!isBurgerClicked);
  };
  return (
    <nav>
      <div className="logo">
        <h4 className="pl-16">Quản lý kí túc xá</h4>
      </div>
      <ul className={(!isBurgerClicked ? "nav-active" : "") + " nav-links"}>
        <div>
          <li>
            <a href="/manage-user" style={{ fontSize: "20px" }}>
              Tổng Quan
            </a>
          </li>
        </div>
        <div>
          <li>
            <a href="/financial" style={{ fontSize: "20px" }}>
              Tài chính
            </a>
          </li>
        </div>
        <div>
          <li>
            <a href="#" style={{ fontSize: "20px" }}>
              Nhân sự
            </a>
          </li>
        </div>
        <div>
          <li>
            <a href="/account" style={{ fontSize: "20px" }}>
              Tài khoản
            </a>
          </li>
        </div>
      </ul>
      <div className="burger" onClick={handleBurgerClick}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};
export default AdminNavbar;
