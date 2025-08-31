import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enrichTrainDataWithRoute } from "../../utils/trainDataHelper";

const API_URL = 'https://mocki.io/v1/4099cc1c-9657-47c3-bb3f-10c34275e817'

export const fetchTrains = createAsyncThunk(
  "trains/fetchTrains",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if(!response.ok){
        return rejectWithValue(error.message);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching single train details
export const fetchTrainDetails = createAsyncThunk(
  "trains/fetchTrainDetails",
  async (trainNumber, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const train = data.data.find((t) => t.train_number === trainNumber);
      if (!train) {
        throw new Error("Train not found");
      }
      // Enrich train data with route field
      return enrichTrainDataWithRoute(train);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const trainSlice = createSlice({
  name: "train",
  initialState: {
    trains: [],
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

  extraReducers: (builder)=>{
    builder
    .addCase(fetchTrains.pending, (state, action)=>{
      state.loading = true
    })
    .addCase(fetchTrains.fulfilled, (state, action)=>{
      state.trains = action.payload
      state.loading = false
    })


    .addCase(fetchTrainDetails.pending, (state, action)=>{
      state.loading = true
    })
    .addCase(fetchTrainDetails.fulfilled, (state, action)=>{
      state.loading = false
      state.selectedTrain = action.payload
    })
    .addCase(fetchTrainDetails.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload
    })
  }
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
