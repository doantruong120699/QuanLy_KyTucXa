import { combineReducers } from "redux";
import login from "./login";
import overview from "./overview";
import profile from "./profile";
import changePass from "./changePass";

export default combineReducers({
  login,
  overview,
  profile,
  changePass,
});
