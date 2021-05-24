import { Route, Router, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import withAuth from "./components/layout/withAuth";
import ContractDetail from "./containers/Financial/Contract/ContractDetail";
import Login from "./containers/Login";
import Overview from "./containers/Overview";
import ManageUser from "./containers/ManageUser";
import Financial from "./containers/Financial";
import Account from "./containers/Account";
import * as ROUTER from "./utilities/constants/router";
import Profile from "./containers/profile/Profile";
import Budget from "../src/containers/Financial/Budget";
function App() {
  return (
    <Router history={history()}>
      <Switch>
        <Route path="/" exact>
          <Redirect to={ROUTER.ROUTE_OVERVIEW} />
        </Route>
        <Route path={ROUTER.ROUTE_LOGIN} component={Login} exact />
        <Route
          path={ROUTER.ROUTE_OVERVIEW}
          component={withAuth(Overview)}
          exact
        />
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
        <Route
          path={ROUTER.ROUTE_ACCOUNT}
          component={withAuth(Account)}
          exact
        />
        <Route
          path={ROUTER.ROUTE_MY_PROFILE}
          component={withAuth(Profile)}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_CONTRACT_DETAIL}/:contractId`}
          component={withAuth(ContractDetail)}
          exact
        />
        <Route path={ROUTER.ROUTE_BUDGET} component={withAuth(Budget)} exact />
      </Switch>
    </Router>
  );
}

export default App;
