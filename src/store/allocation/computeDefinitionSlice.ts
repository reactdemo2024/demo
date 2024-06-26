import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComputeDefinition } from '../../interface/allocation/allocation.interface';

const computeDefinitionSlice = createSlice({
  name: 'computeDefinition',
  initialState: {} as ComputeDefinition,
  reducers: {
    setComputeDefinition(state, action: PayloadAction<ComputeDefinition>) {
      return action.payload;
    },
  },
});

export const { setComputeDefinition } = computeDefinitionSlice.actions;

export default computeDefinitionSlice.reducer;