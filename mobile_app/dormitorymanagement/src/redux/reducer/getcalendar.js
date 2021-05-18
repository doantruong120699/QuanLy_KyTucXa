import { actionType } from '../actionType';

const { GET_CALENDAR_STAFF_SUCCESS, GET_CALENDAR_STAFF_FAIL } = actionType;
const initialState = {
  msg: '',
  payload: '',
}
export const getcalendar = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_CALENDAR_STAFF_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_CALENDAR_STAFF_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
