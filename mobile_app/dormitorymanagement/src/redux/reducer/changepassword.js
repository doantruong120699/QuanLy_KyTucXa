import { actionType } from '../actionType';

const { CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } = actionType;
const initialState = {
    msg: '',
}

export const changepassword = (state = initialState, actions) => {
    switch(actions.type) {
        case CHANGE_PASSWORD_SUCCESS: 
            return {...state, msg: actions.msg};
        case CHANGE_PASSWORD_FAIL: 
            return {...state, msg: actions.msg};
        default: 
            return state;
    }
}