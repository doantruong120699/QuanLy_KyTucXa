import * as types from "../constants";
import store from "../store";

const REACT_APP_BASE_API = process.env.REACT_APP_BASE_URL;

export async function getFinancial(params, resolve = () => {}) {
  store.dispatch({
    type: types.GET_FINANCIAL_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}financal-room-area/?${params}`,
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
      type: types.GET_FINANCIAL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_FINANCIAL_API_FAIL,
    });
  }
}

export async function getUnitPrice(slug, resolve = () => {}) {
  store.dispatch({
    type: types.GET_WATER_ELECTRICAL_UNIT_PRICE_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electrical-unit-price/${slug}/`,
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
      type: types.UPDATE_NOTIFICATION_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.UPDATE_NOTIFICATION_API_FAIL,
    });
  }
}

export async function getListWaterElectricalIndexes(
  area,
  time,
  resolve = () => {}
) {
  store.dispatch({
    type: types.GET_LIST_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electricals/${area}/${time}/`,
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
      type: types.GET_LIST_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_LIST_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function getDetailedWaterElectricalIndex(
  slug,
  resolve = () => {}
) {
  store.dispatch({
    type: types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electricals/${slug}/`,
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
      type: types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function createWaterElectricalIndex(data, resolve = () => {}) {
  store.dispatch({
    type: types.CREATE_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}water-electricals/`, {
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
      type: types.CREATE_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.CREATE_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function updateWaterElectricalIndex(
  slug,
  data,
  resolve = () => {}
) {
  store.dispatch({
    type: types.UPDATE_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electricals/${slug}/`,
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
      type: types.UPDATE_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.UPDATE_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function deleteWaterElectricalIndex(slug, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_WATER_ELECTRICAL_INDEX_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}water-electricals/${slug}/`,
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
      type: types.DELETE_WATER_ELECTRICAL_INDEX_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.DELETE_WATER_ELECTRICAL_INDEX_API_FAIL,
    });
  }
}

export async function getListWaterElectricalBills(
  area,
  time,
  resolve = () => {}
) {
  store.dispatch({
    type: types.GET_LIST_WATER_ELECTRICAL_BILL_API,
  });
  try {
    const response = await fetch(
      area
        ? `${REACT_APP_BASE_API}bills/?${area}&${time}/`
        : `${REACT_APP_BASE_API}bills/?${time}/`,
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
      type: types.GET_LIST_WATER_ELECTRICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_LIST_WATER_ELECTRICAL_BILL_API_FAIL,
    });
  }
}

export async function getDetailedWaterElectricalBill(slug, resolve = () => {}) {
  store.dispatch({
    type: types.GET_DETAILED_WATER_ELECTRICAL_BILL_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}bills/${slug}/`, {
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
      type: types.GET_DETAILED_WATER_ELECTRICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_WATER_ELECTRICAL_BILL_API_FAIL,
    });
  }
}

export async function updateWaterElectricalBill(
  slug,
  data,
  resolve = () => {}
) {
  store.dispatch({
    type: types.UPDATE_WATER_ELECTRICAL_BILL_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}bills/${slug}/`, {
      method: "PUT",
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
      type: types.UPDATE_WATER_ELECTRICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.UPDATE_WATER_ELECTRICAL_BILL_API_FAIL,
    });
  }
}

export async function deleteWaterElectricalBill(slug, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_WATER_ELECTRICAL_BILL_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}bills/${slug}/`, {
      method: "DELETE",
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
      type: types.DELETE_WATER_ELECTRICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.DELETE_WATER_ELECTRICAL_BILL_API_FAIL,
    });
  }
}
export async function getStatistical(param, resolve = () => {}) {
  store.dispatch({
    type: types.GET_STATISTICAL_BILL_API,
  });
  try {
    const response = await fetch(
      `${REACT_APP_BASE_API}paid-bill-area/?${param}/`,
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
      type: types.GET_STATISTICAL_BILL_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_STATISTICAL_BILL_API_FAIL,
    });
  }
}

export async function getExpenses(resolve = () => {}) {
  store.dispatch({
    type: types.GET_EXPENSES_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}expense/`, {
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
      type: types.GET_EXPENSES_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_EXPENSES_API_FAIL,
    });
  }
}

export async function getRevenue(resolve = () => {}) {
  store.dispatch({
    type: types.GET_REVENUES_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}revenue/`, {
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
      type: types.GET_REVENUES_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_REVENUES_API_FAIL,
    });
  }
}

export async function getContracts(resolve = () => {}) {
  store.dispatch({
    type: types.GET_CONTRACTS_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}list-contract/`, {
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
      type: types.GET_CONTRACTS_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_CONTRACTS_API_FAIL,
    });
  }
}

export async function getDetailedContract(id, resolve = () => {}) {
  store.dispatch({
    type: types.GET_DETAILED_CONTRACT_API,
  });
  try {
    const response = await fetch(`${REACT_APP_BASE_API}registrations/${id}/`, {
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
      type: types.GET_DETAILED_CONTRACT_API_SUCCEED,
    });
  } catch (error) {
    store.dispatch({
      payload: error,
      type: types.GET_DETAILED_CONTRACT_API_FAIL,
    });
  }
}
