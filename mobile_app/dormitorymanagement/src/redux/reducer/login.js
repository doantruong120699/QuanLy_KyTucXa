import { actionType } from '../actionType';

const { LOGIN_SUCCESS, LOGIN_FAIL } = actionType;
const initialState = {
  isLoggedIn: false,
  msg: '',
  payload: '',
  permission: [],
};
export const login = (state = initialState, actions) => {
  switch (actions.type) {
    case LOGIN_SUCCESS:
      return { ...state, payload: actions.payload, isLoggedIn: true, permission: actions.permission };
    case LOGIN_FAIL:
      return { ...state, msg: actions.msg, isLoggedIn: false };
    default:
      return state;
  }
};
