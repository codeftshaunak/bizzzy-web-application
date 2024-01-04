import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  targetedFreelancer: {},
  jobDetails: {},
  contractTerms: {},
};

const HireFreelancerSlice = createSlice({
  name: "HireFreelancer",
  initialState,
  reducers: {
    setJobDetails: (state, action) => {
      state.jobDetails = action.payload;
    },
    setContractTerms: (state, action) => {
      state.contractTerms = action.payload;
    },
    setTargetedFreelancer: (state, action) => {
      state.targetedFreelancer = action.payload;
    },
  },
});

export const { setJobDetails, setContractTerms, setTargetedFreelancer } =
  HireFreelancerSlice.actions;

export default HireFreelancerSlice.reducer;
