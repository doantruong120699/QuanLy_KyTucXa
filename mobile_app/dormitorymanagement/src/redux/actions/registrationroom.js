import { actionType } from '../actionType';
import { storeData, getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';
import jwt_decode from "jwt-decode";

const { REGISTRATION_ROOM_URL } = apiUrl;
const { REGISTRATION_ROOM_FAIL, REGISTRATION_ROOM_SUCCESS } = actionType;
export const registrationroom = (data) => async (dispatch) => {
  let result;
  try {
    console.log(data);
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    console.log(REGISTRATION_ROOM_URL)
    result = await axios.post(REGISTRATION_ROOM_URL, data, config);
    dispatch({
      type: REGISTRATION_ROOM_SUCCESS,
      msg: 'Success',
    });
  }
  catch (error) {
    console.log(error);
    if (error.response.status == 400) {
      dispatch({
        type: REGISTRATION_ROOM_FAIL,
        msg: "Bạn đã đăng ký phòng khác"
      });
    } else {
      dispatch({
        type: REGISTRATION_ROOM_FAIL,
        msg: 'Không thể kết nối tới máy chủ',
      });
    }
  };
}