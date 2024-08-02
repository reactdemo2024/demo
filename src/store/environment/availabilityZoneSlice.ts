import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AvailabilityZonePayload {
    availabilityZone: string;
    availabilityZones: AvailabilityZonesPayload[];
}

export interface AvailabilityZonesPayload {
    id: string;
    machineFunctionName: string;
    availabilityZone: string;
}

const availabilityZoneSlice = createSlice({
    name: 'availabilityZones',
    initialState: {} as AvailabilityZonePayload,
    reducers: {
        putAvailabilityZone(state, action: PayloadAction<string>) {
            state.availabilityZone = action.payload;
            state.availabilityZones = [];
        },
        putAvailabilityZones(state, action: PayloadAction<AvailabilityZonesPayload[]>) {
            state.availabilityZones = action.payload;
            state.availabilityZone = '';
        }
    },
});

export const { putAvailabilityZone, putAvailabilityZones } = availabilityZoneSlice.actions;

export default availabilityZoneSlice.reducer;