import { actionType } from '../actionType';

const {CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL} = actionType;
const initialState = {
    msg: '',

};
export const changePassword = (state = initialState, actions) => {
    switch(actions.type) {
        case CHANGE_PASSWORD_SUCCESS:
            return {...state, ...actions.payload};
        case CHANGE_PASSWORD_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
}