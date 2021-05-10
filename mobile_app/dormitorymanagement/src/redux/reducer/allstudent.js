import { actionType } from '../actionType';

const { GET_ALL_STUDENT_SUCCESS, GET_ALL_STUDENT_FAIL } = actionType;
const initialState = {
  msg: '',
  payload: '',
}
export const allstudent = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ALL_STUDENT_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_ALL_STUDENT_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
