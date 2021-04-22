import * as types from "../constants";
import store from "../store";
export async function getRooms(resolve = () => {}) {
  store.dispatch({
    type: types.GET_ROOMS_API,
  });
  try {
    const response = await fetch("http://127.0.0.1:8000/api/rooms/get-all/", {
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
    const response = await fetch(`http://127.0.0.1:8000/api/rooms/${slug}/`, {
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
    const response = await fetch("http://127.0.0.1:8000/api/payment-method/", {
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
    const response = await fetch("http://127.0.0.1:8000/api/contracts/", {
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
