import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OsType } from "../../enum/environment.enum";

export interface CustomVMSSExtensionPayload {
    id: number;
    name?: string;
    type?: string;
    publisher?: string;
    typeHandlerVersion?: string;
    autoUpgradeMinorVersion?: boolean;
    forceUpdateTag?: string;
    settings?: string;
    osType?: OsType;
    machineFunction?: string;
}

const customVMSSExtensionSlice = createSlice({
    name: 'customVMSSExtensions',
    initialState: [] as CustomVMSSExtensionPayload[],
    reducers: {
        putCustomVMSSExtensions(state, action: PayloadAction<CustomVMSSExtensionPayload[]>) {
            return action.payload;
        },
    },
});

export const { putCustomVMSSExtensions } = customVMSSExtensionSlice.actions;

export default customVMSSExtensionSlice.reducer;