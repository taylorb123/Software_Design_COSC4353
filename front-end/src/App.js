import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { useCallback, useState } from "react";
import Login from "./pages/Login";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import FuelQuotesHome from "./pages/FuelQuotesHome";
import NavBar from "./components/Navigation/NavBar";
import NewFuelQuote from "./components/Form/NewFuelQuote";
import AccountDetails from "./pages/AccountDetails";
import { AuthContext } from "./utility/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const login = useCallback((username) => {
    setUserName(username)
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/home" exact>
          <FuelQuotesHome />
        </Route>
        <Route path="/fuelquote/new" exact>
          <NewFuelQuote />
        </Route>
        <Route path="/fuelquote/history" exact>
          <FuelQuoteHistory />
        </Route>
        <Route path="/account" exact>
          <AccountDetails />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ userName: userName, isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <NavBar />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
