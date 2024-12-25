import React from "react";
import TableRow from "../TableRow/TableRow";
import './Table.style.css'

/**
 * Table component for displaying data.
 * @param {Array} columns - Headers of table
 * @param {Array} data - data to display.
 */
const Table = ({ columns ,data }) => {
  return (
    <div className="tableContainer">
    <table className={"table"}>
      <thead>
        <tr>
            {columns.map((column) => (
              <th key={column.toString()}>{column}</th>
            ))}
          </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => <TableRow key={item.toString()} item={item} columns={columns} />)
        ) : (
          <tr>
            <td colSpan="4">No Data Available</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default React.memo(Table);
