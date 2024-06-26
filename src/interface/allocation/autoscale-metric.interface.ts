import { MetricAggregation, MetricSource, SamplingType } from "../../enum/allocation.enum";

export interface AutoscaleMetric {
    name: string;
    metricSource: MetricSource.MDM;
    metricAccount: string;
    metricNamespace: string;
    metricName: string;
    samplingType: SamplingType;
    metricAggregation: MetricAggregation;
    metricIncludeFilters: string;
    metricExcludeFilters: string;
    minValidDatapointsPercentage?: number; // default=90 ; (0, 100)
}