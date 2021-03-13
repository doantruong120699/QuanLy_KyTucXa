import * as TypeActions from "../constants";

const initialState = {
  title: "Dashboard",
};

function dashboard(state = initialState, action) {
  switch (action.type) {
    case TypeActions.FETCH_NAV_TITLE: {
      return { ...state, title: action.title };
    }
    default: {
      return state;
    }
  }
}
export default dashboard;
