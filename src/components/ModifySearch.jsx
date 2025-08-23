import React, { useState } from "react";
import styles from "../styles/ModifySearch.module.css";

const ModifySearch = () => {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    travelClass: "",
    quota: "",
  });

  return (
    <div className={styles.searchForm}>
      <h3>Modify Search</h3>
      <form>
        <input
          type="text"
          placeholder="From"
          value={searchParams.from}
          readOnly
        />
        <input type="text" placeholder="To" value={searchParams.to} readOnly />

        <select value={searchParams.travelClass}>
          <option value="">Select Class</option>
          <option value="1A">AC First Class (1A)</option>
          <option value="2A">AC 2 Tier (2A)</option>
          <option value="3A">AC 3 Tier (3A)</option>
          <option value="SL">Sleeper (SL)</option>
        </select>
        <button type="button">Search</button>
      </form>
    </div>
  );
};

export default ModifySearch;
