import { Stack, Tooltip } from '@mui/material';
import { CustomDataGrid, CustomTooltip, parseIniText, parseSectionProperty } from '../Common';
import {
	autoscaleMetricColumns,
	autoscaleProfileColumns,
	autoscaleRuleColumns,
	machineFunctionColumns,
	machineGroupColumns,
} from '../../inputs/allocation-columns';
import {
	MachineFunctionPayload,
	putMachineFunctions,
} from '../../store/allocation/machineFunctionSlice';
import {
	MachineGroupPayload,
	putMachineGroups,
} from '../../store/allocation/machineGroupSlice';
import {
	AutoscaleProfilePayload,
	putAutoscaleProfiles,
} from '../../store/allocation/autoscaleProfileSlice';
import {
	AutoscaleRulePayload,
	putAutoscaleRules,
} from '../../store/allocation/autoscaleRuleSlice';
import {
	AutoscaleMetricPayload,
	putAutoscaleMetrics,
} from '../../store/allocation/autoscaleMetricSlice';
import { Size, TooltipText, Url } from '../../enum/common.enum';
import { UploadFileOutlined } from '@mui/icons-material';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
	autoscaleMetricPropertyHandler,
	autoscaleProfilePropertyHandler,
	autoscaleRulePropertyHandler,
	machineFunctionPropertyHandler,
	machineGroupPropertyHandler,
} from '../../handlers/allocation-handlers';

function AllocationConfiguration() {
	const dispatch = useDispatch();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleUploadClick = () => {
		fileInputRef.current!.click();
	};

	const handleFileChange = (event: any) => {
		const file = event.target.files[0];
		if (file && file.name.endsWith('.ini')) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const text = e.target!.result as string;
				const parsedSections = parseIniText(text);
				handleAllocationDispatch(parsedSections);
			};
			reader.onerror = (e) => {
				console.error('Error reading file:', e.target!.error);
			};
			reader.readAsText(file);
		} else {
			alert(TooltipText.UPLOAD_FILE_INI);
		}
	};

	const handleAllocationDispatch = (sections: string[][]) => {
		let machineFunctionPayload: MachineFunctionPayload[] = [];
		let machineGroupPayload: MachineGroupPayload[] = [];
		let autoscaleProfilePayload: AutoscaleProfilePayload[] = [];
		let autoscaleRulePayload: AutoscaleRulePayload[] = [];
		let autoscaleMetricPayload: AutoscaleMetricPayload[] = [];

		sections.forEach((section) => {
			// [MachineFunction_Foo]
			if (section[0].startsWith('[MachineFunction_')) {
				parseSectionProperty(
					section,
					machineFunctionPayload.length,
					'MachineFunction_',
					machineFunctionPropertyHandler,
					machineFunctionPayload
				);
			}
			// [MachineGroup_Foo]
			if (section[0].startsWith('[MachineGroup_')) {
				parseSectionProperty(
					section,
					machineGroupPayload.length,
					'MachineGroup_',
					machineGroupPropertyHandler,
					machineGroupPayload
				);
			}
			// [AutoscaleProfile_Foo]
			if (section[0].startsWith('[AutoscaleProfile_')) {
				parseSectionProperty(
					section,
					autoscaleProfilePayload.length,
					'AutoscaleProfile_',
					autoscaleProfilePropertyHandler,
					autoscaleProfilePayload
				);
			}
			// [AutoscaleRule_Foo]
			if (section[0].startsWith('[AutoscaleRule_')) {
				parseSectionProperty(
					section,
					autoscaleRulePayload.length,
					'AutoscaleRule_',
					autoscaleRulePropertyHandler,
					autoscaleRulePayload
				);
			}
			// [AutoscaleMetric_Foo]
			if (section[0].startsWith('[AutoscaleMetric_')) {
				parseSectionProperty(
					section,
					autoscaleMetricPayload.length,
					'AutoscaleMetric_',
					autoscaleMetricPropertyHandler,
					autoscaleMetricPayload
				);
			}
		});
		dispatch(putMachineFunctions(machineFunctionPayload));
		dispatch(putMachineGroups(machineGroupPayload));
		dispatch(putAutoscaleProfiles(autoscaleProfilePayload));
		dispatch(putAutoscaleRules(autoscaleRulePayload));
		dispatch(putAutoscaleMetrics(autoscaleMetricPayload));
	};

	return (
		<>
			<Stack direction='row' spacing={2} sx={{ my: 3 }} alignItems='center'>
				<h2>Allocation Configuration</h2>
				<CustomTooltip
					link={Url.EAP_DOCUMENTATION}
					size={Size.QUESTION_MARK_ICON_LARGE}
				/>
				<input
					type='file'
					ref={fileInputRef}
					style={{ display: 'none' }}
					accept='.ini'
					onChange={handleFileChange}
				/>
				<Tooltip
					title={TooltipText.UPLOAD_FILE}
					onClick={handleUploadClick}
					style={{ cursor: 'pointer' }}
				>
					<UploadFileOutlined />
				</Tooltip>
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
