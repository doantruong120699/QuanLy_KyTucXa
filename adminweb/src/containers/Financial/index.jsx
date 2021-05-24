import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./styles.css";
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";
import WaterElectrical from "./WaterElectrical";
import Budget from "./Budget";
import Contract from "./Contract";
import "react-datepicker/dist/react-datepicker.css";

export default function Financial(props) {
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
                to={`${match.url}/budget`}
                style={{ textDecoration: "none" }}
                activeClassName="style-activeNavSublink"
                className="style-navSubLink bold-text"
              >
                Thu chi
              </NavLink>
            </div>
            <div
              className="mr-16"
              style={{ display: "inline", width: "200px" }}
            >
              <NavLink
                to={`${match.url}/waterelectrical`}
                style={{ textDecoration: "none" }}
                activeClassName="style-activeNavSublink"
                className="style-navSubLink bold-text"
              >
                <span>Tiền điện nước</span>
              </NavLink>
            </div>
            <div
              className="mr-16"
              style={{ display: "inline", width: "200px" }}
            >
              <NavLink
                to={`${match.url}/contract`}
                style={{ textDecoration: "none" }}
                activeClassName="style-activeNavSublink"
                className="style-navSubLink bold-text"
              >
                <span>Hóa đơn</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col col-full">
          <Switch>
            <Redirect exact from={match.url} to={`${match.url}/budget`} />
            <Route path={`${match.url}/budget`} exact>
              <Budget />
            </Route>
            <Route path={`${match.url}/waterelectrical`} exact>
              <WaterElectrical />
            </Route>
            <Route path={`${match.url}/contract`} exact>
              <Contract />
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}
