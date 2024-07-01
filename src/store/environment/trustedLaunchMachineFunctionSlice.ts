import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const trustedLaunchMachineFunctionSlice = createSlice({
    name: 'trustedLaunchMachineFunctions',
    initialState: '',
    reducers: {
        putTrustedLaunchMachineFunctions(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { putTrustedLaunchMachineFunctions } = trustedLaunchMachineFunctionSlice.actions;

export default trustedLaunchMachineFunctionSlice.reducer;