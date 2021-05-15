import { actionType } from '../actionType';

const { GET_FACULTI_SUCCESS, GET_FACULTI_FAIL } = actionType;
const initialState = {
    msg: [
        {
            "id": 1,
            "name": "CNTT"
        },
        {
            "id": 2,
            "name": "Điện"
        }
    ],
}
export const getfaculty = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_FACULTI_SUCCESS:
            return {...state, msg: actions.payload};
        case GET_FACULTI_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
};
