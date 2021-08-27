import { actionType } from '../actionType';

const { GET_WATER_ELECTRIC_FAIL, GET_WATER_ELECTRIC_SUCCESS } = actionType;
const initialState = {
  msg: '',
  payload: [],
}
export const getwaterelectric = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_WATER_ELECTRIC_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_WATER_ELECTRIC_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
