import { actionType } from '../actionType';

const { GET_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAIL } = actionType;
const initialState = {
  msg: '',
  payload: '',
}
export const getnotification = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_NOTIFICATION_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_NOTIFICATION_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
