import * as types from "../constants";
import store from "../store";

export async function getNotifications(resolve = () => {}) {
  store.dispatch({
    type: types.GET_NOTIFICATIONS_API,
  });
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/notifications/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_NOTIFICATIONS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_NOTIFICATIONS_API_FAIL,
    });
  }
}

export async function createNotification(data, resolve = () => {}) {
  store.dispatch({
    type: types.CREATE_NOTIFICATION_API,
  });
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/notifications/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.CREATE_NOTIFICATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.CREATE_NOTIFICATION_API_FAIL,
    });
  }
}

export async function updateNotification(data, slug, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_NOTIFICATION_API,
  });
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/notifications/${slug}/`,
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
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.UPDATE_NOTIFICATION_API_FAIL,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.CREATE_NOTIFICATION_API_FAIL,
    });
  }
}

export async function deleteNotification(slug, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_NOTIFICATION_API,
  });
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/notifications/${slug}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.DELETE_NOTIFICATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.DELETE_NOTIFICATION_API_FAIL,
    });
  }
}

export async function getDetailedNotification(slug, resolve = () => {}) {
  store.dispatch({
    type: types.GET_DETAILED_NOTIFICATION_API,
  });
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/notifications/${slug}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_DETAILED_NOTIFICATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_NOTIFICATION_API_FAIL,
    });
  }
}
