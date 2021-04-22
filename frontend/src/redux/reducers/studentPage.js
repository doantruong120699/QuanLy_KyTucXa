import * as types from "../constants";

const initialState = {
  listStudent: {},
  currentStudent: {},
  error: {},
  loading: false,
};

export default function employeePage(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_STUDENTS_API:
    case types.GET_DETAILED_STUDENT_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_STUDENTS_API_SUCCEED:
      return {
        ...state,
        listStudent: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_STUDENT_API_SUCCEED:
      return {
        ...state,
        currentStudent: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_STUDENT_API_FAIL:
    case types.GET_STUDENTS_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
