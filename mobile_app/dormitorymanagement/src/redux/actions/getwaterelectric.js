import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';

const { GET_WATER_ELECTRIC } = apiUrl;
const { GET_WATER_ELECTRIC_SUCCESS, GET_WATER_ELECTRIC_FAIL } = actionType;
export const getwaterelectric = (page, textSearch = '') => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    let url = GET_WATER_ELECTRIC;
    if (page != 1) {
      url += textSearch ? '?page=' + page + '&keyword=' + textSearch : '?page=' + page;
    }
    else {  
      url += textSearch ? '?keyword=' + textSearch : '';
    }
    result = await axios.get(url, config);
    dispatch({
      type: GET_WATER_ELECTRIC_SUCCESS,
      payload: result.data,
      msg: 'Success',
    });
  }
  catch (error) {
    dispatch({
      type: GET_WATER_ELECTRIC_FAIL,
      msg: "Không thể kết nối tới máy chủ"
    });
  }
};
