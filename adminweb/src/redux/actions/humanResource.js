import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function GetListRegistrationRoom(resolve = () => {}) {
  store.dispatch({
    type: types.GET_LIST_REGISTRATION_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}list-registrations/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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
      `${REACT_APP_BASE_API}registrations/${slug}/`,
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
      `${REACT_APP_BASE_API}registrations/${slug}/`,
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
    const response = await fetch(`${REACT_APP_BASE_API}schedules/`, {
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

export async function getRooms(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_ROOMS_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}rooms/get-all/?${params}`,
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
      type: types.GET_ROOMS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_ROOMS_API_FAIL,
    });
  }
}

export async function getRoomDetails(slug, resolve = () => {}) {
  store.dispatch({
    type: types.GET_ROOM_DETAILS_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}rooms/${slug}/`, {
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
      type: types.GET_ROOM_DETAILS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_ROOM_DETAILS_API_FAIL,
    });
  }
}
export async function getSchedule(week, resolve = () => {}) {
  store.dispatch({
    type: types.GET_SCHEDULE_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}daily-schedules/${week}/`,
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
      type: types.GET_SCHEDULE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_SCHEDULE_API_FAIL,
    });
  }
}

export async function getEmployee(resolve = () => {}) {
  store.dispatch({
    type: types.GET_LIST_EMPLOYEE_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}staffs/get-all-staff/`, {
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
      type: types.GET_LIST_EMPLOYEE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_LIST_EMPLOYEE_API_FAIL,
    });
  }
}
