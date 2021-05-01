import * as types from "../constants";
import store from "../store";
export async function profile(resolve = () => {}) {
  store.dispatch({
    type: types.GET_PROFILE_API,
  });
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/account/get-user-profile/",
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
      type: types.GET_PROFILE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_PROFILE_API_FAIL,
    });
  }
}
export async function faculty(resolve = () => {}) {
  store.dispatch({
    type: types.GET_FACULTIES_API,
  });
  try {
    const response = await fetch("http://127.0.0.1:8000/api/faculty/", {
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
      type: types.GET_FACULATIES_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_FACULATIE_API_FAIL,
    });
  }
}
export async function grade(resolve = () => {}) {
  store.dispatch({
    type: types.GET_GRADE_API,
  });
  try {
    const response = await fetch("http://127.0.0.1:8000/api/class/", {
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
      type: types.GET_GRADE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_GRADE_API_FAIL,
    });
  }
}
export async function getSchedule(week, resolve = () => {}) {
  store.dispatch({
    type: types.GET_MY_SCHEDULE_API,
  });
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/daily-schedules/${week}/`,
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
      type: types.GET_MY_SCHEDULE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_MY_SCHEDULE_API_FAIL,
    });
  }
}
