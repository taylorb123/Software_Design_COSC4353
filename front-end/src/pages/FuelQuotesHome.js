import React from "react";
import { Link } from "react-router-dom";

import "./FuelQuotesHome.css";

const FuelQuotesHome = (props) => {
  return (
    <div className="center">
      <div className="flex">
        <Link to="fuelquote/new">
          <button className="quote-button">New Fuel Quote</button>
        </Link>
      </div>
      <div className="flex">
        <Link to="fuelquote/history">
          <button className="quote-button">Fuel Quote History </button>
        </Link>
      </div>
      <div className="flex">
        <Link to="/account">
          <button className="quote-button">Account Management </button>
        </Link>
      </div>
    </div>
  );
};

export default FuelQuotesHome;
