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
        console.log("B");
        let token = result.data.access;
        storeData('token', token);
        console.log(token);
        // storeData('role', result.data.role);
        dispatch({
            type: LOGIN_SUCCESS, 
            payload: result.data
        });
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(error);
        dispatch({
            type: LOGIN_FAIL, 
            payload: {msg}
        });
    }
    // fetch(LOGIN_URL, {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)})
    //     .then((response) => response.json())
    //     .then((json) => {
    //         console.log("A");
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
};