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
    LINUX = 'Linux',
    WINDOWS = 'Windows',
}