import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/TrainSearchResults.module.css";
import ModifySearch from "../components/ModifySearch";

const API_URL = "https://mocki.io/v1/41189c39-e55b-4b7d-a236-529edfb9d3af";

const TrainSearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [trains, setTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    travelClass: "",
    quota: "",
  });

  //  State for checkbox filters
  const [filters, setFilters] = useState({
    travelClass: {
      "AC First Class": false,
      "AC 2 Tier": false,
      "AC 3 Tier": false,
    },
    trainType: {
      Rajdhani: false,
      Shatabdi: false,
      Vaishali: false,
    },
    departureTime: {
      "00:00 - 06:00": false,
      "06:00 - 12:00": false,
    },
  });

  // NEW CODE: Handler for checkbox changes
  const handleFilterChange = (category, value) => {

    setFilters((prev) => {
      console.log('category', category);
      console.log('value', value);
      console.log('prev', prev);
      return {
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category][value],
      },
    }
  });
  };

  // Parse query parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const params = {
      from: query.get("from") || "",
      to: query.get("to") || "",
      date: query.get("date") || "",
      travelClass: query.get("class") || "",
      quota: query.get("quota") || "",
    };

    setSearchParams(params);
  }, [location.search]);

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

  // Fetch all trains from API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTrains(data.data);
      })
      .catch((error) => {
        console.error("Error fetching train data:", error);
      });
  }, []);

  //  Filter trains based on search parameters and checkbox filters
  useEffect(() => {
    if (trains.length === 0) return;

    let filtered = [...trains];

    // Filter by from and to stations if provided
    if (searchParams.from && searchParams.to) {
      filtered = filtered.filter(
        (train) =>
          train.source
            .toLowerCase()
            .includes(searchParams.from.toLowerCase()) &&
          train.destination
            .toLowerCase()
            .includes(searchParams.to.toLowerCase())
      );
    }

    // Filter by travel class if provided in search params
    if (searchParams.travelClass) {
      filtered = filtered.filter((train) => {
        if (!train.price) return false;
        // Map the class values to their display names for comparison
        const classMap = {
          "1A": "AC First Class",
          "2A": "AC 2 Tier",
          "3A": "AC 3 Tier",
          SL: "Sleeper",
        };
        const classDisplayName = classMap[searchParams.travelClass];
        return classDisplayName
          ? Object.keys(train.price).includes(classDisplayName)
          : true;
      });
    }

    // NEW CODE: Filter by travel class checkboxes
    const activeClassFilters = Object.keys(filters.travelClass).filter(
      (key) => filters.travelClass[key]
    );
    console.log('activeClassFilters', activeClassFilters);
    if (activeClassFilters.length > 0) {
      filtered = filtered.filter((train) => {
        if (!train.price) return false;
        // Check if train has any of the selected classes
        return activeClassFilters.some((cls) =>
          Object.keys(train.price).includes(cls)
        );
      });
    }

    // NEW CODE: Filter by train type checkboxes
    const activeTypeFilters = Object.keys(filters.trainType).filter(
      (key) => filters.trainType[key]
    );
    if (activeTypeFilters.length > 0) {
      filtered = filtered.filter((train) =>
        // Check if train name contains any of the selected train types
        activeTypeFilters.some((type) => train.train_name.includes(type))
      );
    }

    // NEW CODE: Filter by departure time checkboxes
    const activeTimeFilters = Object.keys(filters.departureTime).filter(
      (key) => filters.departureTime[key]
    );
    if (activeTimeFilters.length > 0) {
      filtered = filtered.filter((train) => {
        // Extract hour from departure time (e.g., "05:30" -> 5)
        const departureHour = parseInt(train.departure_time.split(":")[0]);

        // Check if departure hour falls within any selected time range
        return activeTimeFilters.some((timeRange) => {
          if (timeRange === "00:00 - 06:00") {
            return departureHour >= 0 && departureHour < 6;
          } else if (timeRange === "06:00 - 12:00") {
            return departureHour >= 6 && departureHour < 12;
          }
          return false;
        });
      });
    }

    setFilteredTrains(filtered);
  }, [searchParams, filters]); // Added filters to dependencies

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

  return (
    <>
      <ModifySearch />
      <div className={styles.container}>
        <div className={styles.filterSection}>
          <div className={styles.filterColumn}>
            <h3>Travel Classes</h3>
            {/* checked state and onChange handler to checkboxes */}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.travelClass["AC First Class"]}
                onChange={() =>
                  handleFilterChange("travelClass", "AC First Class")
                }
              />
              AC First Class (1A)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.travelClass["AC 2 Tier"]}
                onChange={() => handleFilterChange("travelClass", "AC 2 Tier")}
              />
              AC 2 Tier (2A)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.travelClass["AC 3 Tier"]}
                onChange={() => handleFilterChange("travelClass", "AC 3 Tier")}
              />
              AC 3 Tier (3A)
            </label>
          </div>
          <div className={styles.filterColumn}>
            <h3>Train Type</h3>
            {/*   checked state and onChange handler to checkboxes */}
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
            {/* Added checked state and onChange handler to checkboxes */}
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
