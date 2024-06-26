export interface AvailabilityZones {
    availabilityZone?: string;
    availabilityZones?: AvailabilityZone[];
}

export interface AvailabilityZone { // AvailabilityZones_MF1=1,2 or AvailabilityZones=1,2
    machineFunctionName: string;
    availabilityZone: string;
}