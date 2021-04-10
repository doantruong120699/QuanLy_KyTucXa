import { actionType } from '../actionType';
import {apiUrl} from '../../api/api';
import axios from 'axios';

const { GET_FACULTI_SUCCESS, GET_FACULTI_FAIL } = actionType;
const { GET_FACULTI } = apiUrl;
export const getfaculty = () => async (dispatch) => {
    let result;
    try {
        let token = await getData('token');
        let config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }
        result = await axios.get(GET_FACULTI, config);
        dispatch({
            type: GET_FACULTI_SUCCESS, 
            payload: result.data,
        });
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(error);
        dispatch({
            type: GET_FACULTI_FAIL, 
            payload: {msg}
        });
    }
}