import * as types from "../constants";

const initialState = {
  resgistrations: {},
  currentRegistration: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_REGISTRATION_API:
    case types.GET_DETAILED_REGISTRATION_API:
    case types.ACCEPT_REGISTRATION_API:
    case types.ADD_DAILY_SCHEDULE_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_LIST_REGISTRATION_API_SUCCEED:
      return {
        ...state,
        resgistrations: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_REGISTRATION_API_SUCCEED:
      return {
        ...state,
        currentRegistration: actions.payload,
        loading: false,
      };
    case types.GET_LIST_REGISTRATION_API_FAIL:
    case types.GET_DETAILED_REGISTRATION_API_FAIL:
    case types.ACCEPT_REGISTRATION_API_FAIL:
    case types.ACCEPT_REGISTRATION_API_SUCCEED:
    case types.ADD_DAILY_SCHEDULE_API_FAIL:
    case types.ADD_DAILY_SCHEDULE_API_SUCCEED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
