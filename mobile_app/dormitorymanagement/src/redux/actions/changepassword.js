import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
import axios from 'axios';
import {apiUrl} from '../../api/api';
import _ from 'lodash';

const { CHANGE_PASSWORD_URL } = apiUrl;
const {CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL} = actionType;
export const changepassword = (data) => async (dispatch) => {
    let result;
    console.log(data);
    console.log(CHANGE_PASSWORD_URL);
    try{
        let token = await getData('token');
        console.log(token);
        let config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }
        result = await axios.post(CHANGE_PASSWORD_URL, data, config);
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            msg: 'Success',
        })
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(error);
        dispatch({
            type: CHANGE_PASSWORD_FAIL,
            msg: 'Fail',
        })
    }
}