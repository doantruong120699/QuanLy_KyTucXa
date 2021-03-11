import "./Header.css";
import User from "../User/User";
import { useSelector } from "react-redux";
import "../../assets/fonts/uicons-regular-rounded/css/uicons-regular-rounded.css";
const Header = () => {
  const title = useSelector((state) => state.reducerUtilities.title);
  return (
    <div className="">
      <div className="header-bar">
        <div className="title-box">
          <i class="fi-rr-list icon-custome" />
          <h2 className="title-custome">{title}</h2>
        </div>
        <User />
      </div>
    </div>
  );
};
export default Header;
