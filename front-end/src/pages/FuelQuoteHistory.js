import React from "react";

import FuelQuoteHistoryTable from "../components/FuelQuoteHistoryTable";

const FuelQuoteHistory = () => {
  const QUOTES = [
    {
      id: "user1",
      gallons: 2,
      address: "123 Fake St.",
      address2: "apt 1",
      date: "02/05/2022",
      ppg: 2.5,
      total: 5,
    },
    {
      id: "user2",
      gallons: 100,
      address: "456 This is an address",
      address2: "N/A",
      date: "Today",
      ppg: 5,
      total: 500,
    },
    {
      id: "user3",
      gallons: 2,
      address: "123 Fake St.",
      address2: "apt 1",
      date: "02/05/2022",
      ppg: 2.5,
      total: 5,
    },
    {
      id: "user4",
      gallons: 100,
      address: "456 This is an address",
      address2: "N/A",
      date: "Today",
      ppg: 5,
      total: 500,
    },
    {
      id: "user5",
      gallons: 2,
      address: "123 Fake St.",
      address2: "apt 1",
      date: "02/05/2022",
      ppg: 2.5,
      total: 5,
    },
    {
      id: "user6",
      gallons: 100,
      address: "456 This is an address",
      address2: "N/A",
      date: "Today",
      ppg: 5,
      total: 500,
    },
  ];

  return <FuelQuoteHistoryTable quotes={QUOTES} />;
};

export default FuelQuoteHistory;
