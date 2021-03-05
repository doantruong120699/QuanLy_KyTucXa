import { actionType } from '../actionType';

const {GET_ALL_ROOM, GET_ALL_ROOM_SUCCESS, GET_ALL_ROOM_FAIL} = actionType;
const initialState = {
    msg: '',
    data: [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Item",
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Second Item",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
          title: "Third Item",
        },
    ],
    filter_status: 'SHOW_ALL',
};
export const getallroom = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ALL_ROOM_SUCCESS:
            return state;
        case GET_ALL_ROOM_FAIL:
            return {...state};
        default:
            return state;
    }
};
