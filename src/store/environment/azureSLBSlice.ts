import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AzureSLBPayload {
    id: number;
    name: string;
    machineFunction: string;
    numberOfIPs: string;
    outboundRules: string[];
}

const azureSLBSlice = createSlice({
    name: 'azureSLBs',
    initialState: [] as AzureSLBPayload[],
    reducers: {
        putAzureSLBs(state, action: PayloadAction<AzureSLBPayload[]>) {
            return action.payload;
        },
    },
});

export const { putAzureSLBs } = azureSLBSlice.actions;

export default azureSLBSlice.reducer;