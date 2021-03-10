import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
// import axios from 'axios';
import {apiUrl} from '../../api/api';

const {GET_ALL_ROOM, GET_ALL_ROOM_SUCCESS, GET_ALL_ROOM_FAIL} = actionType;
export const getallroom = () => async (dispatch) => {
    let result;
    dispatch({
        type: GET_ALL_ROOM_SUCCESS,
    })
    // try {
    //     result = await axios.post(LOGIN_URL, data);
    //     let token = result.data.token;
    //     storeData('token', token);
    //     storeData('role', result.data.role);
    //     dispatch({
    //         type: LOGIN_SUCCESS, 
    //         payload: result.data
    //     });
    // }
    // catch(e) {
    //     const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    //     dispatch({
    //         type: LOGIN_FAIL, 
    //         payload: {msg}
    //     });
    // }
};