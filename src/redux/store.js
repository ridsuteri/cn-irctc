const { configureStore } = require("@reduxjs/toolkit");
const authReducer = require("./auth/authSlice");
const store = configureStore({
  reducer: { authReducer },
});

export default store;
