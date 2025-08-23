import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginWithGoogle } from "../../services/authServices";

// Async thunks for authentication
export const loginWithEmailAsync = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await loginWithEmail(email, password);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogleAsync = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const user = await loginWithGoogle();
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerWithEmailAsync = createAsyncThunk(
  "auth/registerWithEmail",
  async ({ email, password, fullName }, { rejectWithValue }) => {
    try {
      const user = await registerWithEmail(email, password, fullName);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoginOpen: false,
    isRegisterOpen: false,
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
    isInitialized: false,
  },

  reducers: {
    toggleLoginModal: (state) => {
      state.isLoginOpen = !state.isLoginOpen;
      if (state.isLoginOpen) {
        state.isRegisterOpen = false;
      }
      state.error = null;
    },

    toggleRegisterModal: (state) => {
      state.isRegisterOpen = !state.isRegisterOpen;
      if (state.isRegisterOpen) {
        state.isLoginOpen = false;
      }
      state.error = null;
    },

    openLoginModal: (state) => {
      state.isLoginOpen = true;
      state.isRegisterOpen = false;
      state.error = null;
    },

    openRegisterModal: (state) => {
      state.isRegisterOpen = true;
      state.isLoginOpen = false;
      state.error = null;
    },

    closeModals: (state) => {
      state.isLoginOpen = false;
      state.isRegisterOpen = false;
      state.error = null;
    },

    // For Firebase auth state changes
    setAuthState: (state, action) => {
      const user = action.payload;
      if (user) {
        state.isLoggedIn = true;
        state.user = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
      state.isInitialized = true;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Login with email
      .addCase(loginWithEmailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isLoginOpen = false;
        state.isRegisterOpen = false;
        state.error = null;
      })
      .addCase(loginWithEmailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login with Google
      .addCase(loginWithGoogleAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isLoginOpen = false;
        state.isRegisterOpen = false;
        state.error = null;
      })
      .addCase(loginWithGoogleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register with email
      .addCase(registerWithEmailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerWithEmailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isLoginOpen = false;
        state.isRegisterOpen = false;
        state.error = null;
      })
      .addCase(registerWithEmailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.isLoginOpen = false;
        state.isRegisterOpen = false;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  toggleLoginModal,
  toggleRegisterModal,
  openLoginModal,
  openRegisterModal,
  closeModals,
  setAuthState,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
