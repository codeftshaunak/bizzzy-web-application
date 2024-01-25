import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeagency: false, // assuming you want to set 'freelancer' as the initial active user
};

const activeUserSlice = createSlice({
  name: 'activeagency',
  initialState,
  reducers: {
    setActiveAgency: (state, action) => {
        const { activeagency } = action.payload;
        state.activeagency = activeagency;
    },
  },
});

export const { setActiveAgency } = activeUserSlice.actions;

export default activeUserSlice.reducer;

