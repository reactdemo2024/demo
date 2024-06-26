export interface MaintenanceDelayTime {
    destructiveMaintenance: number | string;
    nonDestructiveMaintenance: number | string;
}

// DestructiveMaintenance=<delayTime> OR DestructiveMaintenance_<MachineFunction>=<delayTime>