import { combineReducers } from "redux";
import login from "./login";
import dashboard from "./dashboard";
import profile from "./profile";
import changePass from "./changePass";
import checkroom from "./checkroom";

export default combineReducers({
  login,
  dashboard,
  profile,
  changePass,
  checkroom,
});
