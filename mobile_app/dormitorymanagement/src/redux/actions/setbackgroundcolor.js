import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';

const { COLOR } = actionType;
export const setbackgroundcolor = (data) => async (dispatch) => {
    dispatch({
        type: COLOR,
        color: data,
    })
};