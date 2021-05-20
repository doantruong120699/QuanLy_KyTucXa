import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';

const { GET_ALL_STAFF_URL } = apiUrl;
const { GET_ALL_STAFF_SUCCESS, GET_ALL_STAFF_FAIL } = actionType;
export const allstaff = (page, textSearch='') => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    let url = GET_ALL_STAFF_URL;
    if (page != 1) {
      url += textSearch ? '?page=' + page + '&keyword=' + textSearch : '?page=' + page;
    }
    else {  
      url += textSearch ? '?keyword=' + textSearch : '';
    }
    result = await axios.get(url, config);
    dispatch({
      type: GET_ALL_STAFF_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
  }
  catch (error) {
    dispatch({
      type: GET_ALL_STAFF_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
};
