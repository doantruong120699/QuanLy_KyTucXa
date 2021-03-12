import React from "react";
import "./global/css/all.css";
import "./App.css";
import routers from "./routers/routers";
import theme from "./constants/themes";
import { ThemeProvider } from "@material-ui/core/styles";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory as history } from "history";

function App() {
  const showContents = (routers) => {
    var result = null;
    if (routers.length > 0) {
      result = routers.map((router, index) => {
        return (
          <Route
            key={index}
            path={router.path}
            exact={router.exact}
            component={router.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  return (
    <Router history={history()}>
      <ThemeProvider theme={theme}>{showContents(routers)}</ThemeProvider>
    </Router>
  );
}

export default App;
