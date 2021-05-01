import { actionType } from '../actionType';

const {GET_AREA_FAIL, GET_AREA_SUCCESS } = actionType;
const initialState = {
    msg: [
        {
            "id": 1,
            "name": "khu A",
            "slug": null
        },
        {
            "id": 2,
            "name": "Khu B",
            "slug": null
        },
        {
            "id": 3,
            "name": "Khu C",
            "slug": null
        },
        {
            "id": 4,
            "name": "Khu D",
            "slug": null
        }
    ],
}
export const getarea = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_AREA_SUCCESS:
            return {...state, msg: actions.payload};
        case GET_AREA_FAIL:
            return {...state, ...actions.payload};
        default:
            return state;
    }
};
