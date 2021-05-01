import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import withAuth from "./components/layout/withAuth";

import Login from "./containers/Login";
import ManageUser from "./containers/ManageUser";
import Financial from "./containers/Financial";
import * as ROUTER from "./utilities/constants/router";

function App() {
  return (
    <Router history={history()}>
      <Switch>
        <Route path={ROUTER.ROUTE_LOGIN} component={Login} exact />
        <Route
          path={ROUTER.ROUTE_MANAGE_USER}
          component={withAuth(ManageUser)}
          exact
        />
        <Route
          path={ROUTER.ROUTE_MANAGE_FINANCIAL}
          component={withAuth(Financial)}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
