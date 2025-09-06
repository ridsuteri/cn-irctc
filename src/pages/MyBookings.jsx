import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../redux/bookings/bookingsSlice';
import { Link } from 'react-router-dom';
import styles from '../styles/MyBookings.module.css';

const MyBookings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userBookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserBookings(user.uid));
    }
  }, [dispatch, user?.uid]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error loading bookings</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (userBookings.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>My Bookings</h2>
        <div className={styles.noBookings}>
          <p>You haven't made any bookings yet.</p>
          <Link to="/" className={styles.primaryButton}>
            Book a Train Now
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Bookings</h2>
      <div className={styles.tableContainer}>
        <table className={styles.bookingsTable}>
          <thead>
            <tr>
              <th>Booking Id</th>
              <th>Train</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Class</th>
              <th>Passengers</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {console.log(userBookings)}
            {userBookings.map((booking) => (
              <tr key={booking.id} className={styles.bookingRow}>
                <td>
                  <div>{booking.id || '-'}</div>
                </td>
                <td>
                  <div className={styles.trainName}>{booking.trainDetails?.trainName || 'N/A'}</div>
                  <div className={styles.trainNumber}>{booking.trainDetails?.trainNumber || ''}</div>
                </td>
                <td>
                  <div className={styles.stationName}>{booking.trainDetails?.from|| 'N/A'}</div>
                  <div className={styles.departureTime}>
                    {booking.trainDetails?.departureTime ? booking.trainDetails?.departureTime : 'N/A'}
                  </div>
                </td>
                <td>
                  <div className={styles.stationName}>{booking.trainDetails?.to || 'N/A'}</div>
                  <div className={styles.arrivalTime}>
                    {booking.trainDetails?.arrivalTime ? booking.trainDetails?.arrivalTime : 'N/A'}
                  </div>
                </td>
                <td>{booking.trainDetails?.date ? booking.trainDetails?.date : 'N/A'}</td>
                <td>{booking.trainDetails?.travelClass || 'N/A'}</td>
                <td>{booking.passengers?.length || 0}</td>
                <td>
                  <span className={`${styles.statusBadge} ${booking.status === 'confirmed' ? styles.statusConfirmed : styles.statusPending}`}>
                    {booking.status || 'Processing'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
