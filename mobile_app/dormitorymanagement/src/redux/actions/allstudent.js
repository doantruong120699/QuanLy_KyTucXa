import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
import axios from 'axios';
import {apiUrl} from '../../api/api';
import _ from 'lodash';

const { GET_ALL_STUDENT_URL } = apiUrl;
const {GET_ALL_STUDENT, GET_ALL_STUDENT_SUCCESS, GET_ALL_STUDENT_FAIL} = actionType;
export const allstudent = () => async (dispatch) => {
    let result;
    try {
        let token = await getData('token');
        let config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }
        result = await axios.get(GET_ALL_STUDENT_URL, config);
        dispatch({
            type: GET_ALL_STUDENT_SUCCESS, 
            payload: result.data,
        });
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(error);
        dispatch({
            type: GET_ALL_STUDENT_FAIL, 
            payload: {msg}
        });
    }
};