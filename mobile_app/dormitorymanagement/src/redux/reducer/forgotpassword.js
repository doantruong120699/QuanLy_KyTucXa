import { actionType } from '../actionType';

const { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL } = actionType;
const initialState = {
  msg: '',
}
export const forgotpassword = (state = initialState, actions) => {
  switch (actions.type) {
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, msg: actions.msg };
    case FORGOT_PASSWORD_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
