import { actionType } from '../actionType';

const { GET_DASHBOARD_SUCCESS, GET_DASHBOARD_FAIL } = actionType;
const initialState = {
  msg: '',
  payload: '',
}
export const dashboard = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_DASHBOARD_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_DASHBOARD_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
