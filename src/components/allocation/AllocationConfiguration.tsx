import {
	Stack,
} from '@mui/material';
import { CustomDataGrid } from '../Common';
import {
	autoscaleMetricColumns,
	autoscaleProfileColumns,
	autoscaleRuleColumns,
	machineFunctionColumns,
	machineGroupColumns,
} from '../../data/allocation-columns';
import { putMachineFunctions2 } from '../../store/allocation/machineFunctionSlice2';
import { putMachineGroups2 } from '../../store/allocation/machineGroupSlice2';
import { putAutoscaleProfiles } from '../../store/allocation/autoscaleProfileSlice';
import { putAutoscaleRules2 } from '../../store/allocation/autoscaleRuleSlice2';
import { putAutoscaleMetrics2 } from '../../store/allocation/autoscaleMetricSlice2';

function AllocationConfiguration() {
	return (
		<>
			<h2>Allocation Configuration</h2>
			<Stack direction='column' spacing={3}>
				<MachineFunctionConfiguration />
				<MachineGroupConfiguration />
				<AutoscaleProfileConfiguration />
				<AutoscaleRuleConfiguration />
				<AutoscaleMetricConfiguration />
			</Stack>
		</>
	);
}

function AutoscaleMetricConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={autoscaleMetricColumns}
				header='Autoscale Metrics'
				buttonHeader='Autoscale Metric'
				putDispatch={putAutoscaleMetrics2}
				reducer='autoscaleMetrics2'
			/>
		</>
	);
}

function AutoscaleRuleConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={autoscaleRuleColumns}
				header='Autoscale Rules'
				buttonHeader='Autoscale Rule'
				putDispatch={putAutoscaleRules2}
				reducer='autoscaleRules2'
			/>
		</>
	);
}

function AutoscaleProfileConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={autoscaleProfileColumns}
				header='Autoscale Profiles'
				buttonHeader='Autoscale Profile'
				putDispatch={putAutoscaleProfiles}
				reducer='autoscaleProfiles'
			/>
		</>
	);
}

function MachineGroupConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={machineGroupColumns}
				header='Machine Groups'
				buttonHeader='Machine Group'
				putDispatch={putMachineGroups2}
				reducer='machineGroups2'
			/>
		</>
	);
}

function MachineFunctionConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={machineFunctionColumns}
				header='Machine Functions'
				buttonHeader='Machine Function'
				putDispatch={putMachineFunctions2}
				reducer='machineFunctions2'
			/>
		</>
	);
}

export default AllocationConfiguration;
