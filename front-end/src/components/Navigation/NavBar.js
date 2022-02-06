import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import "./NavBar.css";

const NavBar = props => {
  return (
    <MainHeader className="nav-button">
      <h1 className="nav-title">
          <Link to="/home">FuelQuotes</Link>
      </h1>
    </MainHeader>
  );
};

export default NavBar;
