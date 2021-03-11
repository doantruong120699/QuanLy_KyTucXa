import * as TypeActions from "../constants/TypeActions";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
};

function reducerUser(state = initialState, action) {
  switch (action.type) {
    case TypeActions.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    default:
      return state;
  }
}
export default reducerUser;
