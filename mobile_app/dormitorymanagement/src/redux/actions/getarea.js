import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import { apiUrl } from '../../api/api';
import axios from 'axios';

const { GET_AREA_SUCCESS, GET_AREA_FAIL } = actionType;
const { GET_AREA } = apiUrl;
export const getarea = () => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    result = await axios.get(GET_AREA, config);
    dispatch({
      type: GET_AREA_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
  }
  catch (error) {
    dispatch({
      type: GET_AREA_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
}
