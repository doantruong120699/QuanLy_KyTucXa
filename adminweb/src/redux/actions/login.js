import * as types from "../constants";
import store from "../store";
export async function login(data, resolve = () => {}) {
  store.dispatch({
    type: types.LOGIN_API,
  });
  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.LOGIN_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.LOGIN_API_FAIL,
    });
  }
}

