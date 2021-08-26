import { actionType } from '../actionType';
import { apiUrl } from '../../api/api';
import axios from 'axios';

const { GET_SCHOOL_YEAR_FAIL, GET_SCHOOL_YEAR_SUCCESS } = actionType;
const { GET_SCHOOL_YEAR } = apiUrl;
export const getschoolyear = () => async (dispatch) => {
  let result;
  try {
    result = await axios.get(GET_SCHOOL_YEAR);
    dispatch({
      type: GET_SCHOOL_YEAR_SUCCESS,
      payload: result.data,
      msg: 'Success'
    });
  }
  catch (error) {
    dispatch({
      type: GET_SCHOOL_YEAR_FAIL,
      msg: 'Không thể kết nối tới máy chủ'
    });
  }
}
