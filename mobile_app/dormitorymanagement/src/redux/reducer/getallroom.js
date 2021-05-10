import { actionType } from '../actionType';

const { GET_ALL_ROOM, GET_ALL_ROOM_SUCCESS, GET_ALL_ROOM_FAIL } = actionType;
const initialState = {
  msg: '',
  payload: '',
  filter_status: 'SHOW_ALL',
};
export const getallroom = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ALL_ROOM_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_ALL_ROOM_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
