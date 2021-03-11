import axios from "axios";

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.commom["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.commom["Authorization"];
  }
}
