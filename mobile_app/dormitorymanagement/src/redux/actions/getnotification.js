import { actionType } from '../actionType';
import { apiUrl } from '../../api/api';
import axios from 'axios';
import { getData } from '../../utils/asyncStorage';

const { GET_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAIL } = actionType;
const { NOTIFICATION_URL } = apiUrl;
export const getnotification = (page) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    if (page != 1) {
      result = await axios.get(NOTIFICATION_URL + "?page=" + page, config);
    }
    else {
      result = await axios.get(NOTIFICATION_URL, config);
    }
    dispatch({
      type: GET_NOTIFICATION_SUCCESS,
      payload: result.data,
      msg: 'Success',
    });
  }
  catch (error) {
    dispatch({
      type: GET_NOTIFICATION_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
}
