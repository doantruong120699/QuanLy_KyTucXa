import { actionType } from '../actionType';

const { CHANGE_PROFILE, CHANGE_PROFILE_SUCCESS, CHANGE_PROFILE_FAIL } = actionType;
const initialState = {
    msg: '',
}

export const changeprofile = (state = initialState, actions) => {
    switch(actions.type) {
        case CHANGE_PROFILE_SUCCESS: 
            return {...state, msg: actions.payload};
        case CHANGE_PROFILE_FAIL: 
            return {...state, msg: actions.payload};
        default: 
            return state;
    }
}