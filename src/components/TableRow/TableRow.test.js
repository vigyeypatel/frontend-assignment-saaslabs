import { render, screen } from "@testing-library/react";
import TableRow from "./TableRow";
import formatColumnName from "../../utils/index";

jest.mock("../../utils/index", () => jest.fn((column) => column.toLowerCase()));

describe("TableRow Component", () => {
  const columns = ["Date", "Amount", "Category", "Description"];
  const item = {
    date: "2023-12-25",
    amount: "$100",
    category: "Groceries",
    description: "Christmas shopping",
  };

  test("renders correct number of cells", () => {
    render(<TableRow item={item} columns={columns} />);
    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(columns.length);
  });

  test("displays correct data in each cell", () => {
    render(<TableRow item={item} columns={columns} />);
    expect(screen.getByText("2023-12-25")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Christmas shopping")).toBeInTheDocument();
  });

  test("calls formatColumnName for each column", () => {
    render(<TableRow item={item} columns={columns} />);
    expect(formatColumnName).toHaveBeenCalledTimes(columns.length);
    columns.forEach((col) => {
      expect(formatColumnName).toHaveBeenCalledWith(col);
    });
  });

  test("handles missing columns or item gracefully", () => {
    const { container } = render(<TableRow item={{}} columns={[]} />);
    expect(container.querySelector("tr")).toBeInTheDocument();
    expect(container.querySelectorAll("td")).toHaveLength(0);
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<TableRow item={item} columns={columns} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
