import { OsType } from "../../enum/environment.enum";

export interface CustomVMSSExtension {
    name?: string;
    type?: string;
    publisher?: string;
    typeHandlerVersion?: string;
    autoUpgradeMinorVersion?: boolean;
    forceUpdateTag?: string;
    settings?: string; // json string = textarea, only single line json string
    osType?: OsType;
    machineFunction?: string; // comma separated machine functions
}

/**
 * [CustomVMSSExtension.MMAExtension]
 * Type=MicrosoftMonitoringAgent
 * Publisher=Microsoft.EnterpriseCloud.Monitoring
 * TypeHandlerVersion=1.0
 * AutoUpgradeMinorVersion=true
 * Settings={ "workspaceId" : "de314cc0-ed74-42a8-b104-8d18f309a76b" }
 * MachineFunction=*,!MF1
 * 
 * [CustomVMSSExtension.DAExtension]
 * Type=DependencyAgentWindows
 * Publisher=Microsoft.Azure.Monitoring.DependencyAgent
 * TypeHandlerVersion=9.5
 * MachineFunction=MF2,MF4,MF5
 * 
 */