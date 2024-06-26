import { ACLs } from "./acls.interface";
import { AzureComputeManager } from "./azure-compute-manager.interface";
import { Certificates } from "./certificates.interface";
import { ComputeAllocation } from "./compute-allocation.interface";
import { CustomVMSSExtension } from "./custom-vmss-extension.interface";
import { DeviceManager } from "./device-manager.interface";
import { DiskInfo } from "./disk-info.interface";
import { DMCommandACLs } from "./dm-command-acls.interface.";
import { Domainless } from "./domainless.interface";
import { DynamicAccessAdministrators } from "./dynamic-access-administrators.interface";
import { FSServer, FSServerReadAccess } from "./fsserver.interface";
import { General } from "./general.interface";
import { MachineLocalWatchdogFolderSizeWDWatchedFolders, MachineLocalWatchdogPrintCallStack } from "./machine-local-watchdog.interface";
import { MaintenanceDelayTime } from "./maintenance-delay-time.interface";
import { SearchGoldAccess } from "./search-gold-access.interface";
import { SecurityGroupAccess } from "./security-group-access.interface";
import { ServiceManager } from "./service-manager.interface";
import { ServiceRollout } from "./service-rollout.interface";

/**
 * Gives the interface configuration for environment.ini
 * 
 */
export interface EnvironmentConfiguration {
    // general: General;
    // serviceRollout: ServiceRollout;
    // serviceManager: ServiceManager;
    // fsserver: FSServer;
    // fsserverReadAccess: FSServerReadAccess;
    // securityGroupAccess: SecurityGroupAccess;
    // domainless: Domainless;
    // machineLocalWatchdogPrintCallStack: MachineLocalWatchdogPrintCallStack;
    // MachineLocalWatchdogFolderSizeWDWatchedFolders: MachineLocalWatchdogFolderSizeWDWatchedFolders[];
    // searchGoldAccess: SearchGoldAccess;
    // dmCommandACLs: DMCommandACLs;
    // deviceManager: DeviceManager;
    // maintenanceDelayTime: MaintenanceDelayTime;
    // diskInfo: DiskInfo;
    // computeAllocation: ComputeAllocation;
    // dynamicAccessAdministrators: DynamicAccessAdministrators;
    // certificates: Certificates;
    // acls: ACLs;
    azureComputeManager: AzureComputeManager;
    // customVMSSExtension: CustomVMSSExtension[];
    // diskProfiles: DiskProfile[];
}