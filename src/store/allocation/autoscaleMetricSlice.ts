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
  
const autoscaleMetricSlice = createSlice({
    name: 'autoscaleMetrics',
    initialState: [] as AutoscaleMetricPayload[],
    reducers: {
        putAutoscaleMetrics(state, action: PayloadAction<AutoscaleMetricPayload[]>) {
            return action.payload;
        },
    },
});

export const { putAutoscaleMetrics } = autoscaleMetricSlice.actions;

export default autoscaleMetricSlice.reducer;