import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ZoneBalancePayload {
    id: string;
    machineFunctionName: string;
    enabled: boolean;
}

const zoneBalanceSlice = createSlice({
    name: 'zoneBalances',
    initialState: [] as ZoneBalancePayload[],
    reducers: {
        putZoneBalances(state, action: PayloadAction<ZoneBalancePayload[]>) {
            return action.payload;
        },
    },
});

export const { putZoneBalances } = zoneBalanceSlice.actions;

export default zoneBalanceSlice.reducer;