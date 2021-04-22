import * as types from "../constants";

const initialState = {
  listEmployee: {},
  currentEmployee: {},
  error: {},
  loading: false,
};

export default function employeePage(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_EMPLOYEES_API:
    case types.GET_DETAILED_EMPLOYEE_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_EMPLOYEES_API_SUCCEED:
      return {
        ...state,
        listEmployee: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_EMPLOYEE_API_SUCCEED:
      return {
        ...state,
        currentEmployee: actions.payload,
        loading: false,
      };
    case types.GET_EMPLOYEES_API_FAIL:
    case types.GET_DETAILED_EMPLOYEE_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
