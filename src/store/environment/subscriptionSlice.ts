import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Subscription } from "../../interface/environment/subscription.interface";

export interface SubscriptionPayload extends Subscription {
    id: string;
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