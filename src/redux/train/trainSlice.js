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
    searchParams: {
      from: "",
      to: "",
      date: "",
      travelClass: "",
      quota: "",
    },
    filters: {
      travelClass: {},
      trainType: {},
      departureTime: {},
    },
    loading: false,
    errors: null,
  },
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    resetSearchParams: (state, action) => {
      state.searchParams = {
        from: "",
        to: "",
        date: "",
        travelClass: "",
        quota: "",
      };
    },
    applyFilters: (state, action) =>{
      console.log('existing params', JSON.stringify(state.searchParams))
      let filtered = []
      state.filteredTrains = [...state.trains];
      // TODO: write a simple filter function to filter out the trains with applicable filters and populate the filteredTrains array from that
      if(state.searchParams.to && state.searchParams.from){
        filtered = state.filteredTrains.filter(()=>{

        })
      }
      if(state.searchParams.travelClass){

      }
      if(state.searchParams.quota){

      }

      state.filteredTrains = filtered;
    }


    
  },
});

export const { setSearchParams, resetSearchParams, applyFilters } = trainSlice.actions;

export default trainSlice.reducer;
