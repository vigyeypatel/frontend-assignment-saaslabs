

const formatColumnName = (columnName) => {
    return columnName
      .trim() // Remove extra spaces
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, '.') // Replace spaces with dots
      .replace('amount', 'amt'); // Replace "amount" with "amt"
  }

  export default formatColumnName;