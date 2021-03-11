import axios from "axios";
import { config as configConstants } from "../constants/APIpath";

export default function config() {
  axios.defaults.baseURL = configConstants.API_URL;

  const user = JSON.parse(localStorage.getItem("username"));
  if (user && user.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
}
