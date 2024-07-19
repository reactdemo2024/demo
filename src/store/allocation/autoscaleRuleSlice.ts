import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Operator, ScaleDirection, ScaleType } from "../../enum/allocation.enum";

export interface AutoscaleRulePayload {
    id: string;
    name: string;
    timeWindow: string;
    operator: Operator | null;
    threshold: string;
    scaleDirection: ScaleDirection | null;
    scaleType: ScaleType | null;
    scaleValue: string;
    cooldown: string;
    metric: string;
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