import { createSlice } from "@reduxjs/toolkit";
import { AutoscaleRule } from "../../interface/allocation/autoscale-rule.interface";

const autoscaleRuleSlice = createSlice({
    name: 'autoscaleRules',
    initialState: [] as AutoscaleRule[],
    reducers: {
        putAutoscaleRule(state, action) {
            const autoscaleRuleName = action.payload.name;
            const index = state.findIndex(ar => ar.name === autoscaleRuleName);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        },
        deleteAutoscaleRule(state, action) {
            const autoscaleRuleName = action.payload;
            const index = state.findIndex(ar => ar.name === autoscaleRuleName);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const { putAutoscaleRule, deleteAutoscaleRule } = autoscaleRuleSlice.actions;

export default autoscaleRuleSlice.reducer;