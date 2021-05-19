import * as types from "../constants";
import store from "../store";

export async function GetListRegistrationRoom(resolve = () => {}) {
  store.dispatch({
    type: types.GET_LIST_REGISTRATION_API,
  });
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/list-registrations/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_LIST_REGISTRATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_LIST_REGISTRATION_API_FAIL,
    });
  }
}

export async function GetDetailRegistrationRoom(slug, resolve = () => {}) {
  store.dispatch({
    type: types.GET_LIST_REGISTRATION_API,
  });
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/registrations/${slug}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.GET_LIST_REGISTRATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_LIST_REGISTRATION_API_FAIL,
    });
  }
}

export async function AcceptRegistrationRoom(slug, resolve = () => {}) {
  store.dispatch({
    type: types.ACCEPT_REGISTRATION_API,
  });
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/registrations/${slug}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data_1 = await response.json();
    resolve(data_1);
    store.dispatch({
      payload: data_1,
      type: types.ACCEPT_REGISTRATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.ACCEPT_REGISTRATION_API_FAIL,
    });
  }
}

export async function addDailySchedule(data, resolve = () => {}) {
  store.dispatch({
    type: types.ADD_DAILY_SCHEDULE_API,
  });
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/schedules/`, {
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
      type: types.ADD_DAILY_SCHEDULE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.ADD_DAILY_SCHEDULE_API_FAIL,
    });
  }
}
