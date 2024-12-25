import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

describe("App Component", () => {
  const mockData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("handles API errors gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("API Error"));
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    render(<App />);
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching data:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  //   render(<App />);

  //   await waitFor(() => {
  //     expect(screen.getByText("User 1")).toBeInTheDocument();
  //   });

  //   // Click "Next" button
  //   fireEvent.click(screen.getByText("Next"));

  //   await waitFor(() => {
  //     expect(screen.getByText(`User ${OFF_SET + 1}`)).toBeInTheDocument();
  //   });
  // });

  // test("pagination - Prev button", async () => {
  //   axios.get.mockResolvedValueOnce({ data: mockData });
  //   render(<App />);

  //   await waitFor(() => {
  //     expect(screen.getByText("User 1")).toBeInTheDocument();
  //   });

  //   // Go to the second page
  //   fireEvent.click(screen.getByText("Next"));
  //   await waitFor(() => {
  //     expect(screen.getByText(`User ${OFF_SET + 1}`)).toBeInTheDocument();
  //   });

  //   // Click "Prev" button
  //   fireEvent.click(screen.getByText("Prev"));
  //   await waitFor(() => {
  //     expect(screen.getByText("User 1")).toBeInTheDocument();
  //   });
  // });

  // test("pagination input - valid input", async () => {
  //   axios.get.mockResolvedValueOnce({ data: mockData });
  //   render(<App />);

  //   await waitFor(() => {
  //     expect(screen.getByText("User 1")).toBeInTheDocument();
  //   });

  //   // Enter a valid page number
  //   const input = screen.getByPlaceholderText("Go to page");
  //   fireEvent.change(input, { target: { value: "2" } });

  //   await waitFor(() => {
  //     expect(screen.getByText(`User ${OFF_SET + 1}`)).toBeInTheDocument();
  //   });
  // });

  // test("pagination input - invalid input", async () => {
  //   axios.get.mockResolvedValueOnce({ data: mockData });
  //   render(<App />);

  //   await waitFor(() => {
  //     expect(screen.getByText("User 1")).toBeInTheDocument();
  //   });

  //   // Enter an invalid page number (e.g., 0 or out of range)
  //   const input = screen.getByPlaceholderText("Go to page");
  //   fireEvent.change(input, { target: { value: "0" } });

  //   await waitFor(() => {
  //     expect(screen.getByText("User 1")).toBeInTheDocument();
  //   });
  // });

  // test("pagination buttons - disabled states", async () => {
  //   axios.get.mockResolvedValueOnce({ data: mockData });
  //   render(<App />);

  //   await waitFor(() => {
  //     expect(screen.getByText("User 1")).toBeInTheDocument();
  //   });

  //   // "Prev" button should be disabled on the first page
  //   expect(screen.getByText("Prev")).toBeDisabled();

  //   // Go to the last page
  //   for (let i = 1; i < Math.ceil(mockData.length / OFF_SET); i++) {
  //     fireEvent.click(screen.getByText("Next"));
  //   }

  //   await waitFor(() => {
  //     expect(screen.getByText(`User ${mockData.length}`)).toBeInTheDocument();
  //   });

  //   // "Next" button should be disabled on the last page
  //   expect(screen.getByText("Next")).toBeDisabled();
  // });

  // test("renders Table component with correct props", async () => {
  //   axios.get.mockResolvedValueOnce({ data: mockData });
  //   render(<App />);

  //   await waitFor(() => {
  //     expect(screen.getByText("User 1")).toBeInTheDocument();
  //   });

  //   const table = screen.getByRole("table");
  //   expect(table).toBeInTheDocument();
  // });

  // test("matches snapshot", async () => {
  //   axios.get.mockResolvedValueOnce({ data: mockData });
  //   const { asFragment } = render(<App />);

  //   await waitFor(() => {
  //     expect(screen.getByText("User 1")).toBeInTheDocument();
  //   });

  //   expect(asFragment()).toMatchSnapshot();
  // });
});
