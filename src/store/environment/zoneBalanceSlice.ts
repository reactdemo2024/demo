import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ZoneBalance } from "../../interface/environment/zone-balance.interface";

export interface ZoneBalancePayload extends ZoneBalance {
    id: string;
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