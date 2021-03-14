import { Link } from "react-router-dom";
import className from "classnames";
const NavLink = (props) => {
  const { title, iconStyle, path, active, onClick } = props;
  var activeClass = className(
    "style-navLink",
    `${active ? "style-activeNavlink " : ""}`
  );
  return (
    <Link to={`./${path}`} style={{ textDecoration: "none" }}>
      <div className={activeClass} onClick={onClick}>
        <i className={iconStyle} />
        <span>{title}</span>
      </div>
    </Link>
  );
};
export default NavLink;
