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
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { FileCopy, FileDownload } from '@mui/icons-material';
import { useState } from 'react';
import store from '../../store/store';
import { blue, blueGrey, green, red } from '@mui/material/colors';
import { AllocationType, EapV2, ProfileType } from '../../enum/allocation.enum';
import { MachineFunctionPayload } from '../../store/allocation/machineFunctionSlice2';
import { AutoscaleProfilePayload } from '../../store/allocation/autoscaleProfileSlice';
import { AutoscaleMetricPayload } from '../../store/allocation/autoscaleMetricSlice2';
import { Size } from '../../enum/environment.enum';

const generateAllocationIni = () => {
	const state = store.getState();
	const machineFunctions = state.machineFunctions2;
	const machineGroups = state.machineGroups2;
	const autoscaleProfiles = state.autoscaleProfiles;
	const autoscaleRules = state.autoscaleRules2;
	const autoscaleMetrics = state.autoscaleMetrics2;

	let result = '[ComputeDefinition]\n';

	if (machineFunctions.length > 0) {
		result += `MachineFunctions=${machineFunctions
			.map((mf) => mf.name)
			.join(',')}\n`;
	}

	// [MachineFunction_Foo]
	machineFunctions?.forEach((mf) => {
		result += `\n[MachineFunction_${mf.name}]\n`;
		Object.keys(mf).forEach((key) => {
			if (key !== 'name' && key !== 'id' && key !== 'customProperties') {
				const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
				result += mf[key as keyof MachineFunctionPayload]
					? `${formatKey}=${mf[key as keyof MachineFunctionPayload]}\n`
					: '';
			}
		});
		result += `AllocationType=${AllocationType.AZURE_VM}\nEapV2=${EapV2.EAP_V2}\n`;
		if (mf.customProperties) {
			mf.customProperties.split(',').forEach((cp) => {
				result += `${cp}\n`;
			});
		}
	});

	// [MachineGroup_Foo]
	machineGroups?.forEach((mg) => {
		result += `\n[MachineGroup_${mg.name}]\n`;
		result += `NumberOfMachines=${mg.numberOfMachines}\n`;
		result += `Sku=${mg.sku}\n`;
		result += `NumberOfScaleUnits=${mg.numberOfScaleUnits}\n`;
		if (mg.customProperties) {
			mg.customProperties.split(',').forEach((cp) => {
				result += `${cp}\n`;
			});
		}
	});

	// [AutoscaleProfile_Foo]
	autoscaleProfiles?.forEach((ap) => {
		result += `\n[AutoscaleProfile_${ap.name}]\n`;
		Object.keys(ap).forEach((key) => {
			if (key !== 'name' && key !== 'id' && key !== 'customProperties') {
				const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
				result += ap[key as keyof AutoscaleProfilePayload]
					? `${formatKey}=${ap[key as keyof AutoscaleProfilePayload]}\n`
					: '';
			}
		});
		if (ap.customProperties) {
			ap.customProperties.split(',').forEach((cp) => {
				result += `${cp}\n`;
			});
		}
	});

	// [AutoscaleRule_Foo]
	autoscaleRules?.forEach((ar) => {
		result += `\n[AutoscaleRule_${ar.name}]\n`;
		Object.keys(ar).forEach((key) => {
			if (key !== 'name' && key !== 'id' && key !== 'customProperties') {
				const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
				result += ar[key as keyof AutoscaleProfilePayload]
					? `${formatKey}=${ar[key as keyof AutoscaleProfilePayload]}\n`
					: '';
			}
		});
		if (ar.customProperties) {
			ar.customProperties.split(',').forEach((cp) => {
				result += `${cp}\n`;
			});
		}
	});

	// [AutoscaleMetric_Foo]
	autoscaleMetrics?.forEach((ar) => {
		result += `\n[AutoscaleMetric_${ar.name}]\n`;
		Object.keys(ar).forEach((key) => {
			if (key !== 'name' && key !== 'id' && key !== 'customProperties') {
				const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
				result += ar[key as keyof AutoscaleMetricPayload]
					? `${formatKey}=${ar[key as keyof AutoscaleMetricPayload]}\n`
					: '';
			}
		});
		if (ar.customProperties) {
			ar.customProperties.split(',').forEach((cp) => {
				result += `${cp}\n`;
			});
		}
	});

	return result;
};

function AllocationSidebar() {
	const machineFunctions: MachineFunctionPayload[] = useSelector(
		(state: any) => state.machineFunctions2
	);
	const autoscaleProfiles: AutoscaleProfilePayload[] = useSelector(
		(state: any) => state.autoscaleProfiles
	);
	const autoscaleMetrics: AutoscaleMetricPayload[] = useSelector(
		(state: any) => state.autoscaleMetrics
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
			<Button
				variant='contained'
				onClick={handleOpen}
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					margin: '20px', // Optional: adds some spacing from the edges
				}}
			>
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
							mf.machineGroups
								.split(',')
								.map((mg, mgIndex) => (
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
							mf.autoscaleProfiles.split(',').map((asp, aspIndex) => (
								<TreeItem
									itemId={`autoscale-profile-${index}-${aspIndex}`}
									label={
										<Typography sx={{ backgroundColor: red[100] }}>
											{asp}
										</Typography>
									}
								>
									{autoscaleProfiles.map((autoscaleProfile, apIndex) => {
										if (
											autoscaleProfile.name === asp &&
											autoscaleProfile.autoscaleRules &&
											autoscaleProfile.autoscaleRules.length > 0
										) {
											return autoscaleProfile.autoscaleRules
												.split(',')
												.map((asr, asrIndex) => (
													<TreeItem
														itemId={`${index}-${apIndex}-${asrIndex}`}
														label={
															<Typography sx={{ backgroundColor: green[100] }}>
																{asr}
															</Typography>
														}
													/>
												));
										}
										return null;
									})}
								</TreeItem>
							))}
					</TreeItem>
				))}
			</SimpleTreeView>

			{storeJson && (
				<Box
					sx={{
						position: 'fixed',
						p: 2,
						border: '1px solid grey',
						borderRadius: '4px',
						width: '225px',
						maxHeight: '78%', // Set a fixed maximum height
						overflowY: 'auto', // Enable vertical scrolling
					}}
				>
					<Typography variant='subtitle1'>Preview:</Typography>
					<Typography
						sx={{
							whiteSpace: 'pre-wrap',
							fontSize: Size.FONT_SMALL,
							maxWidth: '100%',
							overflowWrap: 'break-word',
						}}
					>
						{storeJson}
					</Typography>
				</Box>
			)}
		</Box>
	);
}

export default AllocationSidebar;
