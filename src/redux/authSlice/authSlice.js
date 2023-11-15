// // authSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// // Function to get values from localStorage
// const getLocalStorageAuthData = () => {
//   const role = localStorage.getItem('role') || '';
//   const authtoken = localStorage.getItem('authtoken') || '';
//   return { role, authtoken };
// };

// const initialState = getLocalStorageAuthData(); // Initialize with values from localStorage

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setAuthData: (state, action) => {
//       const { role, authtoken } = action.payload;
//       state.role = role;
//       state.authtoken = authtoken;
//       // Save to localStorage when data changes
//       localStorage.setItem('role', role);
//       localStorage.setItem('authtoken', authtoken);
//     },
//     clearAuthData: (state) => {
//       state.role = '';
//       state.authtoken = '';
//       // Clear values in localStorage when data is cleared
//       localStorage.removeItem('role');
//       localStorage.removeItem('authtoken');
//     },
//   },
// });

// export const { setAuthData, clearAuthData } = authSlice.actions;

// export default authSlice.reducer;


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
      localStorage.removeItem('role'); // Remove 'role' from local storage
      localStorage.removeItem('authtoken'); // Remove 'authtoken' from local storage
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
