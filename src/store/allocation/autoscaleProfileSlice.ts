import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AutoscaleProfilePayload {
    name: string;
    minMachineCount: number;
    defaultMachineCount: number;
    maxMachineCount: number;
    autoscaleRules: string;
    customProperties: string;
  }
  
const autoscaleProfileSlice = createSlice({
    name: 'autoscaleProfiles',
    initialState: [] as AutoscaleProfilePayload[],
    reducers: {
        putAutoscaleProfiles(state, action: PayloadAction<AutoscaleProfilePayload[]>) {
            return action.payload;
        },
    },
});

export const { putAutoscaleProfiles } = autoscaleProfileSlice.actions;

export default autoscaleProfileSlice.reducer;