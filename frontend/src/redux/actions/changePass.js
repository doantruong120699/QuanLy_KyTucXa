import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function changePass(data, resolve = () => {}) {
  store.dispatch({
    type: types.CHANGE_PASS_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}account/change-password/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const data_1 = await response.json();
    const status = response.status;
    resolve(response, status);
    store.dispatch({
      payload: data_1,
      type: types.CHANGE_PASS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.CHANGE_PASS_API_FAIL,
    });
  }
}
