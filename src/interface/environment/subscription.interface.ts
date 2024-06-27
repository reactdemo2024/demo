import { EnvType } from "../../enum/environment.enum";

export interface Subscription {
    subscriptionIds?: string;
    environment?: string;
    cluster?: string;
    autopilotEnvType?: EnvType;
}

/**
 * 4 ways to configure subscriptions
 * depending on what is filled, will change formatting
 * 
 * environment level subscription
 * There are 4 options for subscription configuration and will be formatted based on the filled inputs.
 * option 1: SubscriptionIds=<<Replace with comma separated subscription guid>>
 * option 2: Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>> 
 * option 3: Cluster:<<Cluster name>>,Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>> 
 * option 4: Cluster:<<Cluster name>>,AutopilotEnvType:<<Environment type>>$SubscriptionIds=<<Replace with comma separated subscription guid>>
 * 
 */