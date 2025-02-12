import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import app from "../../config/firebase.js";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./BookingHistory.module.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // Store authenticated user

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setError("User is not authenticated.");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  useEffect(() => {
    if (!user) return; // Ensure user exists before fetching bookings

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setBookings(docSnap.data().bookings || []);
        } else {
          setError("No booking history found.");
        }
      } catch (error) {
        console.error("Error fetching bookings: ", error);
        setError("Failed to fetch booking history.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [db, user]);

  return (
    <>
    <Navbar/>
    <div className={styles.historyContainer}>
      <h2>Booking History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : bookings.length > 0 ? (
        <ul className={styles.bookingList}>
          {bookings.map((booking, index) => (
            <li key={index} className={styles.bookingItem}>
              <h3>Booking #{booking.bookingId}</h3>
              <p>Location: {booking.location}</p>
              <p>Date: {booking.date}</p>
              <p>Amount: ${booking.amount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
    </>
  );
};

export default BookingHistory;
