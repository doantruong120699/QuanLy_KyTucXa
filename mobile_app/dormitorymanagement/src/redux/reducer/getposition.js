import { actionType } from '../actionType';

const { GET_POSITION_SUCCESS, GET_POSITION_FAIL } = actionType;
const initialState = {
    msg: [
        {
            "id": 1,
            "name": "Vệ sinh"
        },
        {
            "id": 2,
            "name": "Bảo vệ"
        }
    ],
}
export const getposition = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_POSITION_SUCCESS:
            return {...state, msg: actions.payload};
        case GET_POSITION_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
};
