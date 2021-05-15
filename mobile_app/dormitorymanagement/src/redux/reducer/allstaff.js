import { actionType } from '../actionType';

const { GET_ALL_STAFF_SUCCESS, GET_ALL_STAFF_FAIL } = actionType;
const initialState = {
  msg: '',
  payload: '',
}
export const allstaff = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ALL_STAFF_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_ALL_STAFF_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
