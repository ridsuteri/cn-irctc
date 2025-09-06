import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for creating a booking
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
  }
);


const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    // Current booking being created
    currentBooking: {
      trainDetails: null,
      passengers: [
        { name: "", age: "", gender: "Male", berth: "No Preference" },
      ],
      contactInfo: {
        email: "",
        phone: "",
      },
      selectedClass: "",
      availableClasses: [],
      classPrice: {},
    },

    // User's booking history
    userBookings: [],

    // Loading and error states
    loading: false,
    error: null,

    // Booking creation status
    bookingCreated: false,
    lastBookingId: null,
  },
  reducers: {
    // Initialize booking with train details
    initializeBooking: (state, action) => {
    },

    // Update train details
    updateTrainDetails: (state, action) => {
  
    },

    // Update selected class
    updateSelectedClass: (state, action) => {

    },

    // Passenger management
    addPassenger: (state) => {
      
    },

    removePassenger: (state, action) => {
      
    },

    updatePassenger: (state, action) => {
     
    },

    // Contact info management
    updateContactInfo: (state, action) => {
     
    },

    // Clear current booking
    clearCurrentBooking: (state) => {
      
    },

    // Clear error
    clearError: (state) => {
      
    },

    // Reset booking created status
    resetBookingCreated: (state) => {
      
    },
  },
});

export const {
  initializeBooking,
  updateTrainDetails,
  updateSelectedClass,
  addPassenger,
  removePassenger,
  updatePassenger,
  updateContactInfo,
  clearCurrentBooking,
  clearError,
  resetBookingCreated,
} = bookingSlice.actions;

export default bookingSlice.reducer;