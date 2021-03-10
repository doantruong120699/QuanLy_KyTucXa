import {actionType} from '../actionType';
import {storeData, getData} from '../../utils/asyncStorage';

const {STATUS_MAIN_MENU} = actionType;
export const mainmenu = (data) => (dispatch) => {
    dispatch({
        type: STATUS_MAIN_MENU,
        status: data,
    });
};