import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';

const { GET_ALL_ROOM_URL } = apiUrl;
const { GET_ALL_ROOM_SUCCESS, GET_ALL_ROOM_FAIL } = actionType;
export const getallroom = (page, textSearch) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    let url = GET_ALL_ROOM_URL;
    if (page != 1) {
      url += textSearch ? '?page=' + page + '&keyword=' + textSearch : '?page=' + page;
    }
    else {  
      url += textSearch ? '?keyword=' + textSearch : '';
    }
    result = await axios.get(url, config);
    dispatch({
      type: GET_ALL_ROOM_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
    console.log("A")
  }
  catch (e) {
    dispatch({
      type: GET_ALL_ROOM_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
};
