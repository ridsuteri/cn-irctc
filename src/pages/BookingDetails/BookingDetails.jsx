import React, { useState } from "react";
import { getFirestore, doc, addDoc, updateDoc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import styles from "./BookingDetails.module.css";
import app from "../../config/firebase.js";

const BookingDetails = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
 
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  console.log('current user', auth.currentUser)

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
  
  if (!user) {
    setMessage("User is not authenticated. Please log in.");
    return;
  }

  try {
    const booking = {
      bookingId: `b${Date.now()}`,
      location,
      date,
      amount: parseFloat(amount),
    };

    const userDocRef = doc(db, "users", user.uid);
    
    // Check if the document exists
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      // Create a new user document if it doesn't exist
      await setDoc(userDocRef, { bookings: [booking] });
    } else {
      // Update the existing document
      await updateDoc(userDocRef, {
        bookings: arrayUnion(booking),
      });
    }

    setMessage("Booking saved successfully!");
  } catch (error) {
    console.error("Error saving booking: ", error);
    setMessage("Failed to save booking.");
  }
  };


  return (
    <div className={styles.bookingContainer}>
      <h2>Booking Details</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleBookingSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Save Booking</button>
      </form>
    </div>
  );
};


export default BookingDetails;
