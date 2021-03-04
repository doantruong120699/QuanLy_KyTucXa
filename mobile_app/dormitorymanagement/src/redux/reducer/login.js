import { actionType } from '../actionType';

const {LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} = actionType;
const initialState = {
    isLoggedIn: false,
    msg: ''
};
export const login = (state = initialState, actions) => {
    switch (actions.type) {
        case LOGIN_SUCCESS:
            return {...state, ...actions.payload, isLoggedIn: true};
        case LOGIN_FAIL:
            return {...state, ...actions.payload, isLoggedIn: false};
        default:
            return state;
    }
};
