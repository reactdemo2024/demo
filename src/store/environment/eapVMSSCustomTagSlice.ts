import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VMSSCustomTag } from "../../interface/environment/vmss-custom-tag.interface";

export interface VMSSCustomTagPayload extends VMSSCustomTag {
    id: string;
}

const eapVMSSCustomTagSlice = createSlice({
    name: 'eapVMSSCustomTags',
    initialState: [] as VMSSCustomTagPayload[],
    reducers: {
        putEapVMSSCustomTags(state, action: PayloadAction<VMSSCustomTagPayload[]>) {
            return action.payload;
        },
    },
});

export const { putEapVMSSCustomTags } = eapVMSSCustomTagSlice.actions;

export default eapVMSSCustomTagSlice.reducer;