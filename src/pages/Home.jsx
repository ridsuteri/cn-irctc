import React, { useState } from "react";
import {
  FaExchangeAlt,
  FaCalendarAlt,
  FaSuitcase,
  FaTrain,
} from "react-icons/fa";
import styles from "../styles/Home.module.css";
import trainImage from "../assets/train1.jpg";

const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.background}>
        <img
          src={trainImage}
          alt="Train Background"
          className={styles.trainImage}
        />
      </div>

      {/* Booking Form */}
      <div className={styles.bookingForm}>
        <h2>BOOK TICKET</h2>

        {/* From & To Input Fields */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FaTrain className={styles.icon} />
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={styles.input}
            />
          </div>
          <button className={styles.swapButton} onClick={swapLocations}>
            <FaExchangeAlt />
          </button>
          <div className={styles.inputWrapper}>
            <FaTrain className={styles.icon} />
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        {/* Date & Class Selection */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FaCalendarAlt className={styles.icon} />
            <input type="date" className={styles.input} />
          </div>
          <div className={styles.inputWrapper}>
            <FaSuitcase className={styles.icon} />
            <select className={styles.select}>
              <option>All Classes</option>
              <option>Sleeper</option>
              <option>AC 3 Tier</option>
              <option>AC 2 Tier</option>
              <option>AC First Class</option>
            </select>
          </div>
        </div>

        {/* Quota Selection */}
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <FaTrain className={styles.icon} />
            <select className={styles.select}>
              <option>General</option>
              <option>Ladies</option>
              <option>Tatkal</option>
              <option>Premium Tatkal</option>
              <option>Railway Pass</option>
            </select>
          </div>
        </div>

        {/* Checkbox Options */}
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

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.searchButton}>Search</button>
          <button className={styles.askDishaButton}>
            Easy Booking on AskDISHA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
