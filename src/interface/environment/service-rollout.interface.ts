export interface ServiceRollout {
    // DurationInSec_<machineFunction>=<Duration> or DurationInSec=<Duration>
    durationInSec: number | string;
    // SuccessTimeoutInSec_<MachineFunction>=<Duration> or SuccessTimeoutInSec=<Duration>
    successTimeoutInSec: number | string;
    failureTimeoutInSec: number; // FailureTimeoutInSec=<failureTimeout>
    maxScaleUnits: number; // MaxScaleunits=<maxScaleUnits>	
}