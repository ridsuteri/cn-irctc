import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "../styles/TrainSearchResults.module.css";
import ModifySearch from "../components/ModifySearch";
import {
  setSearchParams,
  toggleFilter,
  applyFilters,
  clearError,
  fetchTrains,
} from "../redux/train/trainSlice";

const TrainSearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Redux state
  const { trains, filteredTrains, searchParams, filters, loading, error } =
    useSelector((state) => state.trains);

  // Handler for checkbox changes
  const handleFilterChange = (category, value) => {
    dispatch(toggleFilter({ category, value }));
    dispatch(applyFilters());
  };

  // Parse query parameters and fetch trains
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const params = {
      from: query.get("from") || "",
      to: query.get("to") || "",
      date: query.get("date") || "",
      travelClass: query.get("class") || "",
      quota: query.get("quota") || "",
    };

    dispatch(setSearchParams(params));

    // Fetch trains if not already loaded
    if (trains.length === 0) {
      dispatch(fetchTrains());
    }
  }, [location.search, dispatch, trains.length]);

  const handleDetailsClick = (train) => {
    navigate(`/train-details/${train}`);
  };

  const handleBookNowClick = (train) => {
    // Extract current date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    // Get the first available class as default
    const defaultClass = Object.keys(train.price)[0] || "AC Chair Car";

    // Navigate to booking page with complete train details
    navigate("/booking", {
      state: {
        trainNumber: train.train_number,
        trainName: train.train_name,
        from: train.source,
        to: train.destination,
        date: formattedDate,
        departureTime: train.departure_time,
        arrivalTime: train.arrival_time,
        duration: train.duration,
        travelClass: defaultClass,
        quota: "General",
        price: train.price,
        days_of_operation: train.days_of_operation,
      },
    });
  };

  // Apply filters when trains, search params, or filters change
  useEffect(() => {
    if (trains.length > 0) {
      dispatch(applyFilters());
    }
  }, [trains, searchParams, filters, dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [error, dispatch]);

  // Use filtered trains if search params or filters are active, otherwise show all trains
  const displayTrains =
    searchParams.from ||
    searchParams.to ||
    searchParams.travelClass ||
    Object.values(filters).some((category) =>
      Object.values(category).some((value) => value)
    )
      ? filteredTrains
      : trains;

  // Show loading state
  if (loading) {
    return (
      <>
        <ModifySearch />
        <div className={styles.container}>
          <div className={styles.loading}>Loading trains...</div>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <ModifySearch />
        <div className={styles.container}>
          <div className={styles.error}>Error: {error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <ModifySearch />
      <div className={styles.container}>
        <div className={styles.filterSection}>
          <div className={styles.filterColumn}>
            <h3>Travel Classes</h3>
            {/* Travel class filter checkboxes */}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.travelClass["1A"]}
                onChange={() =>
                  handleFilterChange("travelClass", "1A")
                }
              />
              AC First Class (1A)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.travelClass["2A"]}
                onChange={() => handleFilterChange("travelClass", "2A")}
              />
              AC 2 Tier (2A)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.travelClass["3A"]}
                onChange={() => handleFilterChange("travelClass", "3A")}
              />
              AC 3 Tier (3A)
            </label>
          </div>
          <div className={styles.filterColumn}>
            <h3>Train Type</h3>
            {/* Train type filter checkboxes */}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.trainType["Rajdhani"]}
                onChange={() => handleFilterChange("trainType", "Rajdhani")}
              />
              Rajdhani
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.trainType["Shatabdi"]}
                onChange={() => handleFilterChange("trainType", "Shatabdi")}
              />
              Shatabdi
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.trainType["Vaishali"]}
                onChange={() => handleFilterChange("trainType", "Vaishali")}
              />
              Vaishali
            </label>
          </div>
          <div className={styles.filterColumn}>
            <h3>Departure Time</h3>
            {/* Departure time filter checkboxes */}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.departureTime["00:00 - 06:00"]}
                onChange={() =>
                  handleFilterChange("departureTime", "00:00 - 06:00")
                }
              />
              00:00 - 06:00
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.departureTime["06:00 - 12:00"]}
                onChange={() =>
                  handleFilterChange("departureTime", "06:00 - 12:00")
                }
              />
              06:00 - 12:00
            </label>
          </div>
        </div>
        <div className={styles.trainList}>
          {displayTrains.length === 0 ? (
            <div className={styles.noTrains}>
              No trains found for this route.
            </div>
          ) : (
            displayTrains.map((train) => (
              <div key={train.train_number} className={styles.trainCard}>
                <div className={styles.trainHeader}>
                  <span className={styles.trainName}>
                    {train.train_name} ({train.train_number})
                  </span>
                  <span className={styles.trainSchedule}>Train Schedule</span>
                </div>
                <div className={styles.trainDetails}>
                  <div className={styles.timeInfo}>
                    <span>{train.departure_time}</span>
                    <span>{train.source}</span>
                  </div>
                  <span className={styles.durationInfo}>
                    {train.duration} •{" "}
                    {Array.isArray(train.days_of_operation)
                      ? train.days_of_operation.join(", ")
                      : train.days_of_operation}
                  </span>
                  <div className={styles.timeInfo}>
                    <span>{train.arrival_time}</span>
                    <span>{train.destination}</span>
                  </div>
                </div>
                <div className={styles.classInfo}>
                  {/* Use the price object keys as available classes */}
                  {train.price ? (
                    Object.keys(train.price).map((cls) => (
                      <span key={cls}>
                        {cls} (₹{train.price[cls]})
                      </span>
                    ))
                  ) : (
                    <span>No class information available</span>
                  )}
                </div>
                <div className={styles.actionButtons}>
                  {train.price && Object.keys(train.price).length > 0 ? (
                    <div className={styles.bookingOptions}>
                      <button
                        className={styles.bookNowButton}
                        onClick={() => handleBookNowClick(train)}
                      >
                        Book Now
                      </button>
                      <button
                        className={styles.otherDatesButton}
                        onClick={() => handleDetailsClick(train.train_number)}
                      >
                        Other Details
                      </button>
                    </div>
                  ) : (
                    <div className={styles.bookingOptions}>
                      <button className={styles.disabledButton} disabled>
                        No Seats Available
                      </button>
                      <button
                        className={styles.otherDatesButton}
                        onClick={() => handleDetailsClick(train.train_number)}
                      >
                        Other Dates
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TrainSearchResults;
