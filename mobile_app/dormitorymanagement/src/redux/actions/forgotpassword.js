import { actionType } from '../actionType';
import axios from 'axios';
import { apiUrl } from '../../api/api';

const { FORGOT_PASSWORD_URL } = apiUrl;
const { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL } = actionType;
export const forgotpassword = (data) => async (dispatch) => {
  let result;
  try {
    result = await axios.post(FORGOT_PASSWORD_URL, data);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      msg: 'Success'
    });
  }
  catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
};
