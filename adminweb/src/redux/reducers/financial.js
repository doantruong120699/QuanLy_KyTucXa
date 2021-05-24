import * as types from "../constants";

const initialState = {
  financialRooms: {},
  expenses: {},
  statisticalBill: {},
  waterElectricalBills: {},
  detailedWaterElectricalBill: {},
  waterElectricalIndexes: {},
  detailedWaterElectricalIndex: {},
  unitPrice: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_FINANCIAL_API:
    case types.GET_WATER_ELECTRICAL_UNIT_PRICE_API:
    case types.UPDATE_WATER_ELECTRICAL_BILL_API:
    case types.DELETE_WATER_ELECTRICAL_BILL_API:
    case types.GET_LIST_WATER_ELECTRICAL_BILL_API:
    case types.GET_DETAILED_WATER_ELECTRICAL_BILL_API:
    case types.CREATE_WATER_ELECTRICAL_INDEX_API:
    case types.UPDATE_WATER_ELECTRICAL_INDEX_API:
    case types.DELETE_WATER_ELECTRICAL_INDEX_API:
    case types.GET_LIST_WATER_ELECTRICAL_INDEX_API:
    case types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API:
    case types.GET_STATISTICAL_BILL_API:
    case types.GET_EXPENSES_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_FINANCIAL_API_SUCCEED:
      return {
        ...state,
        financialRooms: actions.payload,
        loading: false,
      };
    case types.GET_EXPENSES_API_SUCCEED:
      return {
        ...state,
        expenses: actions.payload,
        loading: false,
      };
    case types.GET_WATER_ELECTRICAL_UNIT_PRICE_API_SUCCEED:
      return {
        ...state,
        unitPrice: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_WATER_ELECTRICAL_BILL_API_SUCCEED:
      return {
        ...state,
        detailedWaterElectricalBill: actions.payload,
        loading: false,
      };
    case types.GET_LIST_WATER_ELECTRICAL_INDEX_API_SUCCEED:
      return {
        ...state,
        waterElectricalIndexes: actions.payload,
        loading: false,
      };
    case types.GET_STATISTICAL_BILL_API_SUCCEED:
      return {
        ...state,
        statisticalBill: actions.payload,
        loading: false,
      };
    case types.GET_LIST_WATER_ELECTRICAL_BILL_API_SUCCEED:
      return {
        ...state,
        waterElectricalBills: actions.payload,
        loading: false,
      };
    case types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API_SUCCEED:
      return {
        ...state,
        detailedWaterElectricalIndex: actions.payload,
        loading: false,
      };
    case types.GET_FINANCIAL_API_FAIL:
    case types.GET_EXPENSES_API_FAIL:
    case types.GET_STATISTICAL_BILL_API_FAIL:
    case types.GET_WATER_ELECTRICAL_UNIT_PRICE_API_FAIL:
    case types.UPDATE_WATER_ELECTRICAL_BILL_API_FAIL:
    case types.DELETE_WATER_ELECTRICAL_BILL_API_FAIL:
    case types.UPDATE_WATER_ELECTRICAL_BILL_API_SUCCEED:
    case types.DELETE_WATER_ELECTRICAL_BILL_API_SUCCEED:
    case types.GET_LIST_WATER_ELECTRICAL_BILL_API_FAIL:
    case types.GET_DETAILED_WATER_ELECTRICAL_BILL_API_FAIL:
    case types.CREATE_WATER_ELECTRICAL_INDEX_API_FAIL:
    case types.UPDATE_WATER_ELECTRICAL_INDEX_API_FAIL:
    case types.DELETE_WATER_ELECTRICAL_INDEX_API_FAIL:
    case types.CREATE_WATER_ELECTRICAL_INDEX_API_SUCCEED:
    case types.UPDATE_WATER_ELECTRICAL_INDEX_API_SUCCEED:
    case types.DELETE_WATER_ELECTRICAL_INDEX_API_SUCCEED:
    case types.GET_LIST_WATER_ELECTRICAL_INDEX_API_FAIL:
    case types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
