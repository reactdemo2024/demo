import { useDispatch, useSelector } from 'react-redux';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	Stack,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import { FileCopy, FileDownload } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import store from '../../store/store';
import { AllocationType, EapV2 } from '../../enum/allocation.enum';
import { MachineFunctionPayload } from '../../store/allocation/machineFunctionSlice';
import { AutoscaleProfilePayload } from '../../store/allocation/autoscaleProfileSlice';
import { AutoscaleMetricPayload } from '../../store/allocation/autoscaleMetricSlice';
import { Color, Font, Size } from '../../enum/common.enum';
import { MachineGroupPayload } from '../../store/allocation/machineGroupSlice';
import { putAllocationPreview } from '../../store/allocation/allocationPreviewSlice';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
	'& .MuiTreeItem-content': {
		padding: '1px 0px',
		gap: '2px',
	},
}));

const generateAllocationIni = () => {
	const state = store.getState();
	const machineFunctions = state.machineFunctions;
	const machineGroups = state.machineGroups;
	const autoscaleProfiles = state.autoscaleProfiles;
	const autoscaleRules = state.autoscaleRules;
	const autoscaleMetrics = state.autoscaleMetrics;

	let result = '[ComputeDefinition]\n';

	if (machineFunctions.length > 0) {
		result += `MachineFunctions=${machineFunctions
			.map((mf) => mf.name)
			.join(',')}\n`;
	}

	// [MachineFunction_Foo]
	machineFunctions.forEach((mf) => {
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
		Object.keys(mg).forEach((key) => {
			if (key !== 'name' && key !== 'id' && key !== 'customProperties') {
				const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
				result += mg[key as keyof MachineGroupPayload]
					? `${formatKey}=${mg[key as keyof MachineGroupPayload]}\n`
					: '';
			}
		});
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
	const dispatch = useDispatch();
	const state = store.getState();
	const dataFromStore = state.allocationPreview;

	const [open, setOpen] = useState(false);
	const [storeJson, setStoreJson] = useState(dataFromStore);

	const machineFunctions: MachineFunctionPayload[] = useSelector(
		(state: any) => state.machineFunctions
	);
	const autoscaleProfiles: AutoscaleProfilePayload[] = useSelector(
		(state: any) => state.autoscaleProfiles
	);
	const autoscaleMetrics: AutoscaleMetricPayload[] = useSelector(
		(state: any) => state.autoscaleMetrics
	);

	useEffect(() => {
		dispatch(putAllocationPreview(storeJson));
	}, [dispatch, storeJson]);

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
		<>
			<Button
				variant='contained'
				onClick={handleOpen}
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					ml: '30px',
					mb: '20px',
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
					<DialogTitle variant='h6'>allocation.ini</DialogTitle>
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
					<TextField
						multiline
						fullWidth
						variant='outlined'
						value={storeJson}
						inputProps={{ style: { fontFamily: Font.MONOSPACE } }}
					/>
				</DialogContent>
			</Dialog>

			<Stack
				direction='column'
				spacing={1}
				sx={{
					position: 'fixed',
					width: '260px',
					maxHeight: 'calc(100vh - 150px)', // Set a fixed maximum height
					overflowY: 'auto',
				}}
			>
				<SimpleTreeView>
					{machineFunctions?.map((mf, index) => (
						<CustomTreeItem
							itemId={`machine-function-${index}`}
							label={
								<Typography
									variant='subtitle1'
									sx={{
										backgroundColor: Color.RED,
										py: '4px',
										pl: 1,
									}}
								>
									{mf.name}
								</Typography>
							}
						>
							{mf.machineGroups &&
								mf.machineGroups.length > 0 &&
								mf.machineGroups.split(',').map((mg, mgIndex) => (
									<CustomTreeItem
										itemId={`machine-group-${index}-${mgIndex}`}
										label={
											<Typography
												variant='subtitle1'
												sx={{
													backgroundColor: Color.GREEN,
													py: '4px',
													pl: 1,
												}}
											>
												{mg}
											</Typography>
										}
									/>
								))}
							{mf.autoscaleProfiles &&
								mf.autoscaleProfiles.length > 0 &&
								mf.autoscaleProfiles.split(',').map((asp, aspIndex) => (
									<CustomTreeItem
										itemId={`autoscale-profile-${index}-${aspIndex}`}
										label={
											<Typography
												variant='subtitle1'
												sx={{
													backgroundColor: Color.BLUE,
													py: '4px',
													pl: 1,
												}}
											>
												{asp}
											</Typography>
										}
									>
										{autoscaleProfiles?.map((autoscaleProfile, apIndex) => {
											if (
												autoscaleProfile.name === asp &&
												autoscaleProfile.autoscaleRules &&
												autoscaleProfile.autoscaleRules.length > 0
											) {
												return autoscaleProfile.autoscaleRules
													.split(',')
													.map((asr, asrIndex) => (
														<CustomTreeItem
															itemId={`${index}-${apIndex}-${asrIndex}`}
															label={
																<Typography
																	variant='subtitle1'
																	sx={{
																		backgroundColor: Color.YELLOW,
																		py: '4px',
																		pl: 1,
																	}}
																>
																	{asr}
																</Typography>
															}
														/>
													));
											}
											return null;
										})}
									</CustomTreeItem>
								))}
						</CustomTreeItem>
					))}
					<Divider />
				</SimpleTreeView>
				<AllocationPreview storeJson={storeJson} />
			</Stack>
		</>
	);
}

function AllocationPreview({ storeJson }: { storeJson: string }) {
	return (
		<Box sx={{ px: 1 }}>
			{storeJson && (
				<>
					<Typography
						variant='subtitle1'
						sx={{
							fontWeight: Size.FONT_BOLD,
						}}
					>
						Preview:
					</Typography>
					<Typography
						sx={{
							whiteSpace: 'pre-wrap',
							fontSize: Size.FONT_MEDIUM,
							fontFamily: Font.MONOSPACE,
							maxWidth: '100%',
							overflowWrap: 'break-word',
						}}
					>
						{storeJson}
					</Typography>
				</>
			)}
		</Box>
	);
}

export default AllocationSidebar;
