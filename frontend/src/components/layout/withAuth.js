import React from "react";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import { getAuth } from "../../utilities/helper";
import { Redirect } from "react-router";
const withAuth = (Component) => (props) => {
  return (
    <div>
      {getAuth() && getAuth().jti ? (
        <div>
          <SideBar />
          <Header />
          <div className="style-content">
            <Component {...props} />
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
export default withAuth;
