import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CustomVMSSTagPayload {
    id: number;
    jsonName: string;
    machineFunctionName: string;
    machineGroupName: string;
}

const customVMSSTagSlice = createSlice({
    name: 'customVMSSTags',
    initialState: [] as CustomVMSSTagPayload[],
    reducers: {
        putCustomVMSSTags(state, action: PayloadAction<CustomVMSSTagPayload[]>) {
            return action.payload;
        },
    },
});

export const { putCustomVMSSTags } = customVMSSTagSlice.actions;

export default customVMSSTagSlice.reducer;