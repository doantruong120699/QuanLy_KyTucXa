import { actionType } from '../actionType';
import { getData } from '../../utils/asyncStorage';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import _ from 'lodash';

const { CHANGE_PROFILE_URL } = apiUrl;
const { CHANGE_PROFILE_SUCCESS, CHANGE_PROFILE_FAIL } = actionType;
export const changeprofile = (data) => async (dispatch) => {
  let result;
  try {
    let token = await getData('token');
    let config = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    result = await axios.put(CHANGE_PROFILE_URL, data, config);
    dispatch({
      type: CHANGE_PROFILE_SUCCESS,
      msg: "Success",
    });
  }
  catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    dispatch({
      type: CHANGE_PROFILE_FAIL,
      msg: "Fail"
    });
  }
};
