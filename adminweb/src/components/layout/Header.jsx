import User from "./User";
import { useSelector } from "react-redux";

const Header = () => {
  return (
    <div className="">
      <div className="header-bar">
        <User />
      </div>
    </div>
  );
};
export default Header;
