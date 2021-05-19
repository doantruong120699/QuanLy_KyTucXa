import * as TypeActions from "../constants";

const initialState = {
  notifications: [],
  currentNotification: {},
  error: {},
  loading: false,
};

function overview(state = initialState, action) {
  switch (action.type) {
    case TypeActions.GET_NOTIFICATIONS_API:
    case TypeActions.CREATE_NOTIFICATION_API:
    case TypeActions.DELETE_NOTIFICATION_API:
    case TypeActions.UPDATE_NOTIFICATION_API:
    case TypeActions.GET_DETAILED_NOTIFICATION_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case TypeActions.GET_DETAILED_NOTIFICATION_API_SUCCEED:
      return {
        ...state,
        loading: false,
        currentNotification: {},
      };
    case TypeActions.GET_NOTIFICATIONS_API_SUCCEED:
      return {
        ...state,
        loading: false,
        notifications: {},
      };
    case TypeActions.GET_NOTIFICATIONS_API_FAIL:
    case TypeActions.CREATE_NOTIFICATION_API_FAIL:
    case TypeActions.DELETE_NOTIFICATION_API_FAIL:
    case TypeActions.DELETE_NOTIFICATION_API_SUCCEED:
    case TypeActions.UPDATE_NOTIFICATION_API_SUCCEED:
    case TypeActions.CREATE_NOTIFICATION_API_SUCCEED:
    case TypeActions.UPDATE_NOTIFICATION_API_FAIL:
    case TypeActions.GET_DETAILED_NOTIFICATION_API_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
}
export default overview;
