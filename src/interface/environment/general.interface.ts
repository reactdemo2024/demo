import { Type } from "typescript";

export interface General {
    contact: string; // Contact=<emailAddress>
    property: Property; // Property=<Organization>.<FeatureTeam>.Loaned=<yes|no>
    group: string; // Group=<group>
    team: string // Team=<team>
    feature: string; // Feature=<feature>
    manaTree: string; // ManaTree=<manaTree>
    serviceTreeId: string; 
    // ​ServiceTreeId_<machineFunction>=<servicetree service GUID> or ServiceTreeId=<serviceTreeId>

    // optional
    created?: string; // Created=<date> ; mm/dd/yyyy
    expiryDate?: string; // ExpiryDate=<date> ; mm/dd/yyyy
    type?: Type; // Type=<Production|INT|PPE|Test|Dev|Sandbox>
    codeBranch?: string; // CodeBranch=<date> ; mm/dd/yyyy
    cosmosWebServerUrl?: string; // CosmosWebServerUrl=http://<url>
    cosmosUrl?: string; // CosmosUrl=cosmos://<clusterPrefix>
    searchUrl?: string; // SearchURL=http://<url>
    searchDebugUrl?: string; // SearchDebugURL=http://<url>
    driTeam?: string; // DriTeam=<team>
    metricTenant?: string; // MetricTenant=<tenant>
}

export interface Property {
    organization: string;
    featureTeam: string;
    loaned: boolean;
}