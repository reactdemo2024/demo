import { Operator, ScaleDirection, ScaleType } from "../../enum/allocation.enum";
import { AutoscaleMetric } from "./autoscale-metric.interface";

export interface AutoscaleRule {
    name: string;
    timeWindow: string; // HH:mm:ss [00:05:00, 12:00:00]
    metric: AutoscaleMetric | string; // [AutoscaleMetric_Name]
    operator: Operator;
    threshold: number;
    scaleDirection: ScaleDirection;
    scaleType: ScaleType;
    scaleValue: number; // PercentChangeCount=[50, 300] ; ChangeCount=[1, 100]
    minScaleValue?: number; // [0, n]
    cooldown: string; // HH:mm:ss [00:05:00, 06:00:00]
    enableDynamicMinMachineCount?: boolean; // default=true
}