import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import trainReducer from "./train/trainSlice.js";
import bookingSlice from "./bookings/bookingsSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    trains: trainReducer,
    bookings: bookingSlice,
  },
});

export default store;
