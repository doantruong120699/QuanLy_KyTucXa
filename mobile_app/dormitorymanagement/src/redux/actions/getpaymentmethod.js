import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import { apiUrl } from '../../api/api';
import axios from 'axios';

const { GET_PAYMENT_METHOD_SUCCESS, GET_PAYMENT_METHOD_FAIL } = actionType;
const { GET_PAYMENT_METHOD_URL } = apiUrl;
export const getpaymentmethod = () => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    result = await axios.get(GET_PAYMENT_METHOD_URL, config);
    dispatch({
      type: GET_PAYMENT_METHOD_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
  }
  catch (error) {
    dispatch({
      type: GET_PAYMENT_METHOD_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
}
