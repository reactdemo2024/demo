import { EnvType, OsType, TooltipText } from "../enum/environment.enum";

export const availabilityZoneColumns = [
    {
        field: 'machineFunctionName',
        headerName: 'Name of Machine Function',
    },
    {
        field: 'availabilityZone',
        headerName: 'Availability Zone',
        renderHeader: {
            text: TooltipText.COMMA_SEPARATED
        }
    },
];

export const zoneBalanceColumns = [
    {
        field: 'machineFunctionName',
        headerName: 'Name of Machine Function',
    },
    {
        field: 'enabled',
        type: 'boolean',
        headerName: 'Enable Zone Balance',
    },
];

export const subscriptionColumns = [
    {
        field: 'subscriptionIds',
        headerName: 'Subscription Ids',
        renderHeader: {
            text: TooltipText.COMMA_SEPARATED,
        }
    },
    {
        field: 'environment',
        headerName: 'Name of Environment',
    },
    {
        field: 'cluster',
        headerName: 'Name of Cluster',
    },
    {
        field: 'autopilotEnvType',
        type: 'singleSelect',
        valueOptions: EnvType,
        headerName: 'Environment Type',
    },
    // {
    //     field: 'customProperties',
    //     headerName: 'Custom Properties',
    //     width: 300,
    //     renderHeader: {
    //         text: TooltipText.CUSTOM_PROPERTIES
    //     }
    // },
];

export const customVMSSTagColumns = [
    {
        field: 'jsonName',
        headerName: 'JSON File',
        renderHeader: {
            text: TooltipText.JSON_EXTENSION
        }
    },
    {
        field: 'machineFunctionName',
        headerName: 'Name of Machine Function',
    },
    {
        field: 'machineGroupName',
        headerName: 'Name of Machine Group',
    },
];

export const customVMSSExtensionColumns = [
    {
        field: 'name',
        headerName: 'Name',
    },
    {
        field: 'type',
        headerName: 'Type',
    },
    {
        field: 'publisher',
        headerName: 'Publisher',
    },
    {
        field: 'typeHandlerVersion',
        headerName: 'Version',
    },
    {
        field: 'autoUpgradeMinorVersion',
        type: 'boolean',
        headerName: 'Auto Upgrade?',
    },
    {
        field: 'forceUpdateTag',
        headerName: 'Force Update Tag',
    },
    {
        field: 'settings',
        headerName: 'Settings',
        renderHeader: {
            text: TooltipText.JSON_FORMAT
        }
    },
    {
        field: 'osType',
        type: 'singleSelect',
        valueOptions: OsType,
        headerName: 'OS Type',
    },
    {
        field: 'machineFunction',
        headerName: 'List of Machine Functions',
        renderHeader: {
            text: TooltipText.COMMA_SEPARATED
        }
    },
];

export const outboundRuleColumns = [
    {
        field: 'name',
        headerName: 'Name',
    },
    {
        field: 'allocatedOutboundPorts',
        headerName: 'Number of Ports',
    },
    {
        field: 'idleTimeoutInMinutes',
        headerName: 'Idle Timeout',
        renderHeader: {
            text: TooltipText.TIME_IN_MINUTES
        }
    },
    {
        field: 'enableTcpReset',
        type: 'boolean',
        headerName: 'Enable TCP Reset?',
    },
    {
        field: 'protocol',
        headerName: 'Protocol Name',
    },
];

export const azureSLBColumns = [
    {
        field: 'name',
        headerName: 'Name',
    },
    {
        field: 'machineFunction',
        headerName: 'Name of Machine Function',
    },
    {
        field: 'numberOfIPs',
        headerName: 'Number of IPs',
    },
    {
        field: 'outboundRules',
        headerName: 'List of Outbound Rule(s)',
        renderHeader: {
            text: TooltipText.COMMA_SEPARATED
        }
    },
];

export const diskProfileColumns = [
    {
        field: 'name',
        headerName: 'Name',
    },
    {
        field: 'machineFunctions',
        headerName: 'List of Machine Functions',
        renderHeader: {
            text: TooltipText.COMMA_SEPARATED
        }
    },
    {
        field: 'cDiskSize',
        headerName: 'Disk Size for C Drive (GiB)',
    },
    {
        field: 'cStorageAccountType',
        headerName: 'Storage Account Type for C Drive',
        renderHeader: {
            text: TooltipText.DISK_PROFILE_STORAGE_ACCOUNT_TYPE
        }
    },
    {
        field: 'dDiskSize',
        headerName: 'Disk Size for D Drive (GiB)',
    },
    {
        field: 'dStorageAccountType',
        headerName: 'Storage Account Type for D Drive',
        renderHeader: {
            text: TooltipText.DISK_PROFILE_STORAGE_ACCOUNT_TYPE
        }
    },
    {
        field: 'dCachingType',
        headerName: 'Caching Type for D Drive',
    },
    {
        field: 'dIsPersistent',
        type: 'boolean',
        headerName: 'Persistent for D Drive?',
    },
    {
        field: 'eDiskSize',
        headerName: 'Disk Size for E Drive (GiB)',
    },
    {
        field: 'eStorageAccountType',
        headerName: 'Storage Account Type for E Drive',
        renderHeader: {
            text: TooltipText.DISK_PROFILE_STORAGE_ACCOUNT_TYPE
        }
    },
    {
        field: 'eCachingType',
        headerName: 'Caching Type for E Drive',
    },
    {
        field: 'eIsPersistent',
        type: 'boolean',
        headerName: 'Persistent for E Drive?',
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