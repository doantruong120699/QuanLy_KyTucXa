import { actionType } from '../actionType';

const { GET_CLASS_SUCCESS, GET_CLASS_FAIL } = actionType;
const initialState = {
    msg: [
        {
            "id": 1,
            "name": "17T1"
        },
        {
            "id": 2,
            "name": "17T2"
        },
        {
            "id": 3,
            "name": "17T3"
        }
    ],
}
export const getclass = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_CLASS_SUCCESS:
            return {...state, msg: actions.payload};
        case GET_CLASS_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
};
