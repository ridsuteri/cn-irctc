import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/BookingPage.module.css";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [trainDetails, setTrainDetails] = useState(null);
  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "Male", berth: "No Preference" },
  ]);
  const [contactInfo, setContactInfo] = useState({
    email: currentUser?.email || "",
    phone: "",
  });
  const [selectedClass, setSelectedClass] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]);
  const [classPrice, setClassPrice] = useState({});

  useEffect(() => {
    // Check if we have train details from navigation state
    if (location.state?.trainNumber) {
      // Get price information from navigation state
      const priceData = location.state.price || {};
      setClassPrice(priceData);

      // Get available classes
      const classes = Object.keys(priceData);
      setAvailableClasses(classes);

      // Set default selected class (first one)
      if (classes.length > 0) {
        const defaultClass = location.state.travelClass || classes[0];
        setSelectedClass(defaultClass);
      }

      // Set train details from navigation state
      setTrainDetails({
        trainNumber: location.state.trainNumber,
        trainName: location.state.trainName || "Unknown Train",
        from: location.state.from,
        to: location.state.to,
        date: location.state.date,
        departureTime: location.state.departureTime || "06:00",
        arrivalTime: location.state.arrivalTime || "14:00",
        travelClass:
          location.state.travelClass ||
          (classes.length > 0 ? classes[0] : "AC Chair Car"),
        quota: location.state.quota || "General",
        duration: location.state.duration || "8h 00m",
      });
    } else {
      // No train selected, you might want to handle this case
      console.log("No train details provided");
    }
  }, [location.state]);

  // Update selected class
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { name: "", age: "", gender: "Male", berth: "No Preference" },
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      const updatedPassengers = [...passengers];
      updatedPassengers.splice(index, 1);
      setPassengers(updatedPassengers);
    }
  };

  const updatePassenger = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (field, value) => {
    setContactInfo({
      ...contactInfo,
      [field]: value,
    });
  };

  const calculateTotalFare = () => {
    const passengerCount = passengers.length;
    // Get the fare for the selected class
    const baseFarePerPassenger = classPrice[selectedClass] || 0;
    const totalBaseFare = baseFarePerPassenger * passengerCount;

    // Calculate additional charges
    const gst = Math.round(totalBaseFare * 0.05); // 5% GST
    const convenienceFee = 30; // Fixed convenience fee
    const cateringCharge =
      selectedClass === "Executive Class"
        ? 150 * passengerCount
        : 120 * passengerCount;

    return {
      baseFare: totalBaseFare,
      gst: gst,
      convenienceFee: convenienceFee,
      cateringCharge: cateringCharge,
      total: totalBaseFare + gst + convenienceFee + cateringCharge,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const isFormValid =
      passengers.every((p) => p.name && p.age) &&
      contactInfo.email &&
      contactInfo.phone;

    if (!isFormValid) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // In a real app, you would submit the booking to your backend
      const bookingData = {
        userId: currentUser?.uid, // Store reference to user
        trainDetails: {
          ...trainDetails,
          travelClass: selectedClass,
        },
        passengers: passengers,
        contactInfo: contactInfo,
        paymentSummary: calculateTotalFare(),
        status: "confirmed",
        createdAt: serverTimestamp(), // Assuming you have a function to get the current timestamp
      };
      const bookingsRef = collection(db, "bookings");
      const docRef = await addDoc(bookingsRef, bookingData);

      console.log("Booking data:", bookingData);
      alert("Booking submitted successfully!");
      // You would then redirect to a payment page or confirmation page
      navigate("/booking-confirmation", {
        state: {
          bookingId: docRef.id,
          bookingDetails: bookingData,
        },
      });
    } catch (error) {
      console.error("Error saving booking to Firestore:", error);
      alert("Error confirming booking. Please try again.");
    }
  };

  const goBackToSearch = () => {
    navigate("/train-search");
  };

  if (!trainDetails) {
    return (
      <div className={styles.container}>
        <h2>Booking Page</h2>
        <p>
          No train selected. Please search for trains and select one to book.
        </p>
        <button
          onClick={goBackToSearch}
          className={styles.addButton}
          style={{ marginTop: "20px" }}
        >
          Search Trains
        </button>
      </div>
    );
  }

  const fareDetails = calculateTotalFare();

  return (
    <div className={styles.container}>
      <h2>Book Your Train Ticket</h2>

      <div className={styles.trainSummary}>
        <h3>Train Details</h3>
        <div className={styles.detailsGrid}>
          <div>
            <strong>Train Number:</strong> {trainDetails.trainNumber}
          </div>
          <div>
            <strong>Train Name:</strong> {trainDetails.trainName}
          </div>
          <div>
            <strong>From:</strong> {trainDetails.from}
          </div>
          <div>
            <strong>To:</strong> {trainDetails.to}
          </div>
          <div>
            <strong>Date:</strong> {trainDetails.date}
          </div>
          <div>
            <strong>Departure:</strong> {trainDetails.departureTime}
          </div>
          <div>
            <strong>Arrival:</strong> {trainDetails.arrivalTime}
          </div>
          <div>
            <strong>Duration:</strong> {trainDetails.duration}
          </div>
          <div>
            <strong>Class:</strong>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              style={{
                marginLeft: "10px",
                padding: "3px",
                borderRadius: "3px",
              }}
            >
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls} (₹{classPrice[cls]})
                </option>
              ))}
            </select>
          </div>
          <div>
            <strong>Quota:</strong> {trainDetails.quota}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.passengerSection}>
          <h3>Passenger Details</h3>
          {passengers.map((passenger, index) => (
            <div key={index} className={styles.passengerCard}>
              <h4>Passenger {index + 1}</h4>
              <div className={styles.inputGroup}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={passenger.name}
                    onChange={(e) =>
                      updatePassenger(index, "name", e.target.value)
                    }
                    required
                    placeholder="Enter full name as per ID"
                  />
                </label>
              </div>
              <div className={styles.inputGroup}>
                <label>
                  Age:
                  <input
                    type="number"
                    value={passenger.age}
                    onChange={(e) =>
                      updatePassenger(index, "age", e.target.value)
                    }
                    required
                    min="1"
                    max="120"
                    placeholder="Age in years"
                  />
                </label>
              </div>
              <div className={styles.inputGroup}>
                <label>
                  Gender:
                  <select
                    value={passenger.gender}
                    onChange={(e) =>
                      updatePassenger(index, "gender", e.target.value)
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>
              <div className={styles.inputGroup}>
                <label>
                  Berth Preference:
                  <select
                    value={passenger.berth}
                    onChange={(e) =>
                      updatePassenger(index, "berth", e.target.value)
                    }
                  >
                    <option value="No Preference">No Preference</option>
                    <option value="Lower">Lower</option>
                    <option value="Middle">Middle</option>
                    <option value="Upper">Upper</option>
                    <option value="Side Lower">Side Lower</option>
                    <option value="Side Upper">Side Upper</option>
                  </select>
                </label>
              </div>
              {passengers.length > 1 && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removePassenger(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className={styles.addButton}
            onClick={addPassenger}
          >
            Add Passenger
          </button>
        </div>

        <div className={styles.contactSection}>
          <h3>Contact Information</h3>
          <div className={styles.inputGroup}>
            <label>
              Email:
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                required
                placeholder="For e-ticket and updates"
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label>
              Phone:
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Phone number should be 10 digits"
                placeholder="10-digit mobile number"
              />
            </label>
          </div>
        </div>

        <div className={styles.paymentSection}>
          <h3>Payment Summary</h3>
          <div className={styles.paymentDetails}>
            <div>
              <span>
                Base Fare ({selectedClass} x {passengers.length}):
              </span>
              <span>₹{fareDetails.baseFare}</span>
            </div>
            <div>
              <span>Catering Charges:</span>
              <span>₹{fareDetails.cateringCharge}</span>
            </div>
            <div>
              <span>GST (5%):</span>
              <span>₹{fareDetails.gst}</span>
            </div>
            <div>
              <span>Convenience Fee:</span>
              <span>₹{fareDetails.convenienceFee}</span>
            </div>
            <div className={styles.totalAmount}>
              <span>Total Amount:</span>
              <span>₹{fareDetails.total}</span>
            </div>
          </div>
        </div>

        <div className={styles.termsSection}>
          <label>
            <input type="checkbox" required />I agree to the Terms and
            Conditions and Cancellation Policy
          </label>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.payButton}>
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingPage;
