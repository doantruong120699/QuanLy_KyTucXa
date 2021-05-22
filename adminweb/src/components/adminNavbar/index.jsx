import "./styles.css";
import User from "../layout/User";
import Footer from "../layout/Footer";
import { useState } from "react";
const AdminNavbar = () => {
  const [isBurgerClicked, setIsBurgerClicked] = useState("false");
  const handleBurgerClick = () => {
    setIsBurgerClicked(!isBurgerClicked);
  };

  return (
    <header className="header">
      <div className="logo">
        <h4>Quản lý kí túc xá</h4>
      </div>
      <nav className="navigation">
      <ul className={(!isBurgerClicked ? "nav-active" : "") + " nav-links"}>
          <li>
            <a href="/overview">
              Tổng Quan
            </a>
          </li>
          <li >
            <a href="/financial" >
              Tài chính
            </a>
          </li>
          <li>
            <a href="/manage-user">
              Nhân sự
            </a>
          </li>
          <li >
            <a href="/account">
              Tài khoản
            </a>
          </li>
      </ul>
      <div className={"user"}>
        <User />
      </div>
      </nav>
    </header>
  );
};
export default AdminNavbar;