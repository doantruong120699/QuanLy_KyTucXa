import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
// import axios from 'axios';
import {apiUrl} from '../../api/api';

const {GET_CALENDAR_STAFF, GET_CALENDAR_STAFF_SUCCESS, GET_CALENDAR_STAFF_FAIL} = actionType;
export const getcalendar = (data) => {
    let result;
    // try {
    //     result = await axios.post(GET_CALENDAR_STAFF_URL, data);
    //     let calendar = result.data.calendar;
    //     dispatch({
    //         type: GET_CALENDAR_STAFF_SUCCESS, 
    //         payload: result.data.calendar
    //     });
    // }
    // catch(e) {
    //     const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    //     dispatch({
    //         type: GET_CALENDAR_STAFF_FAIL, 
    //         payload: {msg}
    //     });
    // }
};