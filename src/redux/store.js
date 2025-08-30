import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import trainReducer from "./train/trainSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    trains: trainReducer,
  },
});

export default store;
