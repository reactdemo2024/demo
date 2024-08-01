import { OsType } from "../enum/environment.enum";
import { AzureSLBPayload } from "../store/environment/azureSLBSlice";
import { CustomVMSSExtensionPayload } from "../store/environment/customVMSSExtensionSlice";
import { DiskProfilePayload } from "../store/environment/diskProfileSlice";

// TODO: add custom properties handler too all that need

// TODO: azure compute manager is parsed differently, needs to be parsed manually or just do normally and have to make a bunch of dispatch

export const customVMSSExtensionPropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<CustomVMSSExtensionPayload>
    ) => void;
} = {
    Type: (value, payload) =>
        (payload.type = value),
    Publisher: (value, payload) =>
        (payload.publisher = value),
    TypeHandlerVersion: (value, payload) => (payload.typeHandlerVersion = value),
    AutoUpgradeMinorVersion: (value, payload) =>
        (payload.autoUpgradeMinorVersion = value.toLowerCase() === 'true'),
    ForceUpdateTag: (value, payload) =>
        (payload.forceUpdateTag = value),
    Settings: (value, payload) => (payload.settings = value),
    OSType: (value, payload) => (payload.osType = value as OsType),
    MachineFunction: (value, payload) =>
        (payload.machineFunction = value),
};

export const azureSLBPropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<AzureSLBPayload>
    ) => void;
} = {
    MachineFunction: (value, payload) =>
        (payload.machineFunction = value),
    NumberOfIPs: (value, payload) => (payload.numberOfIPs = value),
    OutboundRules: (value, payload) => (payload.outboundRules = value.split(',')),
};

// TODO: disk profile parsed differently -- might need to redo how this is stored? idk or just do manual like with name
export const diskProfilePropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<DiskProfilePayload>
    ) => void;
} = {
    MachineFunction: (value, payload) =>
        (payload.machineFunctions = value),
};