import * as types from "../constants";

const initialState = {
  listWaterElectricity: {},
  currentBill: {},
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_BILL:
    case types.GET_DETAILED_BILL:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_LIST_BILL_FAIL:
    case types.GET_DETAILED_BILL_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    case types.GET_LIST_BILL_SUCCEED:
      return {
        ...state,
        listWaterElectricity: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_BILL_SUCCEED:
      return {
        ...state,
        currentBill: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
