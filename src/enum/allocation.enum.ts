export enum AllocationType {
    AZURE_VM = 'AzureVM'
}

export enum EapV2 {
    EAP_V2 = 'true'
}

export enum PlacementConstraint {
    BANDWIDTH_AFFINITIZED = "BandwidthAffinitized",
    FAULT_DOMAIN_STRIPED = "FaultDomainStriped"
}

export enum Priority {
    REAL_TIME = "RealTime",
    BEST_EFFORT = "BestEffort"
}

export enum ScaleUnitOption {
    NUMBER_OF_SCALE_UNITS = "numberOfScaleUnits",
    MACHINES_PER_SCALE_UNIT = "machinesPerScaleUnit"
}

export enum ProfileType {
    METRIC_BASED = 'MetricBased'
}

export enum Operator {
    GREATER_THAN = 'GreaterThan',
    LESS_THAN = 'LessThan'
}

export enum ScaleDirection {
    INCREASE = 'Increase',
    DECREASE = 'Decrease'
}

export enum ScaleType {
    CHANGE_COUNT = 'ChangeCount',
    PERCENT_CHANGE_COUNT = 'PercentChangeCount'
}

export enum MetricSource {
    MDM = 'MDM'
}

export enum SamplingType {
    AVERAGE = 'Average',
    COUNT = 'Count',
    SUM = 'Sum',
    MIN = 'Min',
    MAX = 'Max',
    PERCENTILE_50TH = 'Percentile50th',
    PERCENTILE_75TH = 'Percentile75th',
    PERCENTILE_90TH = 'Percentile90th',
    PERCENTILE_95TH = 'Percentile95th',
    PERCENTILE_9999TH = 'Percentile9999th',
    PERCENTILE_999TH = 'Percentile999th',
    PERCENTILE_99TH = 'Percentile99th'
}

export enum MetricAggregation {
    AVERAGE = 'Average',
    COUNT = 'Count',
    SUM = 'Sum',
    MIN = 'Min',
    MAX = 'Max'
}