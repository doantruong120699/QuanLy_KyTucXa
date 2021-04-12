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
          <li>
            <a href="/manage-user">Manage User</a>
          </li>
        </div>
        <div>
          <li>
            <a href="#">Manage User</a>
          </li>
        </div>
        <div>
          <li>
            <a href="#">Manage User</a>
          </li>
        </div>
        <div>
          <li>
            <a href="#">Manage User</a>
          </li>
        </div>
        <div className={"user"}>
          <User />
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
