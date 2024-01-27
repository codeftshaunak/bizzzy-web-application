// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getLocalStorageAuthData = () => {
  const role = localStorage.getItem('role') || '';
  const authtoken = localStorage.getItem('authtoken') || '';
  return { role, authtoken };
};

const initialState = getLocalStorageAuthData();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { role, authtoken } = action.payload;
      state.role = role;
      state.authtoken = authtoken;
      localStorage.setItem('role', role);
      localStorage.setItem('authtoken', authtoken);
    },
    clearAuthData: (state) => {
      state.role = '';
      state.authtoken = '';
<<<<<<< HEAD
      localStorage.removeItem('role');
      localStorage.removeItem('authtoken');
=======
      localStorage.removeItem('role'); // Remove 'role' from local storage
      localStorage.removeItem('authtoken'); // Remove 'authtoken' from local storage
>>>>>>> parent of db37502 (seperating the git create steps)
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
