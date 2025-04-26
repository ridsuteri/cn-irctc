import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/ModifySearch.module.css";
import { FaExchangeAlt } from "react-icons/fa";

const ModifySearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    travelClass: "",
    quota: "General",
  });

  // Extract search parameters from URL when component mounts
  useEffect(() => {
    const query = new URLSearchParams(location.search);

    setSearchParams({
      from: query.get("from") || "",
      to: query.get("to") || "",
      date: query.get("date") || "",
      travelClass: query.get("class") || "",
      quota: query.get("quota") || "General",
    });
  }, [location.search]);

  // Function to handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    // Basic validation
    if (!searchParams.from || !searchParams.to) {
      alert("Please enter both From and To stations");
      return;
    }

    // Navigate to search results with updated query parameters
    navigate(
      `/train-search?from=${encodeURIComponent(
        searchParams.from
      )}&to=${encodeURIComponent(searchParams.to)}&date=${
        searchParams.date
      }&class=${encodeURIComponent(
        searchParams.travelClass
      )}&quota=${encodeURIComponent(searchParams.quota)}`
    );
  };

  // Function to swap From and To stations
  const handleSwapStations = () => {
    setSearchParams((prev) => ({
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
            value={searchParams.from}
            onChange={(e) =>
              setSearchParams({ ...searchParams, from: e.target.value })
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
            value={searchParams.to}
            onChange={(e) =>
              setSearchParams({ ...searchParams, to: e.target.value })
            }
          />
        </div>

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={searchParams.date}
          onChange={(e) =>
            setSearchParams({ ...searchParams, date: e.target.value })
          }
        />

        <select
          value={searchParams.travelClass}
          onChange={(e) =>
            setSearchParams({ ...searchParams, travelClass: e.target.value })
          }
        >
          <option value="">Select Class</option>
          <option value="1A">AC First Class (1A)</option>
          <option value="2A">AC 2 Tier (2A)</option>
          <option value="3A">AC 3 Tier (3A)</option>
          <option value="SL">Sleeper (SL)</option>
        </select>

        <select
          value={searchParams.quota}
          onChange={(e) =>
            setSearchParams({ ...searchParams, quota: e.target.value })
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
