import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice'; // Import your auth slice

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to your store
    // ... other reducers
  },
});

export default store;
