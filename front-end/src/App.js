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
import NewFuelQuote from "./components/Form/NewFuelQuote";
import AccountDetails from "./pages/AccountDetails";

const App = () => {
  return (
    <Router>
      <NavBar />
      <main>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/home" exact>
            <FuelQuotesHome />
          </Route>
          <Route path="/fuelquote/new" exact>
            <NewFuelQuote />
          </Route>
          <Route path="/fuelquote/history" exact>
            <FuelQuoteHistory />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/account" exact>
            <AccountDetails />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
