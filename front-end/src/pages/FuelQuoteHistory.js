import React, { useContext, useEffect, useState } from "react";

import FuelQuoteHistoryTable from "../components/FuelQuoteHistoryTable";
import { AuthContext } from "../utility/auth-context";

const FuelQuoteHistory = () => {
  const auth = useContext(AuthContext)
  const [loadedQuotes, setLoadedQuotes] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const fetchURL = `http://localhost:5000/api/fuelquote/${auth.userName}`
        const response = await fetch(fetchURL);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedQuotes(responseData.quotes);
      } catch (err) {
        alert(err)
      }
    };
    sendRequest();
  }, [auth.userName]);

  return <FuelQuoteHistoryTable quotes={loadedQuotes} />;
};

export default FuelQuoteHistory;
