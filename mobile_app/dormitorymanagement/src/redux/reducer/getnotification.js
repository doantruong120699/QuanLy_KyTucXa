import { actionType } from '../actionType';

const { GET_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAIL } = actionType;
const initialState = {
    msg: '',
}
export const getposition = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_NOTIFICATION_SUCCESS:
            return {...state, msg: actions.payload};
        case GET_NOTIFICATION_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
};
