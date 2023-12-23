// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getLocalStorageAuthData = () => {
    const profile = JSON.parse(localStorage.getItem('bizzzy_user')); // Parse the JSON string
    return { profile };
};

const initialState = getLocalStorageAuthData();

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        profileData: (state, action) => {
            const { profile } = action.payload;
            state.profile = profile;
            // Save to local storage whenever the profile data changes
            localStorage.setItem('bizzzy_user', JSON.stringify(profile));
        },
    },
});

export const { profileData } = profileSlice.actions;

export default profileSlice.reducer;
