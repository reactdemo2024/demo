/**
 * Gives the interface configuration for [MachineGroup_UniqueName]
 */
export interface MachineGroup {
    name?: string;
    numberOfMachines?: number;
    numberOfScaleUnits?: number;
    sku?: string;
    customInput?: string;
    // allocationType?: Default.ALLOCATION_TYPE;
    // eapV2: boolean; // always true
}