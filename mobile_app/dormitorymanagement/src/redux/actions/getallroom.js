import { actionType } from '../actionType';
import { storeData, getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';

const { GET_ALL_ROOM_URL } = apiUrl;
const { GET_ALL_ROOM, GET_ALL_ROOM_SUCCESS, GET_ALL_ROOM_FAIL } = actionType;
export const getallroom = (page) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    if (page != 1) {
      result = await axios.get(GET_ALL_ROOM_URL + "?page=" + page, config);
    }
    else {
      result = await axios.get(GET_ALL_ROOM_URL, config);
    }
    dispatch({
      type: GET_ALL_ROOM_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
  }
  catch (e) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    dispatch({
      type: GET_ALL_STUDENT_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
};
