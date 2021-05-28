import { actionType } from '../actionType';
import { getData, storeData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';
import jwt_decode from "jwt-decode";

const { LOGIN_URL } = apiUrl;
const { LOGIN_FAIL, LOGIN_SUCCESS } = actionType;
export const login = (data) => async (dispatch) => {
  storeData('token', '');
  let result;
  try {
    result = await axios.post(LOGIN_URL, data);
    let token = result.data.access;
    let decoded = jwt_decode(token);
    storeData('token', token);
    storeData('role', decoded.group[0]);
    storeData('name', decoded.last_name + ' ' + decoded.first_name);
    storeData('permission', JSON.stringify(decoded.permission));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data,
      permission: decoded.permission
    });
  }
  catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    if (error.response.status == 401) {
      dispatch({
        type: LOGIN_FAIL,
        msg: "Sai tài khoản hoặc mật khẩu"
      });
    }
    else if (error.response.status == 404) {
      dispatch({
        type: LOGIN_FAIL,
        msg: "Không thể kết nối tới máy chủ"
      });
    }
  }
};
