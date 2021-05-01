import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
import axios from 'axios';
import {apiUrl} from '../../api/api';
import _ from 'lodash';
import jwt_decode from "jwt-decode";

const { LOGIN_URL } = apiUrl;
const {LOGIN, LOGIN_FAIL, LOGIN_SUCCESS} = actionType;
export const login = (data) => async (dispatch) => {
    storeData('token', '');
    let result;
    try {
        result = await axios.post(LOGIN_URL, data);
        let token = result.data.access;
        let decoded = jwt_decode(token);
        storeData('token', token);
        storeData('role', decoded.group[0]);
        // console.log(decoded.first_name + ' ' + decoded.last_name);
        storeData('name', decoded.first_name + ' ' + decoded.last_name);
        console.log(token);
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