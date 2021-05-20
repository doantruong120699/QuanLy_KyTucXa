import { actionType } from '../actionType';

const { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } = actionType;
const initialState = {
  msg: '',
  payload: ''
};
export const getprofile = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_PROFILE_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_PROFILE_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
