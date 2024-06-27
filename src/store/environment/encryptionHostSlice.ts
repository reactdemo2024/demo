import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const encryptionHostSlice = createSlice({
    name: 'encryptionAtHost',
    initialState: '',
    reducers: {
        putEncryptionAtHost(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { putEncryptionAtHost } = encryptionHostSlice.actions;

export default encryptionHostSlice.reducer;