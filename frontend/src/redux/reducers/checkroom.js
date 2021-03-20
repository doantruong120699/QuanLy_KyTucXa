import * as TypeActions from "../constants";

const initialState = {
  roomsList: [],
};

function checkroom(state = initialState, action) {
  switch (action.type) {
    case TypeActions.GET_ROOMS_LIST: {
      return { ...state, roomsList: action.roomsList };
    }
    default: {
      return state;
    }
  }
}
export default checkroom;
