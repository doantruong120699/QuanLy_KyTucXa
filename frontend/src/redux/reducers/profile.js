import * as types from "../constants";

const initialState = {
  personalProfile: {},
  faculty: {},
  grade: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_PROFILE_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_PROFILE_API_SUCCEED:
      return {
        ...state,
        personalProfile: actions.payload,
        loading: false,
      };
    case types.GET_PROFILE_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    case types.GET_FACULTIES_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_FACULATIES_API_SUCCEED:
      return {
        ...state,
        faculty: actions.payload,
        loading: false,
      };
    case types.GET_FACULATIE_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    case types.GET_GRADE_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_GRADE_API_SUCCEED:
      return {
        ...state,
        grade: actions.payload,
        loading: false,
      };
    case types.GET_GRADE_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
