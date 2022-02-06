import React from "react";
import { useTable } from "react-table";

import "./FuelQuoteHistoryTable.css";

const FuelQuoteHistory = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Gallons Requested",
        accessor: "gallons",
      },
      {
        Header: "Delivery Address",
        accessor: "address",
      },
      {
        Header: "Delivery Date",
        accessor: "date",
      },
      {
        Header: "Price Per Gallon",
        accessor: "ppg",
      },
      {
        Header: "Total Amount Due",
        accessor: "total",
      },
    ],
    []
  );

  const data = React.useMemo(() => props.quotes, [props.quotes]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  if (props.quotes.length === 0) {
    return (
      <div className="center">
        <h2>No Quotes Found.</h2>
      </div>
    );
  }

  return (
    <table {...getTableProps()} >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default FuelQuoteHistory;
