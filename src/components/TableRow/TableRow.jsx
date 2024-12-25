import React from "react";
import formatColumnName from "../../utils/index"

/**
 * A TableRow component that dynamically renders each row's data based on columns.
 * 
 * @param {Object} item - The data for the current row.
 * @param {Array} columns - The column names to display.
 */
const TableRow = ({ item, columns }) => {
  return (
    <tr>
      {columns.map((column) => {
        // Access data dynamically using column name
        const colName = formatColumnName(column);
        const cellData = item[colName];
        return <td key={column.toString()}>{cellData}</td>;
      })}
    </tr>
  );
};

export default TableRow;