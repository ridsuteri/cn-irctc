import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import styles from "../styles/BookingHistoryPage.module.css";
import { useAuth } from "../context/AuthContext";

function BookingHistoryPage() {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) {
        setBookings([]);
        setLoading(false);
        return;
      }

      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(
          bookingsRef,
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  if (loading)
    return <div className={styles.loading}>Loading your bookings...</div>;

  if (bookings.length === 0)
    return (
      <div className={styles.empty}>No bookings found for your account.</div>
    );

  return (
    <div className={styles.container}>
      <h2>Your Train Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className={styles.card}>
          <h3>{booking.trainDetails.trainName}</h3>
          <p>
            <strong>Train Number:</strong> {booking.trainDetails.trainNumber}
          </p>
          <p>
            <strong>From:</strong> {booking.trainDetails.from} &nbsp;&nbsp;
            <strong>To:</strong> {booking.trainDetails.to}
          </p>
          <p>
            <strong>Date:</strong> {booking.trainDetails.date}
          </p>
          <p>
            <strong>Class:</strong> {booking.trainDetails.travelClass}
          </p>
          <p>
            <strong>Quota:</strong> {booking.trainDetails.quota}
          </p>
          <p>
            <strong>Passenger(s):</strong>
          </p>
          <ul>
            {booking.passengers.map((p, idx) => (
              <li key={idx}>
                {p.name} ({p.age} yrs, {p.gender}) – {p.berth}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total Fare:</strong> ₹{booking.paymentSummary.total}
          </p>
          <p>
            <strong>Status:</strong> {booking.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BookingHistoryPage;
