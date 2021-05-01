import { actionType } from '../actionType';

const {GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL} = actionType;
const initialState = {
    msg: ''
};
export const getprofile = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_PROFILE_SUCCESS:
            return {...state, msg: actions.payload};
        case GET_PROFILE_FAIL:
            return {...state, ...actions.payload, msg: actions.msg};
        default:
            return state;
    }
};
