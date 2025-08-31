import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/ModifySearch.module.css";
import { FaExchangeAlt } from "react-icons/fa";
import { setSearchParams, applyFilters } from "../redux/train/trainSlice";

const ModifySearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get search params from Redux store
  const { searchParams } = useSelector((state) => state.trains);

  // Local state for form inputs
  const [localSearchParams, setLocalSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    travelClass: "",
    quota: "General",
  });

  // Sync local state with Redux store and URL params
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const urlParams = {
      from: query.get("from") || "",
      to: query.get("to") || "",
      date: query.get("date") || "",
      travelClass: query.get("class") || "",
      quota: query.get("quota") || "General",
    };

    // Update local form state
    setLocalSearchParams(urlParams);

    // Update Redux store if URL params are different
    if (JSON.stringify(urlParams) !== JSON.stringify(searchParams)) {
      dispatch(setSearchParams(urlParams));
    }
  }, [location.search, searchParams, dispatch]);

  // Function to handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    // Basic validation
    if (!localSearchParams.from || !localSearchParams.to) {
      alert("Please enter both From and To stations");
      return;
    }

    // Update Redux store with new search parameters
    dispatch(setSearchParams(localSearchParams));

    // Apply filters to update the filtered trains
    dispatch(applyFilters());

    // Navigate to search results with updated query parameters
    navigate(
      `/train-search?from=${encodeURIComponent(
        localSearchParams.from
      )}&to=${encodeURIComponent(localSearchParams.to)}&date=${
        localSearchParams.date
      }&class=${encodeURIComponent(
        localSearchParams.travelClass
      )}&quota=${encodeURIComponent(localSearchParams.quota)}`
    );
  };

  // Function to swap From and To stations
  const handleSwapStations = () => {
    setLocalSearchParams((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  return (
    <div className={styles.searchForm}>
      <h3>Modify Search</h3>
      <form onSubmit={handleSearch}>
        <div className={styles.stationInputs}>
          <input
            type="text"
            placeholder="From"
            value={localSearchParams.from}
            onChange={(e) =>
              setLocalSearchParams({
                ...localSearchParams,
                from: e.target.value,
              })
            }
          />
          <button
            type="button"
            className={styles.swapButton}
            onClick={handleSwapStations}
          >
            <FaExchangeAlt />
          </button>
          <input
            type="text"
            placeholder="To"
            value={localSearchParams.to}
            onChange={(e) =>
              setLocalSearchParams({ ...localSearchParams, to: e.target.value })
            }
          />
        </div>

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={localSearchParams.date}
          onChange={(e) =>
            setLocalSearchParams({ ...localSearchParams, date: e.target.value })
          }
        />

        <select
          value={localSearchParams.travelClass}
          onChange={(e) =>
            setLocalSearchParams({
              ...localSearchParams,
              travelClass: e.target.value,
            })
          }
        >
          <option value="">Select Class</option>
          <option value="1A">AC First Class (1A)</option>
          <option value="2A">AC 2 Tier (2A)</option>
          <option value="3A">AC 3 Tier (3A)</option>
          <option value="SL">Sleeper (SL)</option>
        </select>

        <select
          value={localSearchParams.quota}
          onChange={(e) =>
            setLocalSearchParams({
              ...localSearchParams,
              quota: e.target.value,
            })
          }
        >
          <option value="General">General</option>
          <option value="Ladies">Ladies</option>
          <option value="Tatkal">Tatkal</option>
          <option value="Premium Tatkal">Premium Tatkal</option>
        </select>

        <button type="submit">Modify Search</button>
      </form>
    </div>
  );
};

export default ModifySearch;
