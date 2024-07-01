import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MachineGroupPayload {
    name: string;
    numberOfMachines: number;
    numberOfScaleUnits: number;
    sku: string;
    customProperties: string;
  }
  
const machineGroupSlice2 = createSlice({
    name: 'machineGroups2',
    initialState: [] as MachineGroupPayload[],
    reducers: {
        putMachineGroups2(state, action: PayloadAction<MachineGroupPayload[]>) {
            return action.payload;
        },
    },
});

export const { putMachineGroups2 } = machineGroupSlice2.actions;

export default machineGroupSlice2.reducer;