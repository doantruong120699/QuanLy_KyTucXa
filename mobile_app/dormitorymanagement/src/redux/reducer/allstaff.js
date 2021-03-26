import { actionType } from '../actionType';

const {GET_ALL_STAFF, GET_ALL_STAFF_SUCCESS, GET_ALL_STAFF_FAIL} = actionType;
const initialState = {
    msg: '',
}
export const allstaff = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ALL_STAFF_SUCCESS:
            return {...state, msg: actions.payload};
        case GET_ALL_STAFF_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
};
