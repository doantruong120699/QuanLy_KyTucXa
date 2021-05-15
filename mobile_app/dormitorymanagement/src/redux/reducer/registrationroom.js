import { actionType } from '../actionType';

const { REGISTRATION_ROOM, REGISTRATION_ROOM_FAIL, REGISTRATION_ROOM_SUCCESS } = actionType;
const initialState = {
  msg: '',
}

export const registrationroom = (state = initialState, actions) => {
  switch (actions.type) {
    case REGISTRATION_ROOM_SUCCESS:
      return { ...state, msg: actions.msg };
    case REGISTRATION_ROOM_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
}
