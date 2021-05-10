import "./styles.css";
import User from "../layout/User";
import Footer from "../layout/Footer";
import react, { useState } from "react";
const AdminNavbar = () => {
  const [isBurgerClicked, setIsBurgerClicked] = useState("false");
  const handleBurgerClick = () => {
    setIsBurgerClicked(!isBurgerClicked);
  };
  return (
    <nav>
      <div className="logo">
        <h4>Quản lý kí túc xá</h4>
      </div>
      <ul className={(!isBurgerClicked ? "nav-active" : "") + " nav-links"}>
        <div>
          <li style={{ paddingTop: "20px" }}>
            <a href="/overview" style={{ fontSize: "20px" }}>
              Tổng Quan
            </a>
          </li>
        </div>
        <div>
          <li style={{ paddingTop: "20px", fontWeight: "500" }}>
            <a href="/financial" style={{ fontSize: "20px" }}>
              Tài chính
            </a>
          </li>
        </div>
        <div>
          <li style={{ paddingTop: "20px" }}>
            <a href="/manage-user" style={{ fontSize: "20px" }}>
              Nhân sự
            </a>
          </li>
        </div>
        <div>
          <li style={{ paddingTop: "20px" }}>
            <a href="/account" style={{ fontSize: "20px" }}>
              Tài khoản
            </a>
          </li>
        </div>
        <div className={"user"}>
          <li>
            <User />
          </li>
        </div>
        <div>
          <div className="footer">
            <li>
              <Footer />
            </li>
          </div>
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
