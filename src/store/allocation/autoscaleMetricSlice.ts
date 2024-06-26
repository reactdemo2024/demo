import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AutoscaleMetric } from "../../interface/allocation/autoscale-metric.interface";

const autoscaleMetricSlice = createSlice({
    name: 'autoscaleMetrics',
    initialState: [] as AutoscaleMetric[],
    reducers: {
        putAutoscaleMetric(state, action: PayloadAction<AutoscaleMetric>) {
            const metricName = action.payload.name;
            const index = state.findIndex(m => m.name === metricName);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        },
        deleteAutoscaleMetric(state, action: PayloadAction<string>) {
            const metricName = action.payload;
            const index = state.findIndex(m => m.name === metricName);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

export const { putAutoscaleMetric, deleteAutoscaleMetric } = autoscaleMetricSlice.actions;

export default autoscaleMetricSlice.reducer;