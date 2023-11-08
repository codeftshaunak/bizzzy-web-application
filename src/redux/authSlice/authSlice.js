// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to get values from localStorage
const getLocalStorageAuthData = () => {
  const role = localStorage.getItem('role') || '';
  const token = localStorage.getItem('token') || '';
  return { role, token };
};

const initialState = getLocalStorageAuthData(); // Initialize with values from localStorage

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { role, token } = action.payload;
      state.role = role;
      state.token = token;
      // Save to localStorage when data changes
      localStorage.setItem('role', role);
      localStorage.setItem('token', token);
    },
    clearAuthData: (state) => {
      state.role = '';
      state.token = '';
      // Clear values in localStorage when data is cleared
      localStorage.removeItem('role');
      localStorage.removeItem('token');
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
