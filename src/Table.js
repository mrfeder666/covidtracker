import React from "react";
import "./Table.css";

function Table({ countries }) {
  return (
    <div className="table">{countries.length == 0 ? "NO COUNTRIES FOUND" : null}
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td class='table-row-custom'> //added new class for better look and feel

           <b> {cases}</b>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
