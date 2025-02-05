import { PayloadAction, createSlice } from "@reduxjs/toolkit";
  
const environmentPreviewSlice = createSlice({
    name: 'environmentPreview',
    initialState: '',
    reducers: {
        putEnvironmentPreview(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { putEnvironmentPreview } = environmentPreviewSlice.actions;

export default environmentPreviewSlice.reducer;