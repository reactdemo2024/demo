// import { MetricAggregation, MetricSource, Operator, SamplingType, ScaleDirection, ScaleType } from './allocation.enum';

// export const AutoscaleMetric_PercentCPU: AutoscaleMetric = {
//     name: 'PercentCPU',
//     metricSource: MetricSource.MDM,
//     metricAccount: '',
//     metricNamespace: '',
//     metricName: '',
//     samplingType: SamplingType.AVERAGE,
//     metricAggregation: MetricAggregation.AVERAGE,
//     metricIncludeFilters: '__MachineFunction:##AutoscaleMachineFunction##|__Environment:{@Environment}',
//     metricExcludeFilters: 'Ignore:Ignore'
// }

// export const AutoscaleRule_Cpu75: AutoscaleRule = {
//     name: 'Cpu75',
//     timeWindow: '00:05:00',
//     metric: AutoscaleMetric_PercentCPU,
//     operator: Operator.GREATER_THAN,
//     threshold: 75,
//     scaleDirection: ScaleDirection.INCREASE,
//     scaleType: ScaleType.PERCENT_CHANGE_COUNT,
//     scaleValue: 220,
//     minScaleValue: 14,
//     cooldown: '00:05:00',
// }

// export const AutoscaleRule_Cpu60: AutoscaleRule = {
//     name: 'Cpu60',
//     timeWindow: '00:10:00',
//     metric: AutoscaleMetric_PercentCPU,
//     operator: Operator.GREATER_THAN,
//     threshold: 60,
//     scaleDirection: ScaleDirection.INCREASE,
//     scaleType: ScaleType.PERCENT_CHANGE_COUNT,
//     scaleValue: 170,
//     minScaleValue: 10,
//     cooldown: '00:10:00',
// }

// export const AutoscaleRule_Cpu45: AutoscaleRule = {
//     name: 'Cpu45',
//     timeWindow: '00:20:00',
//     metric: AutoscaleMetric_PercentCPU,
//     operator: Operator.GREATER_THAN,
//     threshold: 45,
//     scaleDirection: ScaleDirection.INCREASE,
//     scaleType: ScaleType.PERCENT_CHANGE_COUNT,
//     scaleValue: 125,
//     minScaleValue: 6,
//     cooldown: '01:00:00',
// }

// export const AutoscaleRule_Cpu25: AutoscaleRule = {
//     name: 'Cpu25',
//     timeWindow: '00:20:00',
//     metric: AutoscaleMetric_PercentCPU,
//     operator: Operator.LESS_THAN,
//     threshold: 25,
//     scaleDirection: ScaleDirection.DECREASE,
//     scaleType: ScaleType.PERCENT_CHANGE_COUNT,
//     scaleValue: 80,
//     cooldown: '00:20:00',
// }

// export const autoscaleRulePlaceholderText: string = `
// [AutoscaleRule_Foo]
// TimeWindow=00:05:00
// Metric=MetricExample
// Operator=GreaterThan
// Threshold=75
// ScaleDirection=Increase
// ScaleType=PercentChangeCount
// ScaleValue=220
// MinScaleValue=14
// Cooldown=00:05:00
// `;

// export const autoscaleRuleCpu75: string = `
// [AutoscaleRule_Cpu75]
// TimeWindow=00:05:00
// Metric=PercentCPU
// Operator=GreaterThan
// Threshold=75
// ScaleDirection=Increase
// ScaleType=PercentChangeCount
// ScaleValue=220
// MinScaleValue=14
// Cooldown=00:05:00
// `;

// export const autoscaleRuleCpu60: string = `
// [AutoscaleRule_Cpu60]
// TimeWindow=00:10:00
// Metric=PercentCPU
// Operator=GreaterThan
// Threshold=60
// ScaleDirection=Increase
// ScaleType=PercentChangeCount
// ScaleValue=170
// MinScaleValue=10
// Cooldown=00:10:00
// `;

// export const autoscaleRuleCpu45: string = `
// [AutoscaleRule_Cpu45]
// TimeWindow=00:20:00
// Metric=PercentCPU
// Operator=GreaterThan
// Threshold=45
// ScaleDirection=Increase
// ScaleType=PercentChangeCount
// ScaleValue=125
// MinScaleValue=6
// Cooldown=01:00:00
// `;

// export const autoscaleRuleCpu25: string = `
// [AutoscaleRule_Cpu25]
// TimeWindow=00:20:00
// Metric=PercentCPU
// Operator=LessThan
// Threshold=25
// ScaleDirection=Decrease
// ScaleType=PercentChangeCount
// ScaleValue=80
// Cooldown=00:20:00
// `;

export const autoscaleMetricPercentCPU: string = `
[AutoscaleMetric_PercentCPU]
MetricSource=MDM
MetricAccount=<MDM_Account>
MetricNamespace=<MDM_Namespace>
MetricName=Processor\% Processor Time
SamplingType=Average
MetricAggregation=Average
MetricIncludeFilters=__MachineFunction:##AutoscaleMachineFunction##|__Environment:{@Environment}
MetricExcludeFilters=Ignore:Ignore
`;