import className from "classnames";
const NavLink = (props) => {
  const { title, iconStyle, active, onClick } = props;
  var activeClass = className(
    "style-navLink",
    `${active ? "style-activeNavlink " : ""}`
  );
  return ( 
    <div className={activeClass} onClick={onClick}>
      <i className={iconStyle} />
      <span>{title}</span>
    </div>
  );
};
export default NavLink;
