import { Stack, Tooltip } from '@mui/material';
import { CustomDataGrid, CustomTooltip } from '../Common';
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

	function parseIniText(text: string): Array<Array<string>> {
		const lines = text.match(/[^\r\n]+/g) || []; // Split text into lines, excluding empty lines
		const result: Array<Array<string>> = [];
		let currentSection: Array<string> = [];

		lines.forEach((line) => {
			if (line.startsWith('[')) {
				// Check if the line is a section header
				if (currentSection.length > 0) {
					// If there's an existing section, push it to the result before starting a new one
					result.push(currentSection);
				}
				// Start a new section with the current line as the first element
				currentSection = [line];
			} else if (line.trim() !== '') {
				// Add non-empty lines to the current section
				currentSection.push(line);
			}
		});
		// After the loop, add the last section if it's not empty
		if (currentSection.length > 0) {
			result.push(currentSection);
		}

		return result;
	}

	const parseSectionProperty = (
		section: string[],
		id: number,
		title: string,
		propertyHandler: any,
		payload: any[]
	) => {
		const match = section[0].match(new RegExp(`\\[${title}(.+?)\\]`));
		const name = match ? match[1] : '';
		let currentPayload = {
			id: id.toString(),
			name: name,
		};
		section.forEach((line) => {
			if (line.startsWith('[')) {
				return;
			}
			const [key, value] = line.split('=');
			const handler = propertyHandler[key];
			if (handler) {
				handler(value, currentPayload);
			}
		});
		payload.push(currentPayload);
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
