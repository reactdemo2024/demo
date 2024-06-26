import { Default, ProfileType } from "../../enum/allocation.enum";
import { AutoscaleRule } from "./autoscale-rule.interface";

export interface AutoscaleProfile {
    name: string;
    profileType: ProfileType; // AzureVM only uses MetricBased
    minMachineCount: number; // (0, defaultMachineCount]
    defaultMachineCount: number; // [minMachineCount, maxMachineCount]
    maxMachineCount: number; // [defaultMachineCount, 3000)
    autoscaleRules: AutoscaleRule[];

    // are these optional??
    maxCPUForSafeScaleDown?: number | Default.MAX_CPU_FOR_SAFE_SCALE_DOWN; // default=90 ; [20, 90)
    lookbackForSafeScaleDownInDays?: number; // [1, 14]
}