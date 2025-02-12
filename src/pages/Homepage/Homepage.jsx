import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import Traincard from "../../components/TrainCard/TrainCard";
import trainData from '../../trainData.json'
import useForm from "../../hooks/useForm";
const HomePage = () => {
  const [formData, handleChange] = useForm({ from: "", to: "", date: "" });
  // const [response, loading, err] = useFetch('api-url'); // TODO : further scope of the project
  const [trainList, setTrainList] = useState([]); // State for storing train data
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    setIsLoading(true); // Start loading when form is submitted
  };

  // useEffect for making an API call whenever formData changes (after form submission)
  useEffect(() => {
    if (isLoading) {
      // Simulate API call
      setTimeout(() => {
        // const mockTrains = [
        //   {
        //     id: 1,
        //     name: "Express 101",
        //     from: formData.from,
        //     to: formData.to,
        //     departureTime: "10:00 AM",
        //     arrivalTime: "08:00 PM",
        //     fare: 2000
        //   },
        //   {
        //     id: 2,
        //     name: "Superfast 202",
        //     from: formData.from,
        //     to: formData.to,

        //     departureTime: "2:00 PM",
        //     arrivalTime: "06:00 AM",
        //     fare: 3000
        //   },
        // ];
        setTrainList(trainData); // Set the fetched train list
        setIsLoading(false); // Reset loading state after fetching data
      }, 2000); // Simulating a 2-second delay for the API call
    }
  }, [isLoading, formData]); // Dependency array: effect runs when isLoading changes

  return (
    <>
    <Navbar />
    <div className="homepage">
      <h2>Book Your Train Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            type="text"
            id="from"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <input
            type="text"
            id="to"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Search Trains</button>
      </form>
      {isLoading && <p>Loading trains...</p>}{" "}
      {/* Show loading message while fetching data */}
      {/* Display train list once the data is fetched */}
      {trainList.length > 0 && (
        <div>
          <h3>Available Trains:</h3>
          <ul>
            {trainList.map((train) => (
              <Traincard key={train.id} train={train} />
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};


export default HomePage;