import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DiskProfilePayload {
    name: string;
    machineFunctions: string;
    cDiskSize: string;
    cStorageAccountType: string;
    dDiskSize: string;
    dStorageAccountType: string;
    dCachingType: string;
    dIsPersistent: boolean;
    eDiskSize: string;
    eStorageAccountType: string;
    eCachingType: string;
    eIsPersistent: boolean;
    customProperties: string;
}

const diskProfileSlice = createSlice({
    name: 'diskProfiles',
    initialState: [] as DiskProfilePayload[],
    reducers: {
        putDiskProfiles(state, action: PayloadAction<DiskProfilePayload[]>) {
            return action.payload;
        },
    },
});

export const { putDiskProfiles } = diskProfileSlice.actions;

export default diskProfileSlice.reducer;