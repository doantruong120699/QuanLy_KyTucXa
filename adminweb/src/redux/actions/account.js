import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function getAccounts(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_ACCOUNTS_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}admin/account/?${params}`,
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
      type: types.GET_ACCOUNTS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_ACCOUNTS_API_FAIL,
    });
  }
}

export async function getGroupAndPermission(resolve = () => {}) {
  store.dispatch({
    type: types.GET_GROUP_AND_PERMISSION_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}permission/`, {
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
      type: types.GET_GROUP_AND_PERMISSION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_GROUP_AND_PERMISSION_API_FAIL,
    });
  }
}

export async function getDetailedAccount(publicId, resolve = () => {}) {
  store.dispatch({
    type: types.GET_DETAILED_ACCOUNT_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}admin/account/${publicId}/`,
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
      type: types.GET_DETAILED_ACCOUNT_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_ACCOUNT_API_FAIL,
    });
  }
}
