import { customPropertiesColumn } from "../components/Common";
import { MetricAggregation, Operator, SamplingType, ScaleDirection, ScaleType } from "../enum/allocation.enum";
import { TooltipText } from "../enum/common.enum";

export const machineFunctionColumns = [
    {
        field: 'name',
        headerName: 'Name of Machine Function',
    },
    {
        field: 'numberOfMachines',
        headerName: 'Number of Machines',
    },
    {
        field: 'numberOfScaleUnits',
        headerName: 'Number of Scale Units',
    },
    {
        field: 'sku',
        headerName: 'SKU',
    },
    {
        field: 'enableAutoScale',
        type: 'boolean',
        headerName: 'Enable Auto Scale?',
    },
    {
        field: 'machineGroups',
        headerName: 'List of Machine Groups',
        type: 'multiSelect',
        valueOptions: {
            reducer: 'machineGroups',
        },
        renderHeader: {
            text: TooltipText.MULTI_SELECT_OPTIONS
        },
    },
    {
        field: 'autoscaleProfiles',
        headerName: 'List of Autoscale Profiles',
        type: 'multiSelect',
        valueOptions: {
            reducer: 'autoscaleProfiles',
        },
        renderHeader: {
            text: TooltipText.MULTI_SELECT_OPTIONS
        }
    },
    ...customPropertiesColumn
];

export const machineGroupColumns = [
    {
        field: 'name',
        headerName: 'Name of Machine Group',
    },
    {
        field: 'numberOfMachines',
        headerName: 'Number of Machines',
    },
    {
        field: 'numberOfScaleUnits',
        headerName: 'Number of Scale Units',
    },
    {
        field: 'sku',
        headerName: 'SKU',
    },
    ...customPropertiesColumn
];

export const autoscaleProfileColumns = [
    {
        field: 'name',
        headerName: 'Name of Autoscale Profile',
    },
    {
        field: 'minMachineCount',
        headerName: 'Minimum Machine Count',
    },
    {
        field: 'defaultMachineCount',
        headerName: 'Default Machine Count',
    },
    {
        field: 'maxMachineCount',
        headerName: 'Maximum Machine Count',
    },
    {
        field: 'autoscaleRules',
        headerName: 'List of Autoscale Rules',
        type: 'multiSelect',
        valueOptions: {
            reducer: 'autoscaleRules',
        },
        renderHeader: {
            text: TooltipText.MULTI_SELECT_OPTIONS
        },
    },
    ...customPropertiesColumn
];

export const autoscaleRuleColumns = [
    {
        field: 'name',
        headerName: 'Name of Autoscale Rule',
    },
    {
        field: 'timeWindow',
        headerName: 'Time Window',
    },
    {
        field: 'operator',
        headerName: 'Operator',
        type: 'singleSelect',
        valueOptions: Operator,
    },
    {
        field: 'threshold',
        headerName: 'Threshold',
    },
    {
        field: 'scaleDirection',
        headerName: 'Scale Direction',
        type: 'singleSelect',
        valueOptions: ScaleDirection,
    },
    {
        field: 'scaleType',
        headerName: 'Scale Type',
        type: 'singleSelect',
        valueOptions: ScaleType,
    },
    {
        field: 'scaleValue',
        headerName: 'Scale Value',
    },
    {
        field: 'cooldown',
        headerName: 'Cooldown',
    },
    {
        field: 'metric',
        headerName: 'Autoscale Metric',
        type: 'singleSelect',
        valueOptions: {
            reducer: 'autoscaleMetrics',
        },
        renderHeader: {
            text: TooltipText.SINGLE_SELECT_OPTION
        }
    },
    ...customPropertiesColumn
];

export const autoscaleMetricColumns = [
    {
        field: 'name',
        headerName: 'Name of Autoscale Metric',
    },
    {
        field: 'metricAccount',
        headerName: 'Metric Account',
    },
    {
        field: 'metricNamespace',
        headerName: 'Metric Namespace',
    },
    {
        field: 'samplingType',
        headerName: 'Sampling Type',
        type: 'singleSelect',
        valueOptions: SamplingType,
    },
    {
        field: 'metricAggregation',
        headerName: 'Metric Aggregation',
        type: 'singleSelect',
        valueOptions: MetricAggregation,
    },
    {
        field: 'metricIncludeFilters',
        headerName: 'Include Filters',
    },
    {
        field: 'metricExcludeFilters',
        headerName: 'Exclude Filters',
    },
    ...customPropertiesColumn
];