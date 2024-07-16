import { Stack } from '@mui/material';
import { CustomDataGrid, CustomTooltip } from '../Common';
import {
	autoscaleMetricColumns,
	autoscaleProfileColumns,
	autoscaleRuleColumns,
	machineFunctionColumns,
	machineGroupColumns,
} from '../../inputs/allocation-columns';
import { putMachineFunctions } from '../../store/allocation/machineFunctionSlice';
import { putMachineGroups } from '../../store/allocation/machineGroupSlice';
import { putAutoscaleProfiles } from '../../store/allocation/autoscaleProfileSlice';
import { putAutoscaleRules } from '../../store/allocation/autoscaleRuleSlice';
import { putAutoscaleMetrics } from '../../store/allocation/autoscaleMetricSlice';
import { Size, Url } from '../../enum/common.enum';

function AllocationConfiguration() {
	return (
		<>
			<Stack direction='row' spacing={1} sx={{ my: 3 }}>
				<h2>Allocation Configuration</h2>
				<CustomTooltip
					link={Url.EAP_DOCUMENTATION}
					size={Size.QUESTION_MARK_ICON_LARGE}
				/>
			</Stack>
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
				putDispatch={putAutoscaleMetrics}
				reducer='autoscaleMetrics'
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
				putDispatch={putAutoscaleRules}
				reducer='autoscaleRules'
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
				putDispatch={putMachineGroups}
				reducer='machineGroups'
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
				putDispatch={putMachineFunctions}
				reducer='machineFunctions'
			/>
		</>
	);
}

export default AllocationConfiguration;
