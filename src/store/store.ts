import { configureStore } from '@reduxjs/toolkit';
import computeDefinitionReducer from './allocation/computeDefinitionSlice';
import machineFunctionsReducer from './allocation/machineFunctionSlice';
import machineGroupsReducer from './allocation/machineGroupSlice';
import autoscaleMetricReducer from './allocation/autoscaleMetricSlice';
import availabilityZoneReducer from './environment/availabilityZoneSlice';
import maintenanceControlReducer from './environment/maintenanceControlSlice';
import zoneBalanceReducer from './environment/zoneBalanceSlice';
import subscriptionReducer from './environment/subscriptionSlice';
import encryptionHostReducer from './environment/encryptionHostSlice';
import regionalIPV4Reducer from './environment/regionalIPV4Slice';
import customVMSSTagReducer from './environment/customVMSSTagSlice';
import customVMSSExtensionReducer from './environment/customVMSSExtensionSlice';
import trustedLaunchMachineFunctionReducer from './environment/trustedLaunchMachineFunctionSlice';
import acceleratedNetworkingEnabledMachineFunctionReducer from './environment/acceleratedNetworkingEnabledMachineFunctionSlice';
import acceleratedNetworkingInPlaceUpdateReducer from './environment/acceleratedNetworkingInPlaceUpdateSlice';
import outboundRuleReducer from './environment/outboundRuleSlice';
import azureSLBReducer from './environment/azureSLBSlice';
import diskProfileReducer from './environment/diskProfileSlice';

const store = configureStore({
  reducer: {
    // allocation.ini
    computeDefinition: computeDefinitionReducer,
    machineFunctions: machineFunctionsReducer,
    machineGroups: machineGroupsReducer,
    autoscaleMetrics: autoscaleMetricReducer,
    // environment.ini
    availabilityZones: availabilityZoneReducer,
    zoneBalances: zoneBalanceReducer,
    maintenanceControl: maintenanceControlReducer,
    subscriptions: subscriptionReducer,
    hostEncryption: encryptionHostReducer,
    regionalIPV4: regionalIPV4Reducer,
    customVMSSTags: customVMSSTagReducer,
    customVMSSExtensions: customVMSSExtensionReducer,
    trustedLaunchMachineFunctions: trustedLaunchMachineFunctionReducer,
    acceleratedNetworkingEnabledMachineFunctions: acceleratedNetworkingEnabledMachineFunctionReducer,
    acceleratedNetworkingInPlaceUpdate: acceleratedNetworkingInPlaceUpdateReducer,
    outboundRules: outboundRuleReducer,
    azureSLBs: azureSLBReducer,
    diskProfiles: diskProfileReducer,
  },
});

export default store;