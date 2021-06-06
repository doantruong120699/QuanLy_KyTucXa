import { actionType } from '../actionType';

const { CREATE_NOTIFICATION_SUCCESS, CREATE_NOTIFICATION_FAIL } = actionType;
const initialState = {
  msg: '',
}

export const createnotification = (state = initialState, actions) => {
  switch (actions.type) {
    case CREATE_NOTIFICATION_SUCCESS:
      return { ...state, msg: actions.msg };
    case CREATE_NOTIFICATION_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
}
