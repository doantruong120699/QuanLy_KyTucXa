import { actionType } from '../actionType';

const { GET_AREA_FAIL, GET_AREA_SUCCESS } = actionType;
const initialState = {
  msg: '',
  payload: [
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
      return { ...state, payload: actions.payload, msg: actions.msg };
    case GET_AREA_FAIL:
      return { ...state, msg: actions.msg };
    default:
      return state;
  }
};
