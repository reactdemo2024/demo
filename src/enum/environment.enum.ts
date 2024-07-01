export enum EnvType {
    BLANK = '',
    PRODUCTION = 'Production',
    INTEGRATION = 'INT',
    PRE_PRODUCTION = 'PPE',
    TESTING = 'Test',
    DEVELOPMENT = 'Dev',
    TEMPORARY_DEVELOPMENT = 'Sandbox',
}

export enum Default {
    SHUTDOWN_TIMEOUT_IN_MILLISECONDS = 5000,
    MAX_BANDWIDTH_BYTES_PER_SECOND = '20000000',
    MAX_BURST_BANDWIDTH_BYTES = '20000000',
    EXTRACT_MANGED_STACK = 0,
}

export enum OsType {
    BLANK = '',
    LINUX = 'Linux',
    WINDOWS = 'Windows',
}

export enum TooltipText {
    TIME_IN_MINUTES = 'Enter time in minutes, i.e. 5',
    CUSTOM_PROPERTIES = 'Enter custom properties in key-value format separated by commas, i.e. PropertyName1=Value1,PropertyName2=Value2',
    COMMA_SEPARATED = 'Enter each name separated by commas, i.e. Foo1,Foo2,Foo3',
    JSON_EXTENSION = 'Include .json extension in the field, i.e. filename.json',
    JSON_FORMAT = 'Use json string format, i.e. { "workspaceId" : "abcdefg-hijklmn-1234-opqrs5-67890tuv" }',
    SUBSCRIPTION_OPTIONS = `There are 4 options for subscription configuration and will be formatted based on the filled inputs.
						\noption 1: SubscriptionIds=<<Replace with comma separated subscription guid>>
						option 2: Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>> 
						option 3: Cluster:<<Cluster name>>,Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>> 
						option 4: Cluster:<<Cluster name>>,AutopilotEnvType:<<Environment type>>$SubscriptionIds=<<Replace with comma separated subscription guid>>`,
    DISK_PROFILE_STORAGE_ACCOUNT_TYPE = 'Keep disk size blank if using Local or TemporaryStorage',
    DISK_PROFILE_CUSTOM_PROPERTIES = 'Additional drives should be in the following format: <DriveLetter/LUN>=<Disk Size in GiB>, <Storage Account Type>, <Caching Type>, <IsPersistent>',

}

export enum LabelText {
    ENABLE_ALL_MACHINE_FUNCTIONS = 'Enable for all Machine Functions',
}

export enum Size {
    TOOLTIP_ICON = 12,
    TOOLTIP_TEXT = 18,
    FONT_SMALL = 12,
}