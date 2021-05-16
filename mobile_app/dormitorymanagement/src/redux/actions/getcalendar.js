import { actionType } from '../actionType';
import { apiUrl } from '../../api/api';
import axios from 'axios';
import { storeData, getData } from '../../utils/asyncStorage';

const { GET_CALENDAR_STAFF_SUCCESS, GET_CALENDAR_STAFF_FAIL } = actionType;
const { GET_CALENDAR_STAFF_URL } = apiUrl;
export const getcalendar = (week) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    result = await axios.get(GET_CALENDAR_STAFF_URL + week + "/", config);
    dispatch({
      type: GET_CALENDAR_STAFF_SUCCESS,
      payload: result.data,
      msg: 'Success',
    });
  }
  catch (error) {
    dispatch({
      type: GET_CALENDAR_STAFF_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
}