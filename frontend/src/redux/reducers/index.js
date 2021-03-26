import { combineReducers } from "redux";
import login from "./login";
import dashboard from "./dashboard";
import profile from "./profile";

export default combineReducers({
  login,
  dashboard,
  profile,
});
