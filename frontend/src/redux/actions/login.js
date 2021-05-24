import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function login(data, resolve = () => {}) {
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
export async function sendEmail(data, resolve = () => {}) {
  store.dispatch({
    type: types.SEND_EMAIL_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}auth/send-email/`, {
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
      type: types.SEND_EMAIL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.SEND_EMAIL_API_FAIL,
    });
  }
}
