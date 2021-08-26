import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function getListBill(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_LIST_BILL,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}students/water-electrical/?${params}`,
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
      type: types.GET_LIST_BILL_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_LIST_BILL_FAIL,
    });
  }
}

export async function getDetailedBill(publicId, resolve = () => {}) {
  store.dispatch({
    type: types.GET_DETAILED_BILL,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}students/water-electrical/${publicId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    resolve(data);
    store.dispatch({
      payload: data,
      type: types.GET_DETAILED_BILL_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_BILL_FAIL,
    });
  }
}
