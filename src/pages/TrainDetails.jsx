import React, { useEffect, useState } from "react";
import { FaTrain } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/TrainDetails.module.css";
import {
  fetchTrainDetails,
  clearSelectedTrain,
  clearError,
} from "../redux/train/trainSlice";

const TrainDetails = () => {
  const { train_number } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedClass, setSelectedClass] = useState(null);

  // Redux state
  const {
    selectedTrain: trainDetails,
    loading,
    error,
  } = useSelector((state) => state.trains);

  useEffect(() => {
    // Fetch train details using Redux
    dispatch(fetchTrainDetails(train_number));

    // Cleanup on unmount
    return () => {
      dispatch(clearSelectedTrain());
    };
  }, [train_number, dispatch]);

  // Set default selected class when train details are loaded
  useEffect(() => {
    if (
      trainDetails &&
      trainDetails.price &&
      Object.keys(trainDetails.price).length > 0 &&
      !selectedClass
    ) {
      setSelectedClass(Object.keys(trainDetails.price)[0]);
    }
  }, [trainDetails, selectedClass]);

  const handleBooking = () => {
    if (!trainDetails || !selectedClass) return;

    // Create a formatted date for today
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    // Get source and destination stations
    const source = trainDetails.route[0].station_name;
    const destination =
      trainDetails.route[trainDetails.route.length - 1].station_name;

    // Initialize booking in Redux and navigate
    const trainData = {
      trainNumber: trainDetails.train_number,
      trainName: trainDetails.train_name,
      from: source,
      to: destination,
      date: formattedDate,
      departureTime: trainDetails.departure_time,
      arrivalTime: trainDetails.arrival_time,
      duration: trainDetails.duration,
      travelClass: selectedClass,
      quota: "General",
    };

    // Navigate to booking page with train details
    navigate("/booking", {
      state: {
        ...trainData,
        price: trainDetails.price,
      },
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading train details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Error: {error}</p>
        <button
          className={styles.backButton}
          onClick={() => {
            dispatch(clearError());
            navigate(-1);
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!trainDetails) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Train not found</p>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  // Get source and destination from route array
  const source = trainDetails.route[0];
  const destination = trainDetails.route[trainDetails.route.length - 1];

  // Calculate service charge (5% of base fare)
  const baseFare =
    trainDetails.price && selectedClass ? trainDetails.price[selectedClass] : 0;
  const serviceCharge = Math.floor(baseFare * 0.05);
  const totalFare = baseFare + serviceCharge;

  return (
    <div className={styles.container}>
      <h2>
        <FaTrain /> {trainDetails.train_name} ({trainDetails.train_number})
      </h2>
      <div className={styles.operationDays}>
        <h3>Days of Operation</h3>
        <div className={styles.daysContainer}>
          {trainDetails.days_of_operation.map((day) => (
            <span key={day} className={styles.dayBadge}>
              {day}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.journeyInfo}>
        <div className={styles.journeyDetail}>
          <span>Departure</span>
          <strong>{trainDetails.departure_time}</strong>
        </div>
        <div className={styles.journeyDetail}>
          <span>Duration</span>
          <strong>{trainDetails.duration}</strong>
        </div>
        <div className={styles.journeyDetail}>
          <span>Arrival</span>
          <strong>{trainDetails.arrival_time}</strong>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div className={`${styles.station} ${styles.source}`}>
          <span className={styles.stationName}>{source.station_name}</span>
          <div className={styles.timeInfo}>
            <div>Arrival: {source.arrival_time}</div> <FaTrain />
            <div>Departure: {source.departure_time}</div>
          </div>
        </div>

        {trainDetails.route.slice(1, -1).map((station, index) => (
          <div
            key={index}
            className={`${styles.station} ${
              index % 2 === 0 ? styles.right : styles.left
            }`}
          >
            <span className={styles.stationName}>{station.station_name}</span>
            <div className={styles.timeInfo}>
              <div>Arrival: {station.arrival_time}</div>
              <FaTrain />

              <div>Departure: {station.departure_time}</div>
            </div>
          </div>
        ))}

        <div className={`${styles.station} ${styles.destination}`}>
          <span className={styles.stationName}>{destination.station_name}</span>
          <div className={styles.timeInfo}>
            <div>Arrival: {destination.arrival_time}</div>
            <div>Departure: {destination.departure_time}</div>
          </div>
        </div>
      </div>

      {trainDetails.price && (
        <div className={styles.priceCard}>
          <h3>Fare Information</h3>

          <div className={styles.classSelector}>
            {Object.keys(trainDetails.price).map((classType) => (
              <button
                key={classType}
                className={`${styles.classButton} ${
                  selectedClass === classType ? styles.active : ""
                }`}
                onClick={() => setSelectedClass(classType)}
              >
                {classType}
              </button>
            ))}
          </div>

          <div className={styles.priceDetails}>
            <span>Base Fare:</span>
            <span className={styles.price}>₹{baseFare}</span>
          </div>
          <div className={styles.priceDetails}>
            <span>Service Charges:</span>
            <span className={styles.price}>₹{serviceCharge}</span>
          </div>
          <div className={styles.priceDetails}>
            <span>
              <strong>Total:</strong>
            </span>
            <span className={styles.price}>
              <strong>₹{totalFare}</strong>
            </span>
          </div>
          <button className={styles.bookButton} onClick={handleBooking}>
            Book Now - {selectedClass}
          </button>
        </div>
      )}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default TrainDetails;
