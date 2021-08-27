import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';

const { REGISTRATION_ROOM_URL_1_3, REGISTRATION_ROOM_URL_2 } = apiUrl;
const { REGISTRATION_ROOM_FAIL, REGISTRATION_ROOM_SUCCESS } = actionType;
export const registrationroom = (data, stage) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    if (stage === 'registration_stage_2') {
      result = await axios.post(REGISTRATION_ROOM_URL_2, data, config);
    } else {
      result = await axios.post(REGISTRATION_ROOM_URL_1_3, data, config);
    }
    dispatch({
      type: REGISTRATION_ROOM_SUCCESS,
      msg: stage === 'registration_stage_2' ? 'Bao phòng thành công' : 'Đăng ký phòng thành công',
    });
  }
  catch (error) {
    if (error.response.status == 400) {
      dispatch({
        type: REGISTRATION_ROOM_FAIL,
        msg: error.response.data.notification
      });
    } else {
      dispatch({
        type: REGISTRATION_ROOM_FAIL,
        msg: 'Không thể kết nối tới máy chủ',
      });
    }
  };
}
