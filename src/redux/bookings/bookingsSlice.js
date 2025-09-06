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
      console.log('payload received at reducer', action.payload);
      const {trainDetails, classPrice, userEmail} = action.payload;
      // write code to iterate on price obj of trainDetails and put these values under availableClasses
      const availableClasses = Object.keys(classPrice)
      state.currentBooking = {
        ...state.currentBooking,
        trainDetails,
        classPrice,
        contactInfo:
        {email: userEmail},
        availableClasses
      }
    },

    // Update train details
    updateTrainDetails: (state, action) => {
  
    },

    // Update selected class
    updateSelectedClass: (state, action) => {

    },

    // Passenger management
    addPassenger: (state) => {
      state.currentBooking.passengers.push({ name: "", age: "", gender: "Male", berth: "No Preference" });
    },

    removePassenger: (state, action) => {
      
    },

    updatePassenger: (state, action) => {
      const {index, field, value} = action.payload
      state.currentBooking.passengers[index][field] = value
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