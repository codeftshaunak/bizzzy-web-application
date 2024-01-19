import { createSlice } from '@reduxjs/toolkit';

const getLocalStorageUser = () => {
    const profile = JSON.parse(localStorage.getItem('bizzzy_user')) || '';
    return { profile };
};

const initialState = getLocalStorageUser();

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        profileData: (state, action) => {
            const { profile } = action.payload;
            state.profile = profile;
            localStorage.setItem("bizzzy_user", JSON.stringify(profile));
        },
        clearProfileData: (state) => {
            state.profile = {};
            localStorage.removeItem('bizzzy_user'); // Remove 'role' from local storage
        },
    },

});

export const { profileData, clearProfileData } = profileSlice.actions;

export default profileSlice.reducer;
