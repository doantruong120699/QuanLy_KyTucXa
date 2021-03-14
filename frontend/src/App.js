import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import withAuth from "./components/layout/withAuth";
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import Checkroom from "./components/dashboard/Checkroom";
function App() {
  return (
    <Router history={history()}>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/forgot-password" component={ForgotPassword} exact />
        <Route path="/reset-password" component={ResetPassword} exact />
        <Route path="/dashboard" component={withAuth(Dashboard)} exact />
        <Route path="/room" component={withAuth(Checkroom)} exact />
      </Switch>
    </Router>
  );
}

export default App;
