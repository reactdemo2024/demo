import { Stack, Tooltip } from '@mui/material';
import { CustomDataGrid, CustomTooltip } from '../Common';
import {
	autoscaleMetricColumns,
	autoscaleProfileColumns,
	autoscaleRuleColumns,
	machineFunctionColumns,
	machineGroupColumns,
} from '../../inputs/allocation-columns';
import { MachineFunctionPayload, putMachineFunctions } from '../../store/allocation/machineFunctionSlice';
import { putMachineGroups } from '../../store/allocation/machineGroupSlice';
import { putAutoscaleProfiles } from '../../store/allocation/autoscaleProfileSlice';
import { putAutoscaleRules } from '../../store/allocation/autoscaleRuleSlice';
import { putAutoscaleMetrics } from '../../store/allocation/autoscaleMetricSlice';
import { Size, TooltipText, Url } from '../../enum/common.enum';
import { UploadFileOutlined } from '@mui/icons-material';
import { useRef, useState } from 'react';

function AllocationConfiguration() {
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
				// regex splits the .ini file into array for each line, not including empty lines
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
	
	  lines.forEach(line => {
		if (line.startsWith('[')) { // Check if the line is a section header
		  if (currentSection.length > 0) {
			// If there's an existing section, push it to the result before starting a new one
			result.push(currentSection);
		  }
		  // Start a new section with the current line as the first element
		  currentSection = [line];
		} else if (line.trim() !== '') { // Add non-empty lines to the current section
		  currentSection.push(line);
		}
	  });
	
	  // After the loop, add the last section if it's not empty
	  if (currentSection.length > 0) {
		result.push(currentSection);
	  }
	
	  return result;
	}
	
	const handleAllocationDispatch = (lines: string[][]) => {
		console.log(lines);
	//   const machineFunctionPayloads: MachineFunctionPayload[] = [];
	//   let currentPayload: Partial<MachineFunctionPayload> | null = null;
	
	//   // Define a mapping of keys to their handlers
	//   const propertyHandlers: { [key: string]: (value: string, payload: Partial<MachineFunctionPayload>) => void } = {
	// 	NumberOfMachines: (value, payload) => payload.numberOfMachines = parseInt(value, 10),
	// 	NumberOfScaleUnits: (value, payload) => payload.numberOfScaleUnits = parseInt(value, 10),
	// 	Sku: (value, payload) => payload.sku = value,
	// 	EnableAutoScale: (value, payload) => payload.enableAutoScale = value.toLowerCase() === 'true',
	// 	MachineGroups: (value, payload) => payload.machineGroups = value.split(','),
	// 	// Add more handlers as needed
	//   };
	
	//   lines.forEach((line, index) => {
	// 	if (line.startsWith('[MachineFunction_')) {
	// 	  if (currentPayload) {
	// 		// Push the previous payload to the array
	// 		machineFunctionPayloads.push(currentPayload as MachineFunctionPayload);
	// 	  }
	// 	  const match = line.match(/\[MachineFunction_(.+?)\]/);
	// 	  const machineFunctionName = match ? match[1] : '';
	// 	  currentPayload = { id: (machineFunctionPayloads.length + 1).toString(), name: machineFunctionName };
	// 	} else if (currentPayload) {
	// 	  const [key, value] = line.split('=');
	// 	  const handler = propertyHandlers[key];
	// 	  if (handler) {
	// 		handler(value, currentPayload);
	// 	  }
	// 	}
	// 	// If it's the last line, push the current payload
	// 	if (index === lines.length - 1 && currentPayload) {
	// 	  machineFunctionPayloads.push(currentPayload as MachineFunctionPayload);
	// 	}
	//   });
	
	  // Now, machineFunctionPayloads array will have all the parsed payloads
	  // You can input them into Redux or handle them as needed
	}

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
