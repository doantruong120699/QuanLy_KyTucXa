import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function getNotifications(resolve = () => {}) {
  store.dispatch({
    type: types.GET_NOTIFICATIONS_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}notifications/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    resolve(data);
    store.dispatch({
      payload: data,
      type: types.GET_NOTIFICATIONS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_NOTIFICATIONS_API_FAIL,
    });
  }
}

export const actFetchTitleNavigation = (title) => {
  return {
    type: types.FETCH_NAV_TITLE,
    title,
  };
};
