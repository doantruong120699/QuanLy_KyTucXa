import { actionType } from '../actionType';
import {apiUrl} from '../../api/api';
import axios from 'axios';

const { GET_POSITION_SUCCESS, GET_POSITION_FAIL } = actionType;
const { GET_POSITION } = apiUrl;
export const getposition = () => async (dispatch) => {
    let result;
    try {
        let token = await getData('token');
        let config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }
        result = await axios.get(GET_POSITION, config);
        dispatch({
            type: GET_POSITION_SUCCESS, 
            payload: result.data,
        });
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(error);
        dispatch({
            type: GET_POSITION_FAIL, 
            payload: {msg}
        });
    }
}