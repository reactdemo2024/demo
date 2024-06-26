export interface FSServer {
    maxConnections: number | string; // <machineFunction>_MaxConnection=<maxConnections>
    maxBandwidthBytesPerSecond: number | string; // <machineFunction>_MaxBandwidthBytesPerSecond=<maxBytes>
    maxBurstBandwidthBytes: number | string; // <machineFunction>_MaxBurstBandwidthBytes=<maxBurstBytes>
}

/**
 * [FSServer-ReadAccess]
 * {!datadir}\servicemanager\ServiceAttribute.csv=ACL_Default
 * {!datadir}\AutopilotData=ACL_Default
 */
export interface FSServerReadAccess {
    paths: string;
}