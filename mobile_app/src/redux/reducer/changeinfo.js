import { actionType } from '../actionType';

const {CHANGE_INFO, CHANGE_INFO_SUCCESSL, CHANGE_INFO_FAIL} = actionType;
const initialState = {
    isChangeInfo: false,
    msg: '',
};
export const changeinfo = (state = initialState, actions) => {
    switch (actions.type) {
        case CHANGE_INFO_SUCCESSL:
            return {...state, ...actions.payload, isLoggedIn: true};
        case CHANGE_INFO_FAIL:
            return {...state, ...actions.payload, isLoggedIn: false};
        default:
            return state;
    }
};
