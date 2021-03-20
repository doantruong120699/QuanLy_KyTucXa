import User from "./User";
import { useSelector } from "react-redux";

const Header = () => {
  const title = useSelector((state) => state.dashboard.title);
  return (
    <div className="">
      <div className="header-bar">
        <div className="title-box">
          <i className="fi-sr-list icon-custome" />
          <h2 className="title-custome">{title}</h2>
        </div>
        <User />
      </div>
    </div>
  );
};
export default Header;
