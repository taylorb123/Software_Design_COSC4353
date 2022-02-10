import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import FuelQuotesHome from "./pages/FuelQuotesHome";
import NavBar from "./components/Navigation/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <main>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/home">
            <FuelQuotesHome />
          </Route>
          <Route path="/fuelquote/history">
            <FuelQuoteHistory />
          </Route>
          <Route path="/Register" exact>
            <Register />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
