import { actionType } from '../actionType';
import { storeData, getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';

const { GET_ALL_STAFF_URL } = apiUrl;
const { GET_ALL_STAFF, GET_ALL_STAFF_SUCCESS, GET_ALL_STAFF_FAIL } = actionType;
export const allstaff = (page) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    if (page != 1) {
      result = await axios.get(GET_ALL_STAFF_URL + "?page=" + page, config);
    }
    else {
      result = await axios.get(GET_ALL_STAFF_URL, config);
    }
    dispatch({
      type: GET_ALL_STAFF_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
  }
  catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    console.log(error);
    dispatch({
      type: GET_ALL_STAFF_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
};