import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import withAuth from "./components/layout/withAuth";
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import Checkroom from "./components/checkroom/Checkroom";
import * as ROUTER from "./utilities/constants/router";
function App() {
  return (
    <Router history={history()}>
      <Switch>
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
      </Switch>
    </Router>
  );
}

export default App;
