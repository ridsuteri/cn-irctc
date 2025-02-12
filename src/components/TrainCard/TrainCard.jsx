import React from "react";
import {useNavigate} from 'react-router-dom'
import "./TrainCard.css"; 

const Traincard = ({ train }) => {

  const navigate = useNavigate();

  const proceedToBooking = (train)=>{
    console.log(train);
    navigate('/booking', {state:{train}})
  }
  return (
    <div className="train-card">
      <h3>{train.name}</h3>
      <p>
        From: {train.from} To: {train.to}
      </p>
      <p>Departure Time: {train.departureTime}</p>
      <p>Arrival Time: {train.arrivalTime}</p>
      <p>Fare: ₹{train.fare}</p>
      <button onClick={()=>proceedToBooking(train)}>Book Now</button>
    </div>
  );
};

export default Traincard;