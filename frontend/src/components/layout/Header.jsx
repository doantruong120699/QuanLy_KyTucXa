import User from "./User";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const title = useSelector((state) => state.dashboard.title);
  const [className, setClassName] = useState(false);
  const handleScroll = () => {
    if (document.documentElement.scrollTop > 92) {
      setClassName(true);
    } else {
      setClassName(false);
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      window.onscroll = () => handleScroll();
    }
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <div className={className ? "withShadow header-bar" : "header-bar"}>
        <div className="title-box">
          <i className="fi-rr-list icon-custome" />
          <h2 className="title-custome">{title}</h2>
        </div>
        <User />
      </div>
    </div>
  );
};
export default Header;
