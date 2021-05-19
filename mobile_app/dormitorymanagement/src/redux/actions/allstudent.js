import { actionType } from '../actionType';
import { storeData, getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';

const { GET_ALL_STUDENT_URL } = apiUrl;
const { GET_ALL_STUDENT_SUCCESS, GET_ALL_STUDENT_FAIL } = actionType;
export const allstudent = (page, textSearch='') => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    let url = GET_ALL_STUDENT_URL;
    if (page != 1) {
      url += textSearch ? '?page=' + page + '&keyword=' + textSearch : '?page=' + page;
    }
    else {  
      url += textSearch ? '?keyword=' + textSearch : '';
    }
    result = await axios.get(url, config);
    dispatch({
      type: GET_ALL_STUDENT_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
  }
  catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    console.log(msg);
    dispatch({
      type: GET_ALL_STUDENT_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
};
