export enum TooltipText {
    TIME_IN_MINUTES = 'Enter time in minutes, i.e. 5',
    CUSTOM_PROPERTIES = 'Enter custom properties in key-value format separated by commas, i.e. PropertyName1=Value1,PropertyName2=Value2',
    COMMA_SEPARATED = 'Enter each name separated by commas, i.e. Foo1,Foo2,Foo3',
    JSON_EXTENSION = 'Include .json extension in the field, i.e. filename.json',
    JSON_FORMAT = 'Use json string format, i.e. { "workspaceId" : "abcdefg-hijklmn-1234-opqrs5-67890tuv" }',
    SUBSCRIPTION_OPTIONS = `There are 4 options for subscription configuration and will be formatted based on the filled inputs.
						\noption 1: SubscriptionIds=<<Replace with comma separated subscription guid>>
						option 2: Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>> 
						option 3: Cluster:<<Cluster name>>,Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>>`,
    DISK_PROFILE_STORAGE_ACCOUNT_TYPE = 'Keep disk size blank if using Local or TemporaryStorage',
    DISK_PROFILE_CUSTOM_PROPERTIES = 'Additional drives should be in the following format: <DriveLetter/LUN>=<Disk Size in GiB>, <Storage Account Type>, <Caching Type>, <IsPersistent>',
    MACHINE_GROUPS = 'Enter name of machine group(s) separated by commas, i.e. Group1,Group2',
    AUTOSCALE_PROFILES = 'Enter name of autoscale profile(s) separated by commas, i.e. Profile1,Profile2',
    AUTOSCALE_RULES = 'Enter name of autoscale rule(s) separated by commas, i.e. Rule1,Rule2',
    AUTOSCALE_METRIC = 'Enter name of autoscale metric created, i.e. Metric1',
}

export enum LabelText {
    ENABLE_ALL_MACHINE_FUNCTIONS = 'Enable for all Machine Functions',
}

export enum Size {
    TOOLTIP_ICON = 12,
    TOOLTIP_TEXT = 18,
    FONT_SMALL = 12,
    FONT_MEDIUM = 14,
    FONT_BOLD = 600,
}

export enum Font {
    MONOSPACE = '"Inconsolata", Consolas, monospace',
}

export enum Color {
    RED = '#f34f1c',
    BLUE = '#01a6f0',
    GREEN = '#7fbc00',
    YELLOW = '#FFBa01',
    GREY = '#747474',
    WHITE = '#FFFFFF',
}