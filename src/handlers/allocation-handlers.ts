import { MetricAggregation, Operator, SamplingType, ScaleDirection, ScaleType } from "../enum/allocation.enum";
import { AutoscaleMetricPayload } from "../store/allocation/autoscaleMetricSlice";
import { AutoscaleProfilePayload } from "../store/allocation/autoscaleProfileSlice";
import { AutoscaleRulePayload } from "../store/allocation/autoscaleRuleSlice";
import { MachineFunctionPayload } from "../store/allocation/machineFunctionSlice";
import { MachineGroupPayload } from "../store/allocation/machineGroupSlice";

// TODO: add custom properties handler too all that need

export const machineFunctionPropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<MachineFunctionPayload>
    ) => void;
} = {
    NumberOfMachines: (value, payload) =>
        (payload.numberOfMachines = value),
    NumberOfScaleUnits: (value, payload) =>
        (payload.numberOfScaleUnits = value),
    Sku: (value, payload) => (payload.sku = value),
    EnableAutoScale: (value, payload) =>
        (payload.enableAutoScale = value.toLowerCase() === 'true'),
    MachineGroups: (value, payload) =>
        (payload.machineGroups = value.split(',')),
    AutoscaleProfiles: (value, payload) =>
        (payload.autoscaleProfiles = value.split(',')),
};

export const machineGroupPropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<MachineGroupPayload>
    ) => void;
} = {
    NumberOfMachines: (value, payload) =>
        (payload.numberOfMachines = value),
    NumberOfScaleUnits: (value, payload) =>
        (payload.numberOfScaleUnits = value),
    Sku: (value, payload) => (payload.sku = value),
};

export const autoscaleProfilePropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<AutoscaleProfilePayload>
    ) => void;
} = {
    MinMachineCount: (value, payload) =>
        (payload.minMachineCount = value),
    DefaultMachineCount: (value, payload) =>
        (payload.defaultMachineCount = value),
    MaxMachineCount: (value, payload) => (payload.maxMachineCount = value),
    AutoscaleRules: (value, payload) =>
        (payload.autoscaleRules = value.split(',')),
};

export const autoscaleRulePropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<AutoscaleRulePayload>
    ) => void;
} = {
    TimeWindow: (value, payload) =>
        (payload.timeWindow = value),
    Operator: (value, payload) =>
        (payload.operator = value as Operator),
    Threshold: (value, payload) => (payload.threshold = value),
    ScaleDirection: (value, payload) =>
        (payload.scaleDirection = value as ScaleDirection),
    ScaleType: (value, payload) => (payload.scaleType = value as ScaleType),
    ScaleValue: (value, payload) => (payload.scaleValue = value),
    Cooldown: (value, payload) => (payload.cooldown = value),
    Metric: (value, payload) => (payload.metric = value),
};

export const autoscaleMetricPropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<AutoscaleMetricPayload>
    ) => void;
} = {
    MetricAccount: (value, payload) =>
        (payload.metricAccount = value),
    MetricNamespace: (value, payload) =>
        (payload.metricNamespace = value),
    SamplingType: (value, payload) => (payload.samplingType = value as SamplingType),
    MetricAggregation: (value, payload) =>
        (payload.metricAggregation = value as MetricAggregation),
    MetricIncludeFilters: (value, payload) => (payload.metricIncludeFilters = value),
    MetricExcludeFilters: (value, payload) => (payload.metricExcludeFilters = value),
};