import { actionType } from '../actionType';

const {GET_ALL_ROOM, GET_ALL_ROOM_SUCCESS, GET_ALL_ROOM_FAIL} = actionType;
const initialState = {
    msg: '',
    data: [
      {
        title: "Khu A",
        data: [
          {
            room: "A101",
            status: true,
            numbers: 5,
          },
          {
            room: "A102",
            status: false,
            numbers: 2,
          },
          {
            room: "A103",
            status: true,
            numbers: 3,
          },
        ],
      },
      {
        title: "Khu B",
        data: [
          {
            room: "B202",
            status: true,
            numbers: 8,
          },
          {
            room: "B203",
            status: false,
            numbers: 0,
          },
          {
            room: "B204",
            status: false,
            numbers: 7,
          },
        ],
      },
      {
        title: "Khu C",
        data: [
          {
            room: "C101",
            status: true,
            numbers: 1,
          },
          {
            room: "C102",
            status: true,
            numbers: 2,
          },
          {
            room: "C103",
            status: true,
            numbers: 3,
          },
        ],
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
