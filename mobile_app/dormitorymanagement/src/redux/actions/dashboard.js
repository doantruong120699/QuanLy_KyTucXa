import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';

const { GET_DASHBOARD_URL } = apiUrl;
const { GET_DASHBOARD_SUCCESS, GET_DASHBOARD_FAIL } = actionType;
export const dashboard = () => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    result = await axios.get(GET_DASHBOARD_URL, config);
    dispatch({
      type: GET_DASHBOARD_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
  }
  catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    dispatch({
      type: GET_DASHBOARD_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
};
