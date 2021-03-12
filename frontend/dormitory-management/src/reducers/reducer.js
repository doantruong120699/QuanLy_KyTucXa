import { combineReducers } from "redux";
import reducerUtilities from "./reducerUtilities";
import reducerUser from "./reducerUser";
const reducer = combineReducers({
  reducerUser,
  reducerUtilities,
});

export default reducer;
