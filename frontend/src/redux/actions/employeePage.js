import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function getEmployees(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_EMPLOYEES_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}staffs/get-all-staff/?${params}`,
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
      type: types.GET_EMPLOYEES_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_EMPLOYEES_API_FAIL,
    });
  }
}

export async function getDetailedEmployee(slug, resolve = () => {}) {
  store.dispatch({
    type: types.GET_DETAILED_EMPLOYEE_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}staffs/${slug}/`, {
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
      type: types.GET_DETAILED_EMPLOYEE_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_EMPLOYEE_API_FAIL,
    });
  }
}
