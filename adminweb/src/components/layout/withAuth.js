import React from "react";
import AdminNavbar from "../adminNavbar";
import { getAuth } from "../../utilities/helper";
import { Redirect } from "react-router";
const withAuth = (Component) => (props) => {
  return (
    <div>
      {getAuth() && getAuth().jti ? (
        <div>
          <AdminNavbar />
          <div className="style-content" style={{ marginLeft: "15%" }}>
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
