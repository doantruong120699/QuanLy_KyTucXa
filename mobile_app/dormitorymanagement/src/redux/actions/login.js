import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
import axios from 'axios';
import {apiUrl} from '../../api/api';
import _ from 'lodash';

const { LOGIN_URL } = apiUrl;
const {LOGIN, LOGIN_FAIL, LOGIN_SUCCESS} = actionType;
export const login = (data) => async (dispatch) => {
    storeData('token', '');
    let result;
    console.log(data);
    console.log(LOGIN_URL);
    try {
        result = await axios.post(LOGIN_URL, data);
        // let token = result.data.access;
        // storeData('token', token);
        // console.log(token);
        // // storeData('role', result.data.role);
        // dispatch({
        //     type: LOGIN_SUCCESS, 
        //     payload: result.data
        // });
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(msg);
        dispatch({
            type: LOGIN_FAIL, 
            payload: {msg}
        });
    }
};