import { actionType } from '../actionType';

const { CHANGE_PROFILE_SUCCESS, CHANGE_PROFILE_FAIL } = actionType;
const initialState = {
  msg: '',
}

export const changeprofile = (state = initialState, actions) => {
  switch (actions.type) {
    case CHANGE_PROFILE_SUCCESS:
      return { ...state, msg: actions.msg };
    case CHANGE_PROFILE_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
}
