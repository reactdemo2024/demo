import { AzureComputeManager } from "./azure-compute-manager.interface";

/**
 * Gives the interface configuration for environment.ini
 * 
 */
export interface EnvironmentConfiguration {
    azureComputeManager: AzureComputeManager;
    // customVMSSExtension: CustomVMSSExtension[];
    // diskProfiles: DiskProfile[];
}