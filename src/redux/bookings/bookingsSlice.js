import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";

// Async thunk for creating a booking
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const bookingsRef = collection(db, "bookings");
      const docRef = await addDoc(bookingsRef, {
        ...bookingData,
        createdAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        ...bookingData,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching user bookings
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const bookings = [];
      querySnapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return bookings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingsSlice = createSlice({
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
      const { trainDetails, classPrice } = action.payload;
      const availableClasses = Object.keys(classPrice);

      state.currentBooking = {
        trainDetails,
        passengers: [
          { name: "", age: "", gender: "Male", berth: "No Preference" },
        ],
        contactInfo: {
          email: action.payload.userEmail || "",
          phone: "",
        },
        selectedClass:
          trainDetails.travelClass ||
          (availableClasses.length > 0 ? availableClasses[0] : ""),
        availableClasses,
        classPrice,
      };
      state.bookingCreated = false;
      state.error = null;
    },

    // Update train details
    updateTrainDetails: (state, action) => {
      state.currentBooking.trainDetails = {
        ...state.currentBooking.trainDetails,
        ...action.payload,
      };
    },

    // Update selected class
    updateSelectedClass: (state, action) => {
      state.currentBooking.selectedClass = action.payload;
    },

    // Passenger management
    addPassenger: (state) => {
      state.currentBooking.passengers.push({
        name: "",
        age: "",
        gender: "Male",
        berth: "No Preference",
      });
    },

    removePassenger: (state, action) => {
      const index = action.payload;
      if (state.currentBooking.passengers.length > 1) {
        state.currentBooking.passengers.splice(index, 1);
      }
    },

    updatePassenger: (state, action) => {
      const { index, field, value } = action.payload;
      if (state.currentBooking.passengers[index]) {
        state.currentBooking.passengers[index][field] = value;
      }
    },

    // Contact info management
    updateContactInfo: (state, action) => {
      const { field, value } = action.payload;
      state.currentBooking.contactInfo[field] = value;
    },

    // Clear current booking
    clearCurrentBooking: (state) => {
      state.currentBooking = {
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
      };
      state.bookingCreated = false;
      state.lastBookingId = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Reset booking created status
    resetBookingCreated: (state) => {
      state.bookingCreated = false;
      state.lastBookingId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingCreated = true;
        state.lastBookingId = action.payload.id;
        state.error = null;
        // Add to user bookings if not already there
        const existingBooking = state.userBookings.find(
          (b) => b.id === action.payload.id
        );
        if (!existingBooking) {
          state.userBookings.unshift(action.payload);
        }
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch user bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
        state.error = null;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
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
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
