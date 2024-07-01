import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const acceleratedNetworkingInPlaceUpdateSlice = createSlice({
    name: 'acceleratedNetworkingInPlaceUpdate',
    initialState: '',
    reducers: {
        putAcceleratedNetworkingInPlaceUpdate(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { putAcceleratedNetworkingInPlaceUpdate } = acceleratedNetworkingInPlaceUpdateSlice.actions;

export default acceleratedNetworkingInPlaceUpdateSlice.reducer;