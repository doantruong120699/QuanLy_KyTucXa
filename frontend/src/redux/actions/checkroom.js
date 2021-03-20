import * as types from "../constants";
import store from "../store";
export async function getRoomsList(resolve = () => {}) {
  store.dispatch({
    type: types.LOGIN_API,
  });
}
