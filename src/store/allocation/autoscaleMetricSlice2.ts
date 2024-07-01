import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AutoscaleMetricPayload {
    name: string;
    metricAccount: string;
    metricNamespace: string;
    samplingType: string;
    metricAggregation: string;
    metricIncludeFilters: string;
    metricExcludeFilters: string;
    customProperties: string;
  }
  
const autoscaleMetricSlice2 = createSlice({
    name: 'autoscaleMetrics2',
    initialState: [] as AutoscaleMetricPayload[],
    reducers: {
        putAutoscaleMetrics2(state, action: PayloadAction<AutoscaleMetricPayload[]>) {
            return action.payload;
        },
    },
});

export const { putAutoscaleMetrics2 } = autoscaleMetricSlice2.actions;

export default autoscaleMetricSlice2.reducer;