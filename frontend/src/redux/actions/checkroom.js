import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function getImgUrl(slug, resolve = () => {}) {
  store.dispatch({
    type: types.GET_AREA_IMAGE_URL,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}area/${slug}/`, {
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
      type: types.GET_AREA_IMAGE_URL_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_AREA_IMAGE_URL_FAIL,
    });
  }
}

export async function getSchoolYear(resolve = () => {}) {
  store.dispatch({
    type: types.GET_SCHOOL_YEAR,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}school-year/`, {
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
      type: types.GET_SCHOOL_YEAR_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_SCHOOL_YEAR_FAIL,
    });
  }
}

export async function getRooms(area, params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_ROOMS_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}rooms/get-all/${area}/?${params}`,
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
export async function getPaymentMethods(resolve = () => {}) {
  store.dispatch({
    type: types.GET_PAYMENT_METHODS_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}payment-method/`, {
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
      type: types.GET_PAYMENT_METHODS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_PAYMENT_METHODS_API_FAIL,
    });
  }
}
export async function registerRoom(registrationData, resolve = () => {}) {
  store.dispatch({
    type: types.POST_REGISTRATION_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}contracts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(registrationData),
    });
    const data = await response.json();
    resolve(data);
    store.dispatch({
      payload: data,
      type: types.POST_REGISTRATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.POST_REGISTRATION_API_FAIL,
    });
  }
}
export async function payAllRoom(registrationData, resolve = () => {}) {
  store.dispatch({
    type: types.POST_REGISTRATION_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}all-in-contracts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(registrationData),
    });
    const data = await response.json();
    resolve(data);
    store.dispatch({
      payload: data,
      type: types.POST_REGISTRATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.POST_REGISTRATION_API_FAIL,
    });
  }
}
