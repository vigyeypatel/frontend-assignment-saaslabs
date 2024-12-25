import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";

jest.mock("../TableRow/TableRow", () => {
  return ({ item, columns }) => (
    <tr data-testid="table-row">
      {columns.map((col, idx) => (
        <td key={idx}>{item[col]}</td>
      ))}
    </tr>
  );
});

describe("Table Component", () => {
  const columns = ["Date", "Amount", "Category", "Description"];
  const data = [
    {
      Date: "2023-12-25",
      Amount: "$100",
      Category: "Groceries",
      Description: "Christmas shopping",
    },
    {
      Date: "2023-12-24",
      Amount: "$50",
      Category: "Dining",
      Description: "Dinner with friends",
    },
  ];

  test("renders table with correct headers", () => {
    render(<Table columns={columns} data={data} />);
    columns.forEach((column) => {
      expect(screen.getByText(column)).toBeInTheDocument();
    });
  });

  test("displays table rows correctly", () => {
    render(<Table columns={columns} data={data} />);
    const rows = screen.getAllByTestId("table-row");
    expect(rows).toHaveLength(data.length);
  });

  test("displays 'No Data Available' when data is empty", () => {
    render(<Table columns={columns} data={[]} />);
    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });

  test("passes data to TableRow component", () => {
    render(<Table columns={columns} data={data} />);
    data.forEach((item) => {
      columns.forEach((col) => {
        expect(screen.getByText(item[col])).toBeInTheDocument();
      });
    });
  });

  test("handles missing columns or data gracefully", () => {
    const { container } = render(<Table columns={[]} data={[]} />);
    expect(container.querySelector("thead")).toBeInTheDocument();
    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<Table columns={columns} data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
