import { actionType } from '../actionType';

const { GET_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAIL } = actionType;
const initialState = {
    data: {
        "totals": 2,
        "page_size": 10,
        "current_page": 1,
        "next_page": null,
        "previous_page": null,
        "results": [
            {
                "public_id": "jxPoUQ",
                "created_by": {
                    "id": 8,
                    "first_name": "a",
                    "last_name": "b",
                    "email": "a@gmail.com"
                },
                "title": "A",
                "content": "ab",
                "create_at": "2021-05-01T08:59:39.483428Z",
                "last_update":"2021-05-01T08:59:39.483428Z",
                "updated_by": null
            },
            {
                "public_id": "jxPoUQ",
                "created_by": {
                    "id": 8,
                    "first_name": "a",
                    "last_name": "b",
                    "email": "a@gmail.com"
                },
                "title": "A",
                "content": "asbabasvas",
                "create_at": "2021-05-01T08:59:39.483428Z",
                "last_update":"2021-05-01T08:59:39.483428Z",
                "updated_by": null
            }
        ]
    },
    msg: '',
    payload: '',
}
export const getnotification = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_NOTIFICATION_SUCCESS:
            return {...state, payload: actions.payload};
        case GET_NOTIFICATION_FAIL:
            return {...state, msg: actions.msg};
        default:
            return state;
    }
};
