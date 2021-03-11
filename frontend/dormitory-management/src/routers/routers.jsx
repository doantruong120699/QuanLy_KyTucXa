import React from "react";
import Login from "../components/Login/Login";
import ForgotPassword from "../components/Login/ForgotPassword";
import ResetPassword from "../components/Login/ResetPassword";
import HomePage from "../pages/Home/HomePage";
const routers = [
  { path: "/room", exact: false, main: () => <HomePage /> },
  { path: "/login", exact: false, main: () => <Login /> },
  { path: "/forgot-password", exact: false, main: () => <ForgotPassword /> },
  { path: "/reset-password", exact: false, main: () => <ResetPassword /> },
];
export default routers;
