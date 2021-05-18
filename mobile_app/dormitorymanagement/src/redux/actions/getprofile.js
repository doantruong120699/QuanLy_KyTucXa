import { actionType } from '../actionType';
import { storeData, getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';

const { PROFILE_URL } = apiUrl;
const { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } = actionType;
export const getprofile = () => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    result = await axios.get(PROFILE_URL, config);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: result.data,
      msg: 'Success',
    });
  }
  catch (error) {
    if (error.response.status == 404) {
      dispatch({
        type: GET_PROFILE_FAIL,
        msg: "Không thể kết nối tới máy chủ"
      });
    }
    else {
      dispatch({
        type: GET_PROFILE_FAIL,
        msg: "Đã xảy ra lỗi, vui lòng thử lại sau"
      });
    }
  }
};