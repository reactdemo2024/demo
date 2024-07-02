import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AutoscaleRulePayload {
    id: string;
    name: string;
    minMachineCount: number;
    defaultMachineCount: number;
    maxMachineCount: number;
    autoscaleRules: string;
    customProperties: string;
  }
  
const autoscaleRuleSlice = createSlice({
    name: 'autoscaleRules',
    initialState: [] as AutoscaleRulePayload[],
    reducers: {
        putAutoscaleRules(state, action: PayloadAction<AutoscaleRulePayload[]>) {
            return action.payload;
        },
    },
});

export const { putAutoscaleRules } = autoscaleRuleSlice.actions;

export default autoscaleRuleSlice.reducer;