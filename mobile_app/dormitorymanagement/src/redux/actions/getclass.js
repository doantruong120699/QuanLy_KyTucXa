import { actionType } from '../actionType';
import {apiUrl} from '../../api/api';
import axios from 'axios';

const { GET_CLASS_SUCCESS, GET_CLASS_FAIL } = actionType;
const { GET_CLASS } = apiUrl;
export const getclass = () => async (dispatch) => {
    let result;
    try {
        let token = await getData('token');
        let config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }
        result = await axios.get(GET_CLASS, config);
        dispatch({
            type: GET_CLASS_SUCCESS, 
            payload: result.data,
        });
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(error);
        dispatch({
            type: GET_CLASS_FAIL, 
            payload: {msg}
        });
    }
}