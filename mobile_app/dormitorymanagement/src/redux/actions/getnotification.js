import { actionType } from '../actionType';
import {apiUrl} from '../../api/api';
import axios from 'axios';

const { GET_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAIL } = actionType;
const { GET_NOTIFICATION } = apiUrl;
export const getnotification = (page) => async (dispatch) => {
    let result;
    try {
        let token = await getData('token');
        // let config = {
        //     headers: { 'Authorization': 'Bearer ' + token }
        // }
        // result = await axios.get(GET_NOTIFICATION, config);
        dispatch({
            type: GET_NOTIFICATION_SUCCESS, 
            payload: "result.data",
        });
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(error);
        dispatch({
            type: GET_NOTIFICATION_FAIL, 
            payload: {msg}
        });
    }
}