import React, { useContext } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import { AuthContext } from "../../utility/auth-context";
import "./NavBar.css";

const NavBar = (props) => {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
  };

  return (
    <MainHeader className="nav-button">
      <h1 className="nav-title">
        <Link to="/home">FuelQuotes</Link>
      </h1>
      <div>
        <button className="logout-button" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </MainHeader>
  );
};

export default NavBar;
