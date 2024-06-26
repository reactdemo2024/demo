import { AllocationType, Default, PlacementConstraint, Priority } from "../../enum/allocation.enum";
import { AutoscaleProfile } from "./autoscale-profile.interface";
import { MachineGroup } from "./machine-group.interface";

/**
 * gives the configuration for [MachineFunction_MyEapMf]
 * 
 * [MachineFunction_MyEapMf] 
 * NumberOfMachines=10
 * AllocationType=AzureVM
 * SKU=Standard_D4s_v3
 * 
 */
export interface MachineFunction {
    name: string; 
    numberOfScaleUnits?: number; // constraint: machinesPerScaleUnit
    machinesPerScaleUnit?: number; // constraint: numberOfScaleUnits
    allocationType: AllocationType;
    placementConstraint?: PlacementConstraint;
    customAttributeScaleUnit?: string;
    customAttributeFormatString?: string;
    priority?: Priority;
    isSectionDeleted?: boolean;
    startingScaleUnit?: number;
    scaleUnitIncrement?: number;

    // does not use machineGroups
    numberOfMachines?: number;
    sku?: string;
    requestedNodeLabels?: string;

    // name of machine groups selected
    machineGroups?: string[];

    // uses autoScaleProfiles
    autoscaleProfiles?: AutoscaleProfile[];
}