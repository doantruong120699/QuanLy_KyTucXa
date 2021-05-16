import * as types from "../constants";

const initialState = {
  listRoom: {},
  searchRoom: [],
  currentRoom: {},
  paymentMethods: {},
  registrationError: {},
  error: {},
  loading: false,
};

export default function checkroom(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_ROOMS_API:
    case types.GET_ROOM_DETAILS_API:
    case types.POST_REGISTRATION_API:
    case types.GET_PAYMENT_METHODS_API:
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
    case types.GET_PAYMENT_METHODS_API_SUCCEED:
      return {
        ...state,
        paymentMethods: actions.payload,
        loading: false,
      };
    case types.POST_REGISTRATION_API_SUCCEED:
      return {
        ...state,
        registrationError: actions.payload,
        loading: false,
      };
    case types.GET_ROOMS_API_FAIL:
    case types.GET_ROOM_DETAILS_API_FAIL:
    case types.GET_PAYMENT_METHODS_API_FAIL:
    case types.POST_REGISTRATION_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
