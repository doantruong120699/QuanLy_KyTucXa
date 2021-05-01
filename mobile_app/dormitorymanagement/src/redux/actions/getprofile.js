import { actionType } from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
import axios from 'axios';
import {apiUrl} from '../../api/api';
import _ from 'lodash';

const { PROFILE_URL } = apiUrl;
const {GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL} = actionType;
export const getprofile = () => async (dispatch) => {
    let result;
    try {
        let token = await getData('token');
        let config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }
        result = await axios.get(PROFILE_URL, config);
        // storeData('profile', result.data);
        dispatch({
            type: GET_PROFILE_SUCCESS, 
            payload: result.data,
            msg: 'Success',
        });
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(error);
        dispatch({
            type: GET_PROFILE_FAIL, 
            payload: {msg},
            msg: 'Fail',
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