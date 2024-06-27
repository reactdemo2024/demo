import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const regionalIPV4Slice = createSlice({
    name: 'regionalIPV4MF',
    initialState: '',
    reducers: {
        putRegionalIPV4MF(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { putRegionalIPV4MF } = regionalIPV4Slice.actions;

export default regionalIPV4Slice.reducer;