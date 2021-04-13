import { Route, Router, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import withAuth from "./components/layout/withAuth";
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import Checkroom from "./containers/Checkroom";
import EmployeePage from "./containers/EmployeePage";
import * as ROUTER from "./utilities/constants/router";
import Profile from "./containers/Profile";
import StudentPage from "./containers/StudentPage";
function App() {
  return (
    <Router history={history()}>
      <Switch>
        <Route path="/" exact>
          <Redirect to={ROUTER.ROUTE_DASHBOARD} />
        </Route>
        <Route path={ROUTER.ROUTE_LOGIN} component={Login} exact />
        <Route
          path={ROUTER.ROUTE_FORGOT_PASSWORD}
          component={ForgotPassword}
          exact
        />
        <Route
          path={ROUTER.ROUTE_RESET_PASSWORD}
          component={ResetPassword}
          exact
        />
        <Route
          path={ROUTER.ROUTE_DASHBOARD}
          component={withAuth(Dashboard)}
          exact
        />
        <Route
          path={ROUTER.ROUTE_CHECKROOM}
          component={withAuth(Checkroom)}
          exact
        />
        <Route
          path={ROUTER.ROUTE_MY_PROFILE}
          component={withAuth(Profile)}
          exact
        />
        <Route
          path={ROUTER.ROUTE_EMPLOYEES}
          component={withAuth(EmployeePage)}
          exact
        />
        <Route
          path={ROUTER.ROUTE_STUDENTS}
          component={withAuth(StudentPage)}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
