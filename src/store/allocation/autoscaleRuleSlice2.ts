import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AutoscaleRulePayload {
    name: string;
    minMachineCount: number;
    defaultMachineCount: number;
    maxMachineCount: number;
    autoscaleRules: string;
    customProperties: string;
  }
  
const autoscaleRuleSlice2 = createSlice({
    name: 'autoscaleRules2',
    initialState: [] as AutoscaleRulePayload[],
    reducers: {
        putAutoscaleRules2(state, action: PayloadAction<AutoscaleRulePayload[]>) {
            return action.payload;
        },
    },
});

export const { putAutoscaleRules2 } = autoscaleRuleSlice2.actions;

export default autoscaleRuleSlice2.reducer;