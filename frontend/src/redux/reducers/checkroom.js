import * as types from "../constants";

const initialState = {
  listRoom: {},
  currentRoom: {},
  error: {},
  loading: false,
};

export default function checkroom(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_ROOMS_API:
    case types.GET_ROOM_DETAILS_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_ROOMS_API_SUCCEED:
      return {
        ...state,
        listRoom: actions.payload,
        loading: false,
      };
    case types.GET_ROOM_DETAILS_API_SUCCEED:
      return {
        ...state,
        currentRoom: actions.payload,
        loading: false,
      };
    case types.GET_ROOMS_API_FAIL:
    case types.GET_ROOM_DETAILS_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
