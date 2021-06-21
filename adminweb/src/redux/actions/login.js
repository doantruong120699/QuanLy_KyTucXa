import * as types from "../constants";
import store from "../store";
export async function login(data, resolve = () => {}) {
  const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

  store.dispatch({
    type: types.LOGIN_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}auth/login/`, {
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
