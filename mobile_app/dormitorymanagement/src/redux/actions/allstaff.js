import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
import axios from 'axios';
import {apiUrl} from '../../api/api';
import _ from 'lodash';

const { GET_ALL_STAFF_URL } = apiUrl;
const {GET_ALL_STAFF, GET_ALL_STAFF_SUCCESS, GET_ALL_STAFF_FAIL} = actionType;
export const allstaff = () => async (dispatch) => {
    let result;
    try {
        let token = await getData('token');
        let config = {
            headers: { 'Authorization': 'Bearer ' + token }
        }
        result = await axios.get(GET_ALL_STAFF_URL, config);
        dispatch({
            type: GET_ALL_STAFF_SUCCESS, 
            payload: result.data,
        });
    }
    catch(error) {
        const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
        console.log(error);
        dispatch({
            type: GET_ALL_STAFF_FAIL, 
            payload: {msg}
        });
    }
};