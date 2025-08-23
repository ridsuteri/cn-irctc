import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginWithGoogle } from "../../services/authServices";

export const loginWithGoogleAsync = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, thunkAPI) => {
    const response = await loginWithGoogle();
    if (response.status === 200) {
      return response.user;
    } else {
      return thunkAPI.rejectWithValue(response.error);
    }
  }
);

export const registerWithEmailAsync = createAsyncThunk()

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

  extraReducers: (builder)=>{
    builder
    .addCase(loginWithGoogleAsync.fulfilled,(state, action)=>{
      state.isLoginOpen = false;
      state.isRegisterOpen = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null
    })
    .addCase(loginWithGoogleAsync.rejected, (state, action)=>{
      state.isLoginOpen = false;
      state.isRegisterOpen = false;
      state.isLoggedIn = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload
    })
    .addCase(loginWithGoogleAsync.pending, (state, action)=>{
      state.loading = true;
    })

    .addCase(registerWithEmailAsync.fulfilled, ()=>{
      
    })
  }
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
