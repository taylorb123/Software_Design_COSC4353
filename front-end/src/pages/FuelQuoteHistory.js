import React, { useEffect, useState } from "react";

import FuelQuoteHistoryTable from "../components/FuelQuoteHistoryTable";

const FuelQuoteHistory = () => {
  const [loadedQuotes, setLoadedQuotes] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/fuelquote/taylor');

        const responseData = await response.json();
        
        setLoadedQuotes(responseData.quotes);
      } catch (err) {
        console.log(err)
      }
    };
    sendRequest();
  }, []);

  return <FuelQuoteHistoryTable quotes={loadedQuotes} />;
};

export default FuelQuoteHistory;
