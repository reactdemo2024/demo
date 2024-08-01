import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OutboundRulePayload {
    id: number;
    name: string;
    allocatedOutboundPorts: string;
    idleTimeoutInMinutes: string;
    enableTcpReset: boolean;
    protocol: string;
}

const outboundRuleSlice = createSlice({
    name: 'outboundRules',
    initialState: [] as OutboundRulePayload[],
    reducers: {
        putOutboundRules(state, action: PayloadAction<OutboundRulePayload[]>) {
            return action.payload;
        },
    },
});

export const { putOutboundRules } = outboundRuleSlice.actions;

export default outboundRuleSlice.reducer;