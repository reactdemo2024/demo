import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SubscriptionPayload {
    id: string;
    subscriptionIds?: string;
    environment?: string;
    cluster?: string;
    customProperties: string;
}

const subscriptionSlice = createSlice({
    name: 'subscriptions',
    initialState: [] as SubscriptionPayload[],
    reducers: {
        putSubscriptions(state, action: PayloadAction<SubscriptionPayload[]>) {
            return action.payload;
        },
    },
});

export const { putSubscriptions } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;