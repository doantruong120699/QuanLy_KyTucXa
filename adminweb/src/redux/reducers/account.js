import * as types from "../constants";

const initialState = {
  accountList: {},
  groupAndPermission: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_ACCOUNTS_API:
    case types.GET_GROUP_AND_PERMISSION_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_ACCOUNTS_API_SUCCEED:
      return {
        ...state,
        accountList: actions.payload,
        loading: false,
      };
    case types.GET_GROUP_AND_PERMISSION_API_SUCCEED:
      return {
        ...state,
        groupAndPermission: actions.payload,
        loading: false,
      };
    case types.GET_ACCOUNTS_API_FAIL:
    case types.GET_GROUP_AND_PERMISSION_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
