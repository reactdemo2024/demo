import { MachineFunction } from "./machine-function.interface";

/**
 * Gives the interface configuration for allocation.ini
 * 
 */
export interface AllocationConfiguration {
    computeDefinition: ComputeDefinition;
    machineFunctions: MachineFunction[];
}

/**
 * Gives the interface configuration for [ComputeDefinition]
 * 
 * [ComputeDefinition]
 * MachineFunctions=MyEapMf
 * 
 */
export interface ComputeDefinition {
    subscriptionId?: string;
    sku?: string;
    requestedNodeLabels?: string;
}

/**
 * [ComputeDefinition]
MachineFunctions=d4,dualstack2,ipv4only

[MachineFunction_ipv4only]
NumberOfMachines=1
NumberOfScaleUnits=1
Sku=Standard_D2_v3

[MachineFunction_dualstack2]
NumberOfMachines=1
NumberOfScaleUnits=1
Sku=Standard_D2_v3

[MachineFunction_d4]
NumberOfMachines=1
NumberOfScaleUnits=1
Sku=Standard_D2_v4
 */