import { Subscription } from "react-redux";
import { AvailabilityZones } from "./availability-zones.interface";
import { ZoneBalance } from "./zone-balance.interface";
import { VMSSCustomTag } from "./vmss-custom-tag.interface";

export interface AzureComputeManager {
    availabilityZones?: AvailabilityZones;
    zoneBalance?: ZoneBalance[];
    
    // EnableAzureMaintenanceControl=MF1,MF2 ; Azure maintenance control is enabled for MF1 and MF2.
    // EnableAzureMaintenanceControl=* ; Azure maintenance control is enabled for all machine functions in the environment
    enableAzureMaintenanceControl?: string; // all or specific MFs
    subscriptions: Subscription[];
    encryptionAtHost?: string; // mfs: EncryptionAtHost=MF1 or all: EncryptionAtHost=*
    regionalIPV4MF?: string; // mfs: RegionalIPV4MF=MF1 or all: RegionalIPV4MF=*
    // EAPVMSS<json file name>=(comma separated)<machineFunction/machineFunction_machineGroup>
    eapVMSSCustomTag?: VMSSCustomTag[];

    msi?: string; // mfs: MSI='/...'

    // TrustedLaunchMachineFunctions=(comma separated)<machineFunction/machineFunction_machineGroup>
    trustedLaunchMachineFunction?: string; // mfs: TrustedLaunchMachineFunction=MF1 or all: TrustedLaunchMachineFunction=*

    // MultipleScaleSetCriteria_<MachineFunctionName>=SKU 
    multipleScaleSetCriteria?: string; // mfs: MultipleScaleSetCriteria_MF1=VMType or all: MultipleScaleSetCriteria=VMType

    // MaxVmsAllowedForMigration=1 or MaxVmsAllowedForMigration_MF1=2
    maxVmsAllowedForMigration?: number | string; 
}

/** for this ui, use the same placeholder tooltip option template
 * but give options to auto paste no mf, with mf, physical, and zone balance
 * 
 * [AzureComputeManager]  
 * AvailabilityZones_MF1=1,2  
 * AvailabilityZones_MF2=3  
 * AvailabilityZones_MF3=AutopilotZone
 * 
 * [AzureComputeManager]  
 * PhysicalAvailabilityZones_MF1=uscentral-AZ01,uscentral-AZ02  
 * PhysicalAvailabilityZones_MF2=uscentral-AZ03
 * 
 * [AzureComputeManager]  
 * Zonebalance_MF1=true  
 * Zonebalance_MF2=false
 * 
 */

// Check the Availability Zones Page : https://docs.microsoft.com/en-us/azure/availability-zones/az-region