import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MachineGroupPayload {
    id: string;
    name: string;
    numberOfMachines: number;
    numberOfScaleUnits: number;
    sku: string;
    customProperties: string;
  }
  
const machineGroupSlice = createSlice({
    name: 'machineGroups',
    initialState: [] as MachineGroupPayload[],
    reducers: {
        putMachineGroups(state, action: PayloadAction<MachineGroupPayload[]>) {
            return action.payload;
        },
    },
});

export const { putMachineGroups } = machineGroupSlice.actions;

export default machineGroupSlice.reducer;