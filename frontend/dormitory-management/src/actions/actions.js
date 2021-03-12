import * as TypeAction from "../constants/TypeActions";
import { requestLogin } from "../apis/handleAPIs";
import axios from "axios";
import setAuthorizationToken from "../constants/utilitiesFunction";
import jwt from "jsonwebtoken";

export const actFetchTitleNavigation = (title) => {
  return {
    type: TypeAction.FETCH_NAV_TITLE,
    title,
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    console.log(user);
    const res = await requestLogin(user);
    console.log(res.data);
    const token = res.data.access;
    localStorage.setItem("jwtToken", token);
    setAuthorizationToken(token);
    console.log(jwt.decode(token));
    dispatch(setCurrentUser(jwt.decode(token)));
  };
};
export const setCurrentUser = (user) => {
  return {
    type: TypeAction.SET_CURRENT_USER,
    user,
  };
};
