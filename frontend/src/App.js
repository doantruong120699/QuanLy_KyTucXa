import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import withAuth from "./components/layout/withAuth";
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import Profile from "./containers/Profile";
import * as ROUTE from "./utilities/constants/router";
import Checkroom from "./containers/Checkroom";
import EmployeePage from "./containers/EmployeePage";
function App() {
  return (
    <Router history={history()}>
      <Switch>
        <Route path={ROUTE.ROUTE_LOGIN} component={Login} exact />
        <Route
          path={ROUTE.ROUTE_FORGOT_PASSWORD}
          component={ForgotPassword}
          exact
        />
        <Route
          path={ROUTE.ROUTE_RESET_PASSWORD}
          component={ResetPassword}
          exact
        />
        <Route
          path={ROUTE.ROUTE_HOMEPAGE}
          component={withAuth(Dashboard)}
          exact
        />
        <Route path={ROUTE.ROUTE_ROOM} component={withAuth(Checkroom)} exact />
        <Route
          path={ROUTE.ROUTE_MY_PROFILE}
          component={withAuth(Profile)}
          exact
        />
        <Route
          path={ROUTE.ROUTE_EMPLOYEES}
          component={withAuth(EmployeePage)}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
