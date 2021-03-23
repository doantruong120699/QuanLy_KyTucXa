import * as types from "../constants";
import store from "../store";
export async function profile(token, resolve = () => {}) {
  store.dispatch({
    type: types.GET_PROFILE_API,
  });
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/account/get-user-profile/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    resolve(data);
    store.dispatch({
      payload: data,
      type: types.GET_PROFILE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_PROFILE_API_FAIL,
    });
  }
}
