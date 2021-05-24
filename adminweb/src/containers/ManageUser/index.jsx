import "react-tabs/style/react-tabs.css";
import React from "react";
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";
import Student from "./Student";
import Employee from "./Employee";

export default function ManageUser(props) {
  const { match } = props;
  return (
    <React.Fragment>
      <Router>
        <div className="style-financial-container">
          <div className="col col-full pl-16 pr-16 mb-16">
            <div
              className="mr-16"
              style={{ display: "inline", width: "200px" }}
            >
              <NavLink
                to={`${match.url}/student`}
                style={{ textDecoration: "none" }}
                activeClassName="style-activeNavSublink"
                className="style-navSubLink bold-text"
              >
                Sinh viên
              </NavLink>
            </div>
            <div
              className="mr-16"
              style={{ display: "inline", width: "200px" }}
            >
              <NavLink
                to={`${match.url}/employee`}
                style={{ textDecoration: "none" }}
                activeClassName="style-activeNavSublink"
                className="style-navSubLink bold-text"
              >
                <span>Nhân viên</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col col-full">
          <Switch>
            <Redirect exact from={match.url} to={`${match.url}/student`} />
            <Route path={`${match.url}/student`} exact>
              <Student />
            </Route>
            <Route path={`${match.url}/employee`} exact>
              <Employee />
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}
