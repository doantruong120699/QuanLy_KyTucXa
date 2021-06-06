import { actionType } from '../actionType';
import { apiUrl } from '../../api/api';
import axios from 'axios';
import { getData } from '../../utils/asyncStorage';

const { GET_CALENDAR_STAFF_SUCCESS, GET_CALENDAR_STAFF_FAIL } = actionType;
const { GET_CALENDAR_STAFF_URL } = apiUrl;
export const getcalendar = (week, year=0) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    if (year) {
      result = await axios.get(GET_CALENDAR_STAFF_URL + "?week=" + week + "&year=" + year, config);
    }
    else {
      result = await axios.get(GET_CALENDAR_STAFF_URL + "?week=" + week, config);
    }
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
