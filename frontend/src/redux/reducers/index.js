import { combineReducers } from "redux";
import login from "./login";
import dashboard from "./dashboard";
import checkroom from "./checkroom";

export default combineReducers({
  login,
  dashboard,
  checkroom,
});
