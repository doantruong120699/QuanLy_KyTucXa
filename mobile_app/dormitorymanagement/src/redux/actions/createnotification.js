import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';

const { NOTIFICATION_URL } = apiUrl;
const { CREATE_NOTIFICATION_SUCCESS, CREATE_NOTIFICATION_FAIL } = actionType;
export const createnotification = (data) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    result = await axios.post(NOTIFICATION_URL, data, config);
    dispatch({
      type: CREATE_NOTIFICATION_SUCCESS,
      msg: 'Success',
    });
  }
  catch (error) {
    dispatch({
      type: CREATE_NOTIFICATION_FAIL,
      msg: 'Không thể kết nối tới máy chủ',
    });
  };
}
