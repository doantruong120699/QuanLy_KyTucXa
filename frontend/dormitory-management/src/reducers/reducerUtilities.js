import * as TypeActions from "../constants/TypeActions";

const initialState = {
  title: "Dashboard",
};

function reducerUtilities(state = initialState, action) {
  switch (action.type) {
    case TypeActions.FETCH_NAV_TITLE: {
      return { ...state, title: action.title };
    }
    default: {
      return state;
    }
  }
}
export default reducerUtilities;
