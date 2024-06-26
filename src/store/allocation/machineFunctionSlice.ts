import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MachineFunction } from '../../interface/allocation/machine-function.interface';
import { AutoscaleProfile } from '../../interface/allocation/autoscale-profile.interface';
import { AutoscaleRule } from '../../interface/allocation/autoscale-rule.interface';

interface MachineGroupPayload {
  machineFunctionName: string;
  machineGroupName: string;
}

interface AutoscaleProfilePayload {
  machineFunctionName: string;
  autoscaleProfile: AutoscaleProfile;
}

interface AutoscaleRulePayload {
  machineFunctionName: string;
  autoscaleProfileName: string;
  autoscaleRule: AutoscaleRule;
}

const machineFunctionSlice = createSlice({
  name: 'machineFunctions',
  initialState: [] as MachineFunction[],
  reducers: {
    putMachineFunction(state, action: PayloadAction<MachineFunction>) {
      const machineFunctionName = action.payload.name;
      const index = state.findIndex(mf => mf.name === machineFunctionName);
      if (index !== -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    deleteMachineFunction(state, action: PayloadAction<string>) {
      const machineFunctionName = action.payload;
      const index = state.findIndex(mf => mf.name === machineFunctionName);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    putMachineGroupName(state, action: PayloadAction<MachineGroupPayload>) {
      const { machineFunctionName, machineGroupName } = action.payload;
      const index = state.findIndex(mf => mf.name === machineFunctionName);
      const machineGroupExists = state[index] && state[index].machineGroups?.find(group => group === machineGroupName);
      if (!machineGroupExists) {
        state[index].machineGroups?.push(machineGroupName);
      }
    },
    deleteMachineGroupName(state, action: PayloadAction<MachineGroupPayload>) {
      const { machineFunctionName, machineGroupName } = action.payload;
      const index = state.findIndex(mf => mf.name === machineFunctionName);
      const machineGroupIndex = state[index].machineGroups?.findIndex(group => group === machineGroupName);
      if (machineGroupIndex && machineGroupIndex !== -1) {
        state[index].machineGroups?.splice(machineGroupIndex, 1);
      }
    },
    putAutoscaleProfile(state, action: PayloadAction<AutoscaleProfilePayload>) {
      const { machineFunctionName, autoscaleProfile } = action.payload;
      const machineFunction = state.find(mf => mf.name === machineFunctionName);
      if (machineFunction) {
        const autoscaleProfileExists = machineFunction.autoscaleProfiles?.some(profile => profile.name === autoscaleProfile.name);
        if (autoscaleProfileExists) {
          machineFunction.autoscaleProfiles = machineFunction.autoscaleProfiles?.map(profile => 
            profile.name === autoscaleProfile.name ? autoscaleProfile : profile
          );
        } else machineFunction.autoscaleProfiles?.push(autoscaleProfile);
      }
    },
    putAutoscaleRule(state, action: PayloadAction<AutoscaleRulePayload>) {
      const { machineFunctionName, autoscaleProfileName, autoscaleRule } = action.payload;
      const machineFunction = state.find(mf => mf.name === machineFunctionName);
      const autoscaleProfile = machineFunction?.autoscaleProfiles?.find(profile => profile.name === autoscaleProfileName);
      if (autoscaleProfile) {
        const autoscaleRuleExists = autoscaleProfile.autoscaleRules?.some(rule => rule.name === autoscaleRule.name);
        if (autoscaleRuleExists) {
          autoscaleProfile.autoscaleRules = autoscaleProfile.autoscaleRules?.map(rule => 
            rule.name === autoscaleRule.name ? autoscaleRule : rule
          );
        } else autoscaleProfile.autoscaleRules?.push(autoscaleRule);
      }
    },
  },
});

export const { putMachineFunction, putAutoscaleProfile, putMachineGroupName, deleteMachineGroupName,
  putAutoscaleRule } = machineFunctionSlice.actions;

export default machineFunctionSlice.reducer;