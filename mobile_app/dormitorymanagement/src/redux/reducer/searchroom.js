import { actionType } from '../actionType';

const {SEARCH_ROOM, SEARCH_ROOM_SUCCESS, SEARCH_ROOM_FAIL} = actionType;
const initialState = {
    textSearch: '',
    msg: ''
};
export const searchroom = (state = initialState, actions) => {
    switch (actions.type) {
        case SEARCH_ROOM_SUCCESS:
            return {...state, textSearch: actions.payload};
        case SEARCH_ROOM_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
};
