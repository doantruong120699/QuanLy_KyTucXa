import * as types from "../constants";

const initialState = {
  accountList: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_ACCOUNTS_API:
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
    case types.GET_ACCOUNTS_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
