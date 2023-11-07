// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: '', // Initial role state
  token: '', // Initial token state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { role, token } = action.payload;
      state.role = role;
      state.token = token;
    },
    clearAuthData: (state) => {
      state.role = '';
      state.token = '';
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
