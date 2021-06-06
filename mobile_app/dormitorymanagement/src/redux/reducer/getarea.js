import { actionType } from '../actionType';

const { GET_AREA_FAIL, GET_AREA_SUCCESS } = actionType;
const initialState = {
  msg: '',
  payload: [],
}
export const getarea = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_AREA_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_AREA_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
