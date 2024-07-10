import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MachineFunctionPayload {
    id: string;
    name: string;
    numberOfMachines: number;
    numberOfScaleUnits: number;
    sku: string;
    enableAutoScale: boolean;
    machineGroups: string;
    autoscaleProfiles: string;
    customProperties: string;
}
  
const machineFunctionSlice = createSlice({
    name: 'machineFunctions',
    initialState: [] as MachineFunctionPayload[],
    reducers: {
        putMachineFunctions(state, action: PayloadAction<MachineFunctionPayload[]>) {
            return action.payload;
        },
    },
});

export const { putMachineFunctions } = machineFunctionSlice.actions;

export default machineFunctionSlice.reducer;