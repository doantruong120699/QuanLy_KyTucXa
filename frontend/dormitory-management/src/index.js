import React from "react";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import setAuthorizationToken from "./constants/utilitiesFunction";
import config from "./config/config";

config();

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
}

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", renderApp);
}

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
