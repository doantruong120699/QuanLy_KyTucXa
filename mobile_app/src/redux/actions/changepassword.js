import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
// import axios from 'axios';
import {apiUrl} from '../../api/api';

const {CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL} = actionType;
const {CHANGE_PASSWORD_URL} = apiUrl;

export const changePassword = async (data) => {
    const token = await getData('token');
    let result;
    if (token !== null || token !== '' || token !== undefined) {
        // try {
        //     result = await axios.post(CHANGE_PASSWORD_URL, data);
        //     dispatch({
        //         type: CHANGE_PASSWORD_SUCCESS, 
        //         payload: result.data,
        //     });
        // }
        // catch(e) {
        //     const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        //     dispatch({
        //         type: CHANGE_PASSWORD_FAIL, 
        //         payload: {msg},
        //     });
        // }
    }
};