import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MachineGroup } from "../../interface/allocation/machine-group.interface";

const machineGroupSlice = createSlice({
    name: 'machineGroups',
    initialState: [] as MachineGroup[],
    reducers: {
        putMachineGroup(state, action: PayloadAction<MachineGroup>) {
            const machineGroupName = action.payload.name;
            const index = state.findIndex(mg => mg.name === machineGroupName);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        },
        deleteMachineGroup(state, action: PayloadAction<string>) {
            const machineGroupName = action.payload;
            const index = state.findIndex(mg => mg.name === machineGroupName);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const { putMachineGroup, deleteMachineGroup } = machineGroupSlice.actions;

export default machineGroupSlice.reducer;