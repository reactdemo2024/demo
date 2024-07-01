import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CustomVMSSExtension } from "../../interface/environment/custom-vmss-extension.interface";

export interface CustomVMSSExtensionPayload extends CustomVMSSExtension {
    id: number;
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