import { actionType } from '../actionType';

const { GET_DETAIL_ROOM_SUCCESS, GET_DETAIL_ROOM_FAIL } = actionType;
const initialState = {
  msg: '',
  payload: [],
}
export const getdetailroom = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_DETAIL_ROOM_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_DETAIL_ROOM_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
