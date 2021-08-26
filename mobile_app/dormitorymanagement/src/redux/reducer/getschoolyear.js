import { actionType } from '../actionType';

const { GET_SCHOOL_YEAR_FAIL, GET_SCHOOL_YEAR_SUCCESS } = actionType;
const initialState = {
  msg: '',
  payload: [],
}
export const getschoolyear = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_SCHOOL_YEAR_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_SCHOOL_YEAR_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
