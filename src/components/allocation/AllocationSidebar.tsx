import { useSelector } from 'react-redux';
import { MachineFunction } from '../../interface/allocation/machine-function.interface';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { FileCopy, FileDownload } from '@mui/icons-material';
import { useState } from 'react';
import store from '../../store/store';
import { blue, blueGrey, green, red } from '@mui/material/colors';
import { AllocationType, EapV2, ProfileType } from '../../enum/allocation.enum';

const generateAllocationIni = () => {
	const state = store.getState();
	const machineFunctions = state.machineFunctions;
	const machineGroups = state.machineGroups;
	const autoscaleMetrics = state.autoscaleMetrics;

	let result = '[ComputeDefinition]\n';
	result += `MachineFunctions=${machineFunctions
		.map((mf) => mf.name)
		.join(',')}\n`;

	machineFunctions.forEach((mf) => {
		result += `\n[MachineFunction_${mf.name}]\n`;
		result += `AllocationType=${AllocationType.AZURE_VM}\n`;
		result += `EapV2=${EapV2.EAP_V2}\n`;

		if (mf.autoscaleProfiles && mf.autoscaleProfiles.length > 0) {
			result += `EnableAutoScale=true\n`;
			result += `AutoscaleProfiles=${mf.autoscaleProfiles
				?.map((asp) => asp.name)
				.join(',')}\n`;
		}

		if (mf.machineGroups && mf.machineGroups.length > 0) {
			result += `MachineGroups=${mf.machineGroups.join(',')}\n`;
		} else {
			result += `NumberOfMachines=${mf.numberOfMachines}\n`;
			result += `Sku=${mf.sku}\n`;
		}

		// [AutoscaleProfile_Foo]
		if (mf.autoscaleProfiles && mf.autoscaleProfiles.length > 0) {
			const autoscaleProfiles = mf.autoscaleProfiles;
			autoscaleProfiles?.forEach((asp) => {
				result += `\n[AutoscaleProfile_${asp.name}]\n`;
				result += `ProfileType=${ProfileType.METRIC_BASED}\n`;
				result += `MinMachineCount=${asp.minMachineCount}\n`;
				result += `DefaultMachineCount=${asp.defaultMachineCount}\n`;
				result += `MaxMachineCount=${asp.maxMachineCount}\n`;

				// [AutoscaleRule_Foo]
				if (asp.autoscaleRules && asp.autoscaleRules.length > 0) {
					const autoscaleRules = asp.autoscaleRules;
					result += `AutoscaleRules=${autoscaleRules
						?.map((asr) => asr.name)
						.join(',')}\n`;

					autoscaleRules?.forEach((asr) => {
						result += `\n[AutoscaleRule_${asr.name}]\n`;
						result += `TimeWindow=${asr.timeWindow}\n`;
						result += `Metric=${asr.metric}\n`;
						result += `Operator=${asr.operator}\n`;
						result += `Threshold=${asr.threshold}\n`;
						result += `ScaleDirection=${asr.scaleDirection}\n`;
						result += `ScaleType=${asr.scaleType}\n`;
						result += `ScaleValue=${asr.scaleValue}\n`;
						result += `MinScaleValue=${asr.minScaleValue}\n`;
						result += `Cooldown=${asr.cooldown}\n`;
					});
				}
			});
		}
	});

	// [MachineGroup_Foo]
	machineGroups?.forEach((mg) => {
		result += `\n[MachineGroup_${mg.name}]\n`;
		result += `NumberOfMachines=${mg.numberOfMachines}\n`;
		result += `Sku=${mg.sku}\n`;
		result += `NumberOfScaleUnits=${mg.numberOfScaleUnits}\n`;
	});

	// [AutoscaleMetric_Foo]
	autoscaleMetrics?.forEach((am) => {
		result += `\n[AutoscaleMetric_${am.name}]\n`;
		result += `MetricSource=${am.metricSource}\n`;
		result += `MetricAccount=${am.metricAccount}\n`;
		result += `MetricNamespace=${am.metricNamespace}\n`;
		result += `MetricName=${am.metricName}\n`;
		result += `SamplingType=${am.samplingType}\n`;
		result += `MetricAggregation=${am.metricAggregation}\n`;
		result += `MetricIncludeFilters=${am.metricIncludeFilters}\n`;
		result += `MetricExcludeFilters=${am.metricExcludeFilters}\n`;
	});

	return result;
};

function AllocationSidebar() {
	const machineFunctions: MachineFunction[] = useSelector(
		(state: any) => state.machineFunctions
	);

	const [open, setOpen] = useState(false);
	const [storeJson, setStoreJson] = useState('');

	const handleOpen = () => {
		const allocationIni = generateAllocationIni();
		setStoreJson(allocationIni);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(storeJson);
	};

	const handleDownload = () => {
		const element = document.createElement('a');
		const file = new Blob([storeJson], { type: 'text/plain' });
		element.href = URL.createObjectURL(file);
		element.download = 'allocation.ini';
		document.body.appendChild(element);
		element.click();
	};

	return (
		<Box sx={{ mt: 3 }}>
			<Button variant='contained' onClick={handleOpen}>
				Generate Allocation.ini
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				sx={{ '& .MuiDialog-paper': { width: '100%' } }}
			>
				<Stack
					direction='row'
					spacing={2}
					sx={{ pt: 3, pl: 3, pr: 3, justifyContent: 'space-between' }}
				>
					<DialogTitle>allocation.ini</DialogTitle>
					<Stack direction='row' spacing={2}>
						<Button variant='text' onClick={handleDownload} size='small'>
							<FileDownload />
							<span style={{ marginLeft: 8 }}>Download</span>
						</Button>
						<Button variant='text' onClick={handleCopy} size='small'>
							<FileCopy />
							<span style={{ marginLeft: 8 }}>Copy To Clipboard</span>
						</Button>
					</Stack>
				</Stack>
				<DialogContent>
					<TextField multiline fullWidth variant='outlined' value={storeJson} />
				</DialogContent>
			</Dialog>

			<SimpleTreeView>
				<h3>Machine Functions</h3>
				{machineFunctions.map((mf, index) => (
					<TreeItem
						itemId={`machine-function-${index}`}
						label={
							<Typography sx={{ backgroundColor: blueGrey[100] }}>
								{mf.name}
							</Typography>
						}
					>
						{mf.machineGroups &&
							mf.machineGroups.length > 0 &&
							Array.from(mf.machineGroups).map((mg, mgIndex) => (
								<TreeItem
									itemId={`machine-group-${index}-${mgIndex}`}
									label={
										<Typography sx={{ backgroundColor: blue[100] }}>
											{mg}
										</Typography>
									}
								/>
							))}
						{mf.autoscaleProfiles &&
							mf.autoscaleProfiles.length > 0 &&
							mf.autoscaleProfiles.map((asp, aspIndex) => (
								<TreeItem
									itemId={`autoscale-profile-${index}-${aspIndex}`}
									label={
										<Typography sx={{ backgroundColor: red[100] }}>
											{asp.name}
										</Typography>
									}
								>
									{asp.autoscaleRules &&
										asp.autoscaleRules.map((asr, asrIndex) => (
											<TreeItem
												itemId={`${index}-${aspIndex}-${asrIndex}`}
												label={
													<Typography sx={{ backgroundColor: green[100] }}>
														{asr.name}
													</Typography>
												}
											/>
										))}
								</TreeItem>
							))}
					</TreeItem>
				))}
			</SimpleTreeView>
		</Box>
	);
}

export default AllocationSidebar;
