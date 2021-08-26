import { Route, Router, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import withAuth from "./components/layout/withAuth";
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import Map from "./containers/Map";
import EmployeePage from "./containers/EmployeePage";
import * as ROUTER from "./utilities/constants/router";
import Profile from "./containers/Profile";
import StudentPage from "./containers/StudentPage";
import RoomDetails from "./components/checkroom/RoomDetails";
import DetailedStudent from "./components/studentPage/DetailedStudent";
import MySchedule from "./components/profile/MySchedule";
import DetailedEmployee from "./components/employeePage/DetailedEmployee";
import Services from "./containers/Services";
import Checkroom from "./components/checkroom/Checkroom";
import WaterElectric from "./components/services/WaterElectric";
function App() {
  return (
    <Router history={history()}>
      <Switch>
        <Route path="/" exact>
          <Redirect to={ROUTER.ROUTE_DASHBOARD} />
        </Route>
        <Route path={ROUTER.ROUTE_LOGIN} component={Login} exact />
        <Route
          path={ROUTER.ROUTE_RESET_PASSWORD}
          component={ForgotPassword}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_FORGOT_PASSWORD}/:uuid/:token`}
          component={ResetPassword}
          exact
        />
        <Route
          path={ROUTER.ROUTE_DASHBOARD}
          component={withAuth(Dashboard)}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_CHECKROOM}`}
          component={withAuth(Map)}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_CHECKROOM}/:area`}
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
        <Route
          path={`${ROUTER.ROUTE_CHECKROOM}/detail/:roomID`}
          component={withAuth(RoomDetails)}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_STUDENTS}${ROUTER.ROUTE_DETAILED_STUDENTS}/:studentID`}
          component={withAuth(DetailedStudent)}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_MY_PROFILE}${ROUTER.ROUTE_SCHEDULE}`}
          component={withAuth(MySchedule)}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_EMPLOYEES}${ROUTER.ROUTE_DETAILED_EMPLOYEES}/:employeeID`}
          component={withAuth(DetailedEmployee)}
          exact
        />
        <Route
          path={ROUTER.ROUTE_SERVICES}
          component={withAuth(Services)}
          exact
        />
        <Route
          path={`${ROUTER.ROUTE_SERVICES}${ROUTER.ROUTE_WATER_ELECTRIC}`}
          component={withAuth(WaterElectric)}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
