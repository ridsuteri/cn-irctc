import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaExchangeAlt,
  FaCalendarAlt,
  FaSuitcase,
  FaTrain,
} from "react-icons/fa";
import styles from "../styles/Home.module.css";
import trainImage from "../assets/train1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [travelClass, setTravelClass] = useState("All Classes");
  const [quota, setQuota] = useState("General");

  // Handle form submission for search
  const handleSearchClick = (e) => {
    e.preventDefault();

    // Basic validation
    if (!from || !to) {
      alert("Please enter both From and To stations");
      return;
    }

    //TODO: Set search parameters in Redux

    // Navigate to search results with query parameters
    navigate(
      `/train-search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&date=${date}&class=${encodeURIComponent(
        travelClass
      )}&quota=${encodeURIComponent(quota)}`
    );
  };

  // Function to swap From and To stations
  const handleSwapStations = () => {
    const tempFrom = from;
    setFrom(to);
    setTo(tempFrom);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <img
          src={trainImage}
          alt="Train Background"
          className={styles.trainImage}
        />
      </div>

      <div className={styles.bookingForm}>
        <h2>BOOK TICKET</h2>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FaTrain className={styles.icon} />
            <input
              type="text"
              placeholder="From Station"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={styles.input}
            />
          </div>
          <button
            className={styles.swapButton}
            onClick={handleSwapStations}
            type="button"
          >
            <FaExchangeAlt />
          </button>
          <div className={styles.inputWrapper}>
            <FaTrain className={styles.icon} />
            <input
              type="text"
              placeholder="To Station"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FaCalendarAlt className={styles.icon} />
            <input
              type="date"
              className={styles.input}
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaSuitcase className={styles.icon} />
            <select
              className={styles.select}
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
            >
              <option>All Classes</option>
              <option>Sleeper</option>
              <option>AC 3 Tier</option>
              <option>AC 2 Tier</option>
              <option>AC First Class</option>
            </select>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FaTrain className={styles.icon} />
            <select
              className={styles.select}
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
            >
              <option>General</option>
              <option>Ladies</option>
              <option>Tatkal</option>
              <option>Premium Tatkal</option>
              <option>Railway Pass</option>
            </select>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label>
            <input type="checkbox" /> Person With Disability Concession
          </label>
          <label>
            <input type="checkbox" /> Flexible With Date
          </label>
          <label>
            <input type="checkbox" /> Train with Available Berth
          </label>
          <label>
            <input type="checkbox" /> Railway Pass Concession
          </label>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.searchButton} onClick={handleSearchClick}>
            Search Trains
          </button>
          <button
            className={styles.ShowTrain}
            onClick={() => {
              //TODO: Clear all filters and search params when showing all trains
              navigate("/train-search");
            }}
          >
            Show All Trains
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
