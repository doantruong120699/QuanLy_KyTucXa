import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";
import Dashboard from "./Dashboard";
import Checkroom from "../components/dashboard/Checkroom";
const HomePage = () => {
  return (
    <Router>
      <SideBar />
      <Header />
      <div className="style-content">
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/room">
            <Checkroom />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default React.memo(HomePage);
