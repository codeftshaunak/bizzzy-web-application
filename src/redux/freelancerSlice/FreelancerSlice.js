import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editableGig: { isEditable: false, data: {} },
};

const FreelancerSlice = createSlice({
  name: "freelancer",
  initialState,
  reducers: {
    setEditableGig: (state, action) => {
      state.editableGig.isEditable = action.payload?.isEditable;
      state.editableGig.data = action.payload?.data;
    },
  },
});

export const { setEditableGig } = FreelancerSlice.actions;

export default FreelancerSlice.reducer;
