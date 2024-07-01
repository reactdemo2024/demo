import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const acceleratedNetworkingEnabledMachineFunctionSlice = createSlice({
    name: 'acceleratedNetworkingEnabledMachineFunctions',
    initialState: '',
    reducers: {
        putAcceleratedNetworkingEnabledMachineFunctions(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { putAcceleratedNetworkingEnabledMachineFunctions } = acceleratedNetworkingEnabledMachineFunctionSlice.actions;

export default acceleratedNetworkingEnabledMachineFunctionSlice.reducer;