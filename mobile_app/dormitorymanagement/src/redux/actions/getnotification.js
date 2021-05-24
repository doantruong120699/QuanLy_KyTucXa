import { actionType } from '../actionType';
import { apiUrl } from '../../api/api';
import axios from 'axios';
import { getData } from '../../utils/asyncStorage';

const { GET_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAIL } = actionType;
const { GET_NOTIFICATION } = apiUrl;
export const getnotification = (page) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    if (page != 1) {
      result = await axios.get(GET_NOTIFICATION + "?page=" + page, config);
    }
    else {
      result = await axios.get(GET_NOTIFICATION, config);
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
