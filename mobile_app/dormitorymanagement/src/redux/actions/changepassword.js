import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';

const { CHANGE_PASSWORD_URL } = apiUrl;
const { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } = actionType;
export const changepassword = (data) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    result = await axios.put(CHANGE_PASSWORD_URL, data, config);
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      msg: 'Success',
    })
  }
  catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    if (error.response.status == 404) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        msg: "Không thể kết nối tới máy chủ"
      });
    }
    else if (error.response.status == 454) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        msg: "Mật khẩu cũ không chính xác"
      });
    }
    else {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        msg: "Đã xảy ra lỗi, vui lòng thử lại sau"
      });
    }
  }
}
