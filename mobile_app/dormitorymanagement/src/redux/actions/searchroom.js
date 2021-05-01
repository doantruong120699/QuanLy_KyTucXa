import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';
// import axios from 'axios';
import {apiUrl} from '../../api/api';

const {SEARCH_ROOM, SEARCH_ROOM_SUCCESS, SEARCH_ROOM_FAIL} = actionType;
export const searchroom = (data) => async (dispatch) => {
    let result;
    dispatch({
        type: SEARCH_ROOM_SUCCESS,
        payload: data,
    })
};