import React from "react";
import "./TrainCard.css"; 

const Traincard = ({ train }) => {
  return (
    <div className="train-card">
      <h3>{train.name}</h3>
      <p>
        From: {train.from} To: {train.to}
      </p>
      <p>Departure Time: {train.departureTime}</p>
      <p>Arrival Time: {train.arrivalTime}</p>
      <p>Fare: ₹{train.fare}</p>
      <button>Book Now</button>
    </div>
  );
};

export default Traincard;