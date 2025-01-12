import React from "react";
import "./HomePage.css"; 
import Navbar from "../../components/Navbar/Navbar";
const HomePage = () => {

  return (
    <div className="homepage">
      <Navbar/>
      <h2>Book Your Train Ticket</h2>
      <form>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            type="text"
            id="from"
            placeholder="Enter Departure Station"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <input
            type="text"
            id="to"
            placeholder="Enter Arrival Station"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" required />
        </div>
        <button type="submit">Search Trains</button>
      </form>
    </div>
  );
};


export default HomePage;