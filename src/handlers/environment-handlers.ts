import { OsType } from "../enum/environment.enum";
import { AzureSLBPayload } from "../store/environment/azureSLBSlice";
import { CustomVMSSExtensionPayload } from "../store/environment/customVMSSExtensionSlice";
import { DiskProfilePayload } from "../store/environment/diskProfileSlice";
import { OutboundRulePayload } from "../store/environment/outboundRuleSlice";

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

export const outboundRulePropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<OutboundRulePayload>
    ) => void;
} = {
    AllocatedOutboundPorts: (value, payload) =>
        (payload.allocatedOutboundPorts = value),
    IdleTimeoutInMinutes: (value, payload) => (payload.idleTimeoutInMinutes = value),
    EnableTcpReset: (value, payload) => (payload.enableTcpReset = value.toLowerCase() === 'true'),
    Protocol: (value, payload) => (payload.protocol = value),
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

export const diskProfilePropertyHandler: {
    [key: string]: (
        value: string,
        payload: Partial<DiskProfilePayload>
    ) => void;
} = {
    MachineFunction: (value, payload) => {
        payload.machineFunctions = value;
    },
    C: (value, payload) => {
        const [diskSize, storageAccountType] = value.split(',');
        payload.cDiskSize = diskSize;
        payload.cStorageAccountType = storageAccountType;
    },
    D: (value, payload) => {
        const [diskSize, storageAccountType, cachingType, isPersistent] = value.split(',');
        payload.dDiskSize = diskSize;
        payload.dStorageAccountType = storageAccountType;
        payload.dCachingType = cachingType;
        payload.dIsPersistent = isPersistent.toLowerCase() === 'true';
    },
    E: (value, payload) => {
        const [diskSize, storageAccountType, cachingType, isPersistent] = value.split(',');
        payload.eDiskSize = diskSize;
        payload.eStorageAccountType = storageAccountType;
        payload.eCachingType = cachingType;
        payload.eIsPersistent = isPersistent.toLowerCase() === 'true';
    },
};