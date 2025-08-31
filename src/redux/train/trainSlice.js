import { createSlice } from "@reduxjs/toolkit";

const trainSlice = createSlice({
  name: "train",
  initialState: {
    trains: [
      {
        train_number: "12345",
        train_name: "Rajdhani Express",
        departure_time: "06:00",
        arrival_time: "18:00",
        source: "Delhi",
        destination: "Mumbai",
        days_of_operation: ["Mon", "Wed", "Fri"],
        price: { "1A": 3500, "2A": 2200, "3A": 1500 },
      },
      {
        train_number: "54321",
        train_name: "Shatabdi Express",
        departure_time: "08:30",
        arrival_time: "16:30",
        source: "Delhi",
        destination: "Chandigarh",
        days_of_operation: ["Tue", "Thu", "Sat"],
        price: { CC: 1200, "2S": 600 },
      },
      {
        train_number: "67890",
        train_name: "Special Superfast",
        departure_time: "22:00",
        arrival_time: "06:00",
        source: "Mumbai",
        destination: "Chennai",
        days_of_operation: "Daily",
        price: { "1A": 4000, "2A": 2500, "3A": 1700, SL: 800 },
      },
    ],
    filteredTrains: [],
    selectedTrain: null,
    loading: false,
    error: null,

    // Search parameters
    searchParams: {
      from: "",
      to: "",
      date: "",
      travelClass: "",
      quota: "",
    },

    // Filter state
    filters: {
      travelClass: {
        "1A": false,
        "2A": false,
        "3A": false,
        "SL": false,
        "2S": false,
        "CC": false
      },
      trainType: {
        Rajdhani: false,
        Shatabdi: false,
        Vaishali: false,
      },
      departureTime: {
        "00:00 - 06:00": false,
        "06:00 - 12:00": false,
        "12:00 - 18:00": false,
        "18:00 - 24:00": false,
      },
    },
  },

  reducers: {
    // Search parameters actions
    setSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },

    clearSearchParams: (state) => {
      state.searchParams = {
        from: "",
        to: "",
        date: "",
        travelClass: "",
        quota: "",
      };
    },

    // Filter actions
    toggleFilter: (state, action) => {
      const { category, value } = action.payload;
      if (
        state.filters[category] &&
        state.filters[category][value] !== undefined
      ) {
        state.filters[category][value] = !state.filters[category][value];
      }
    },

    clearFilters: (state) => {
      Object.keys(state.filters).forEach((category) => {
        Object.keys(state.filters[category]).forEach((key) => {
          state.filters[category][key] = false;
        });
      });
    },

    clearAllFiltersAndSearch: (state) => {
      // Clear search params
      state.searchParams = {
        from: "",
        to: "",
        date: "",
        travelClass: "",
        quota: "",
      };

      // Clear filters
      Object.keys(state.filters).forEach((category) => {
        Object.keys(state.filters[category]).forEach((key) => {
          state.filters[category][key] = false;
        });
      });

      // Reset filtered trains to show all trains
      state.filteredTrains = state.trains;
    },

    // Apply filters to trains
    applyFilters: (state) => {
      let filtered = [...state.trains];

      // Filter by search parameters
      if (state.searchParams.from && state.searchParams.to) {
        filtered = filtered.filter(
          (train) =>
            train.source
              .toLowerCase()
              .includes(state.searchParams.from.toLowerCase()) &&
            train.destination
              .toLowerCase()
              .includes(state.searchParams.to.toLowerCase())
        );
      }

      // Filter by travel class from search params
      if (
        state.searchParams.travelClass &&
        state.searchParams.travelClass !== "All Classes"
      ) {
        filtered = filtered.filter((train) => {
          if (!train.price) return false;
          const classMap = {
            "1A": "AC First Class",
            "2A": "AC 2 Tier",
            "3A": "AC 3 Tier",
            SL: "Sleeper",
          };
          const classDisplayName =
            classMap[state.searchParams.travelClass] ||
            state.searchParams.travelClass;
          return Object.keys(train.price).includes(classDisplayName);
        });
      }

      // Filter by travel class checkboxes
      const activeClassFilters = Object.keys(state.filters.travelClass).filter(
        (key) => state.filters.travelClass[key]
      );
      if (activeClassFilters.length > 0) {
        filtered = filtered.filter((train) => {
          if (!train.price) return false;
          return activeClassFilters.some((cls) =>
            Object.keys(train.price).includes(cls)
          );
        });
      }

      // Filter by train type checkboxes
      const activeTypeFilters = Object.keys(state.filters.trainType).filter(
        (key) => state.filters.trainType[key]
      );
      if (activeTypeFilters.length > 0) {
        filtered = filtered.filter((train) =>
          activeTypeFilters.some((type) => train.train_name.includes(type))
        );
      }

      // Filter by departure time checkboxes
      const activeTimeFilters = Object.keys(state.filters.departureTime).filter(
        (key) => state.filters.departureTime[key]
      );
      if (activeTimeFilters.length > 0) {
        filtered = filtered.filter((train) => {
          const departureHour = parseInt(train.departure_time.split(":")[0]);
          return activeTimeFilters.some((timeRange) => {
            if (timeRange === "00:00 - 06:00") {
              return departureHour >= 0 && departureHour < 6;
            } else if (timeRange === "06:00 - 12:00") {
              return departureHour >= 6 && departureHour < 12;
            } else if (timeRange === "12:00 - 18:00") {
              return departureHour >= 12 && departureHour < 18;
            } else if (timeRange === "18:00 - 24:00") {
              return departureHour >= 18 && departureHour < 24;
            }
            return false;
          });
        });
      }

      state.filteredTrains = filtered;
    },

    // Clear errors
    clearError: (state) => {
      state.error = null;
    },

    // Clear selected train
    clearSelectedTrain: (state) => {
      state.selectedTrain = null;
    },
  },
});

export const {
  setSearchParams,
  clearSearchParams,
  toggleFilter,
  clearFilters,
  clearAllFiltersAndSearch,
  applyFilters,
  clearError,
  clearSelectedTrain,
} = trainSlice.actions;

export default trainSlice.reducer;
