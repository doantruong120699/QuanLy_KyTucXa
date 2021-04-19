import React from "react";
import { useHistory } from "react-router-dom";
import * as ROUTER from "../../utilities/constants/router";
import avatar from "../../assets/images/user/employee.jpg";
const EmployeeTag = (props) => {
  const history = useHistory();
  const { slug, name, email, phone } = props;
  return (
    <div className="col col-full style-lg-box bg-color-white ">
      <div className="col col-full justify-content-ct style-avatar-container">
        <div className="col col-half mg-16">
          <img className="style-img" src={avatar} alt="" />
          <div className="style-more-detail pl-4 pt-4">
            <i
              className="fi-rr-menu-dots-vertical text-20 text-is-grey"
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(
                  `${ROUTER.ROUTE_EMPLOYEES}${ROUTER.ROUTE_DETAILED_EMPLOYEES}/${slug}`
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="col col-full justify-content-ct pd-8">
        <p className="bold-text text-20">{name}</p>
      </div>
      <div>
        <p className="mg-8">
          <i className="fi-sr-smartphone text-is-pink" />
          <span className="bold-text pl-8 text-12 text-is-grey">{phone}</span>
        </p>
        <p className="mg-8">
          <i className="fi-sr-envelope text-is-pink" />
          <span className="bold-text pl-8 text-12 text-is-grey">{email}</span>
        </p>
      </div>
    </div>
  );
};
export default EmployeeTag;
