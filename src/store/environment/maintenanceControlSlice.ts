import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const maintenanceControlSlice = createSlice({
    name: 'maintenanceControl',
    initialState: '',
    reducers: {
        putMaintenanceControl(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { putMaintenanceControl } = maintenanceControlSlice.actions;

export default maintenanceControlSlice.reducer;