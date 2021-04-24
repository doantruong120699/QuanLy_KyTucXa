import { actionType } from '../actionType';

const { COLOR } = actionType;
const initialState = {
    color: 'white',
};
export const setbackgroundcolor = (state = initialState, actions) => {
    switch (actions.type) {
        case COLOR:
            return {...state, color: actions.color};
        default:
            return state;
    }
};
