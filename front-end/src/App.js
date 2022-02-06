import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Login from "./pages/Login";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";

const App = () => {
  return (
    <Router>
      <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/fuelquote/history">
        <FuelQuoteHistory />
      </Route>
      <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
