import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import { apiUrl } from '../../api/api';
import axios from 'axios';

const { GET_DETAIL_ROOM_SUCCESS, GET_DETAIL_ROOM_FAIL } = actionType;
const { GET_DETAIL_ROOM_URL } = apiUrl;
export const getdetailroom = (data) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    result = await axios.get(GET_DETAIL_ROOM_URL + "" + data + "/", config);
    dispatch({
      type: GET_DETAIL_ROOM_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
  }
  catch (error) {
    dispatch({
      type: GET_DETAIL_ROOM_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
}
