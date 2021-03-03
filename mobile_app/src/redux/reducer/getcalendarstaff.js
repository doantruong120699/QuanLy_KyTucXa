import { actionType } from '../actionType';

const { GET_CALENDAR_STAFF, GET_CALENDAR_STAFF_SUCCESS, GET_CALENDAR_STAFF_FAIL } = actionType;
const initialState = {
    msg: '',
};

export const getcalendar = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_CALENDAR_STAFF_SUCCESS:
            return {...state, ...actions.payload};
        case GET_CALENDAR_STAFF_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
};