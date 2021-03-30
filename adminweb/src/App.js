import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory as history } from "history";
function App() {
  return (
    <Router history={history()}>
      <Switch>
        <div>Hello world!</div>
      </Switch>
    </Router>
  );
}

export default App;
