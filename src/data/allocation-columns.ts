import { MetricAggregation, Operator, SamplingType, ScaleDirection, ScaleType } from "../enum/allocation.enum";
import { TooltipText } from "../enum/environment.enum";
import store from "../store/store";

const state = store.getState();

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
        renderHeader: {
            text: TooltipText.MACHINE_GROUPS
        }
    },
    {
        field: 'autoscaleProfiles',
        headerName: 'List of Autoscale Profiles',
        renderHeader: {
            text: TooltipText.AUTOSCALE_PROFILES
        }
    },
    {   
        field: 'customProperties',
        headerName: 'Custom Properties',
        width: 300,
        renderHeader: {
            text: TooltipText.CUSTOM_PROPERTIES
        }
    },
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
    {   
        field: 'customProperties',
        headerName: 'Custom Properties',
        width: 300,
        renderHeader: {
            text: TooltipText.CUSTOM_PROPERTIES
        }
    },
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
        renderHeader: {
            text: TooltipText.AUTOSCALE_RULES
        }
    },
    {   
        field: 'customProperties',
        headerName: 'Custom Properties',
        width: 300,
        renderHeader: {
            text: TooltipText.CUSTOM_PROPERTIES
        }
    },
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
        // type: 'singleSelect',
        // valueOptions: state.autoscaleMetrics.map(metric => ({ name: metric.name })),
        renderHeader: {
            text: TooltipText.AUTOSCALE_METRIC
        }
    },
    {   
        field: 'customProperties',
        headerName: 'Custom Properties',
        width: 300,
        renderHeader: {
            text: TooltipText.CUSTOM_PROPERTIES
        }
    },
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
    {   
        field: 'customProperties',
        headerName: 'Custom Properties',
        width: 300,
        renderHeader: {
            text: TooltipText.CUSTOM_PROPERTIES
        }
    },
];