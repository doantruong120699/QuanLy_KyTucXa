import * as TypeActions from "../constants";

const initialState = {
  title: "Dashboard",
  notifications: [],
  error: {},
  loading: false,
};

function dashboard(state = initialState, actions) {
  switch (actions.type) {
    case TypeActions.GET_NOTIFICATIONS_API:
    case TypeActions.POST_NOTIFICATION:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case TypeActions.GET_NOTIFICATIONS_API_SUCCEED:
      return {
        ...state,
        notifications: actions.payload,
        loading: false,
      };
    case TypeActions.GET_NOTIFICATIONS_API_FAIL:
    case TypeActions.POST_NOTIFICATION_FAIL:
    case TypeActions.POST_NOTIFICATION_SUCCEED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    case TypeActions.FETCH_NAV_TITLE: {
      return { ...state, title: actions.title };
    }
    default: {
      return state;
    }
  }
}
export default dashboard;
