import { actionType } from '../actionType';

const { GET_PAYMENT_METHOD_SUCCESS, GET_PAYMENT_METHOD_FAIL } = actionType;
const initialState = {
  msg: '',
  payload: [],
}
export const getpaymentmethod = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_PAYMENT_METHOD_SUCCESS:
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_PAYMENT_METHOD_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
