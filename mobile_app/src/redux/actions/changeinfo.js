import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
// import axios from 'axios';
import {apiUrl} from '../../api/api';

const {CHANGE_INFO, CHANGE_INFO_SUCCESSL, CHANGE_INFO_FAIL} = actionType;
export const changeinfo = (data) => {
    let result;
    // try {
    //     result = await axios.post(CHANGE_INFO_URL, data);
    //     let msg = result.msg;
    //     dispatch({
    //         type: CHANGE_INFO_SUCCESSL, 
    //         payload: {msg},
    //     });
    // }
    // catch(e) {
    //     const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    //     dispatch({
    //         type: CHANGE_INFO_FAIL, 
    //         payload: {msg}
    //     });
    // }
};