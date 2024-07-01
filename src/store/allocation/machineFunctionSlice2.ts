import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MachineFunctionPayload {
    name: string;
    numberOfMachines: number;
    numberOfScaleUnits: number;
    sku: string;
    enableAutoScale: boolean;
    machineGroups: string;
    autoscaleProfiles: string;
    customProperties: string;
  }
  
const machineFunctionSlice2 = createSlice({
    name: 'machineFunctions2',
    initialState: [] as MachineFunctionPayload[],
    reducers: {
        putMachineFunctions2(state, action: PayloadAction<MachineFunctionPayload[]>) {
            return action.payload;
        },
    },
});

export const { putMachineFunctions2 } = machineFunctionSlice2.actions;

export default machineFunctionSlice2.reducer;