import { render, screen, waitFor } from "@testing-library/react";
import App from "../App.jsx";
import axios from "axios";
import { describe } from "vitest";
import TrainSearchResults from "../pages/TrainSearchResults.jsx";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});

describe("TrainSearchResults", () => {

  test("fetches and displays user data", async () => {
    // Create a mock response

    const mockResponse = {
      data: [{
        train_number: "12002",
        train_name: "New Delhi - Bhopal Shatabdi Express",
        source: "New Delhi",
        destination: "Bhopal Junction",
        route: [
          {
            station_name: "New Delhi",
            arrival_time: "N/A",
            departure_time: "06:00",
          },
          {
            station_name: "Agra Cantt",
            arrival_time: "08:00",
            departure_time: "08:05",
          },
          {
            station_name: "Gwalior",
            arrival_time: "10:00",
            departure_time: "10:05",
          },
          {
            station_name: "Jhansi",
            arrival_time: "12:00",
            departure_time: "12:05",
          },
          {
            station_name: "Bhopal Junction",
            arrival_time: "14:00",
            departure_time: "N/A",
          },
        ],
        departure_time: "06:00",
        arrival_time: "14:00",
        duration: "8h 00m",
        days_of_operation: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        price: {
          "AC Chair Car": 1200,
          "Executive Class": 2100,
        },
      }],
    };

    axios.get.mockResolvedValue(mockResponse); // Render the User component

    render(<TrainSearchResults />); // Check if the mocked response is used in the component

    const userNameElement = await waitFor(() => screen.getByText(/New Delhi/i));

    expect(userNameElement).toBeInTheDocument();
  });
});
