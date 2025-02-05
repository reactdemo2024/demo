import { PayloadAction, createSlice } from "@reduxjs/toolkit";
  
const allocationPreviewSlice = createSlice({
    name: 'allocationPreview',
    initialState: '',
    reducers: {
        putAllocationPreview(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { putAllocationPreview } = allocationPreviewSlice.actions;

export default allocationPreviewSlice.reducer;