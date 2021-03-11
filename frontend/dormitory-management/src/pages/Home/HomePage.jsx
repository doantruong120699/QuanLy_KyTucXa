import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./HomePage.css";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import Dashboard from "../Dashboard/Dashboard";
import Checkroom from "../Checkroom/Checkroom";
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
