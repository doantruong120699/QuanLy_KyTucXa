import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function getNotifications(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_NOTIFICATIONS_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}notifications/?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
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

export async function createNotification(newPost, resolve = () => {}) {
  store.dispatch({
    type: types.POST_NOTIFICATION,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}notifications/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    const isOk = response.ok;
    resolve(data, isOk);
    store.dispatch({
      payload: data,
      type: types.POST_NOTIFICATION_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.POST_NOTIFICATION_FAIL,
    });
  }
}

export async function getDashboard(resolve = () => {}) {
  store.dispatch({
    type: types.GET_DASHBOARD_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}dashboard/`, {
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
      type: types.GET_DASHBOARD_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DASHBOARD_API_FAIL,
    });
  }
}

export const actFetchTitleNavigation = (title) => {
  return {
    type: types.FETCH_NAV_TITLE,
    title,
  };
};
