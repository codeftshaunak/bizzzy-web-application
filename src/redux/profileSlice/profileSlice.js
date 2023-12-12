import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profileDetail:[]
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileDetails : (state , actions)=>{
        state.profileDetail = actions?.payload
    }
  },
});

export const { getProfileDetails } = profileSlice.actions;

export default profileSlice.reducer;
