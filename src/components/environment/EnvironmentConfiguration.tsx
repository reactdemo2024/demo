import {
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormControlLabel,
	IconButton,
	MenuItem,
	Select,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import {
	DataGrid,
	GridRowsProp,
	GridColDef,
	GridRowId,
	GridRenderEditCellParams,
} from '@mui/x-data-grid';
import { randomTraderName } from '@mui/x-data-grid-generator';
import { Add, Delete, Info, InfoOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	AvailabilityZonesPayload,
	putAvailabilityZone,
	putAvailabilityZones,
} from '../../store/environment/availabilityZoneSlice';
import { putMaintenanceControl } from '../../store/environment/maintenanceControlSlice';
import {
	ZoneBalancePayload,
	putZoneBalances,
} from '../../store/environment/zoneBalanceSlice';
import {
	SubscriptionPayload,
	putSubscriptions,
} from '../../store/environment/subscriptionSlice';
import { EnvType } from '../../enum/environment.enum';
import { putEncryptionAtHost } from '../../store/environment/encryptionHostSlice';
import {
	VMSSCustomTagPayload,
	putEapVMSSCustomTags,
} from '../../store/environment/eapVMSSCustomTagSlice';

interface CustomTooltipProps {
	tooltip: string;
	size?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ tooltip, size }) => {
	return (
		<Tooltip
			title={
				<Typography sx={{ whiteSpace: 'pre-line', fontSize: 12 }}>
					{tooltip}
				</Typography>
			}
			PopperProps={{
				sx: {
					'& .MuiTooltip-tooltip': {
						maxWidth: 'none', // Remove the max-width restriction
						width: 'auto', // Adjust width as needed
					},
				},
			}}
		>
			<InfoOutlined sx={{ fontSize: size || 20 }} />
		</Tooltip>
	);
};

function EnvironmentConfiguration() {
	return (
		<>
			<Typography>
				<h2>Environment Configuration</h2>
				<Stack direction='column' spacing={3}>
					<AzureComputeManagerConfiguration />
				</Stack>
			</Typography>
		</>
	);
}

function AzureComputeManagerConfiguration() {
	return (
		<>
			<h3>Azure Compute Manager</h3>
			<AvailabilityZoneConfiguration />
			<ZoneBalanceConfiguration />
			<AzureMaintenanceControlConfiguration />
			<SubscriptionConfiguration />
			<EncryptionAtHostConfiguration />
			<RegionalIPV4MFConfiguration />
			<EapVMSSCustomTagConfiguration />
		</>
	);
}

function AvailabilityZoneConfiguration() {
	const dispatch = useDispatch();
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [id, setId] = useState(0);
	const [allAvailabilityZones, setAllAvailabilityZones] = useState(false);
	const [availabilityZoneForm, setAvailabilityZoneForm] = useState({
		availabilityZone: '',
	});

	useEffect(() => {
		dispatch(putAvailabilityZones(rows as AvailabilityZonesPayload[]));
	}, [dispatch, rows]);

	useEffect(() => {
		dispatch(putAvailabilityZone(availabilityZoneForm.availabilityZone));
	}, [dispatch, availabilityZoneForm]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAvailabilityZoneForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleDeleteRow = (id: GridRowId) => {
		const updatedRows = rows.filter((row) => row.id !== id);
		setRows(updatedRows);
	};

	const handleAddRow = () => {
		const newRow = {
			id,
			machineFunctionName: randomTraderName(),
			availabilityZone: randomTraderName(),
		};
		setRows([...rows, newRow]);
		setId(id + 1);
	};

	const handleRowUpdate = (updatedRow: any) => {
		setRows((prevRows) => {
			return prevRows.map((row) =>
				row.id === updatedRow.id ? updatedRow : row
			);
		});
		return updatedRow;
	};

	const handleProcessRowUpdateError = (error: any) => {
		console.error('Row update error:', error);
	};

	const columns: GridColDef[] = [
		{
			field: 'machineFunctionName',
			headerName: 'Name of Machine Function',
			width: 300,
			editable: true,
		},
		{
			field: 'availabilityZone',
			headerName: 'Availability Zone',
			width: 250,
			editable: true,
		},
		{
			field: 'actions',
			headerName: 'Delete',
			width: 100,
			renderCell: (params) => (
				<IconButton onClick={() => handleDeleteRow(params.id)}>
					<Delete />
				</IconButton>
			),
			editable: false,
		},
	];

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<h4>Availability Zones</h4>
				<FormControlLabel
					control={
						<Checkbox
							checked={allAvailabilityZones}
							onChange={(event) =>
								setAllAvailabilityZones(event.target.checked)
							}
							size='small'
						/>
					}
					label='Apply to All Machine Functions'
				/>
				{!allAvailabilityZones && (
					<Button variant='text' onClick={handleAddRow} startIcon={<Add />}>
						Availability Zone
					</Button>
				)}
			</Stack>
			{allAvailabilityZones ? (
				<TextField
					name='availabilityZone'
					label='Availability Zone'
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={availabilityZoneForm.availabilityZone}
					onChange={handleInputChange}
					style={{ width: 400 }}
				/>
			) : (
				<>
					<DataGrid
						editMode='row'
						rows={rows}
						columns={columns}
						processRowUpdate={(updatedRow) => handleRowUpdate(updatedRow)}
						onProcessRowUpdateError={handleProcessRowUpdateError}
						autoHeight
					/>
				</>
			)}
		</>
	);
}

function ZoneBalanceConfiguration() {
	const dispatch = useDispatch();
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [id, setId] = useState(0);

	useEffect(() => {
		dispatch(putZoneBalances(rows as ZoneBalancePayload[]));
	}, [dispatch, rows]);

	const handleDeleteRow = (id: GridRowId) => {
		const updatedRows = rows.filter((row) => row.id !== id);
		setRows(updatedRows);
	};

	const handleAddRow = () => {
		const newRow = {
			id,
			machineFunctionName: randomTraderName(),
			zoneBalance: true,
		};
		setRows([...rows, newRow]);
		setId(id + 1);
	};

	const handleRowUpdate = (updatedRow: any) => {
		setRows((prevRows) => {
			return prevRows.map((row) =>
				row.id === updatedRow.id ? updatedRow : row
			);
		});
		return updatedRow;
	};

	const handleProcessRowUpdateError = (error: any) => {
		console.error('Row update error:', error);
	};

	const columns: GridColDef[] = [
		{
			field: 'machineFunctionName',
			headerName: 'Name of Machine Function',
			width: 250,
			editable: true,
		},
		{
			field: 'enabled',
			type: 'boolean',
			headerName: 'Enable Zone Balance',
			width: 300,
			editable: true,
		},
		{
			field: 'actions',
			headerName: 'Delete',
			width: 100,
			renderCell: (params) => (
				<IconButton onClick={() => handleDeleteRow(params.id)}>
					<Delete />
				</IconButton>
			),
			editable: false,
		},
	];

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<h4>Zone Balance</h4>
				<Button variant='text' onClick={handleAddRow} startIcon={<Add />}>
					Zone Balance
				</Button>
			</Stack>
			<>
				<DataGrid
					editMode='row'
					rows={rows}
					columns={columns}
					processRowUpdate={(updatedRow) => handleRowUpdate(updatedRow)}
					onProcessRowUpdateError={handleProcessRowUpdateError}
					autoHeight
				/>
			</>
		</>
	);
}

function AzureMaintenanceControlConfiguration() {
	const dispatch = useDispatch();
	const [allMaintenanceControl, setAllMaintenanceControl] = useState(false);
	const [maintenanceControlForm, setMaintenanceControlForm] = useState('');

	useEffect(() => {
		if (allMaintenanceControl) {
			setMaintenanceControlForm('*');
		}
		dispatch(putMaintenanceControl(maintenanceControlForm));
	}, [allMaintenanceControl, maintenanceControlForm, dispatch]);

	const tooltip =
		'Enter each machine function name, separated by a comma, i.e. MachineFunction1, MachineFunction2';

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<Stack direction='row' spacing={1} alignItems='center'>
					<h4>Azure Maintenance Control</h4>
					<CustomTooltip tooltip={tooltip} />
				</Stack>
				<FormControlLabel
					control={
						<Checkbox
							checked={allMaintenanceControl}
							onChange={(e) => setAllMaintenanceControl(e.target.checked)}
							size='small'
						/>
					}
					label='Enable All Machine Functions'
				/>
			</Stack>
			<TextField
				label='Machine Functions to Enable Maintenance Control'
				type='text'
				variant='outlined'
				value={maintenanceControlForm}
				onChange={(e) => setMaintenanceControlForm(e.target.value)}
				disabled={allMaintenanceControl}
				InputLabelProps={{ shrink: true }}
				style={{ width: 400 }}
			/>
		</>
	);
}

function SubscriptionConfiguration() {
	const dispatch = useDispatch();
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [id, setId] = useState(0);

	useEffect(() => {
		dispatch(putSubscriptions(rows as SubscriptionPayload[]));
	}, [dispatch, rows]);

	const handleDeleteRow = (id: GridRowId) => {
		const updatedRows = rows.filter((row) => row.id !== id);
		setRows(updatedRows);
	};

	const handleAddRow = () => {
		const newRow = {
			id,
			subscriptionIds: `${randomTraderName()},${randomTraderName()}`,
			environment: randomTraderName(),
			cluster: randomTraderName(),
			autopilotEnvType: '',
		};
		setRows([...rows, newRow]);
		setId(id + 1);
	};

	const handleRowUpdate = (updatedRow: any) => {
		setRows((prevRows) => {
			return prevRows.map((row) =>
				row.id === updatedRow.id ? updatedRow : row
			);
		});
		return updatedRow;
	};

	const handleCellUpdate = (params: any, e: any) => {
		params.api.setEditCellValue({
			id: params.id,
			field: params.field,
			value: e.target.value,
		});
		const updatedRows = rows.map((row) => {
			if (row.id === params.id) {
				return { ...row, [params.field]: e.target.value };
			}
			return row;
		});
		setRows(updatedRows);
	};

	const handleProcessRowUpdateError = (error: any) => {
		console.error('Row update error:', error);
	};

	const columns: GridColDef[] = [
		{
			field: 'subscriptionIds',
			headerName: 'Subscription Ids',
			width: 250,
			editable: true,
		},
		{
			field: 'environment',
			headerName: 'Name of Environment',
			width: 200,
			editable: true,
		},
		{
			field: 'cluster',
			headerName: 'Name of Cluster',
			width: 200,
			editable: true,
		},
		{
			field: 'autopilotEnvType',
			headerName: 'Environment Type',
			width: 200,
			editable: true,
			renderEditCell: (params: GridRenderEditCellParams) => (
				<FormControl fullWidth>
					<Select
						value={params.value}
						onChange={(e) => {
							handleCellUpdate(params, e);
						}}
						size='small'
					>
						{Object.values(EnvType).map((type) => (
							<MenuItem key={type} value={type} sx={{ height: 32 }}>
								{type}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			),
		},
		{
			field: 'actions',
			headerName: 'Delete',
			width: 100,
			renderCell: (params) => (
				<IconButton onClick={() => handleDeleteRow(params.id)}>
					<Delete />
				</IconButton>
			),
			editable: false,
		},
	];

	const tooltip = `There are 4 options for subscription configuration and will be formatted based on the filled inputs.
						\noption 1: SubscriptionIds=<<Replace with comma separated subscription guid>>
						option 2: Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>> 
						option 3: Cluster:<<Cluster name>>,Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>> 
						option 4: Cluster:<<Cluster name>>,AutopilotEnvType:<<Environment type>>$SubscriptionIds=<<Replace with comma separated subscription guid>>`;

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<Stack direction='row' spacing={1} alignItems='center'>
					<h4>Configure Subscription</h4>
					<CustomTooltip tooltip={tooltip} />
				</Stack>
				<Button variant='text' onClick={handleAddRow} startIcon={<Add />}>
					Subscription
				</Button>
			</Stack>
			<>
				<DataGrid
					editMode='row'
					rows={rows}
					columns={columns}
					processRowUpdate={(updatedRow) => handleRowUpdate(updatedRow)}
					onProcessRowUpdateError={handleProcessRowUpdateError}
					autoHeight
				/>
			</>
		</>
	);
}

function EncryptionAtHostConfiguration() {
	const dispatch = useDispatch();
	const [allEncryptionAtHost, setAllEncryptionAtHost] = useState(false);
	const [encryptionAtHostForm, setEncryptionAtHostForm] = useState('');

	useEffect(() => {
		if (allEncryptionAtHost) {
			setEncryptionAtHostForm('*');
		}
		dispatch(putEncryptionAtHost(encryptionAtHostForm));
	}, [allEncryptionAtHost, encryptionAtHostForm, dispatch]);

	const tooltip =
		'Enter each machine function name, separated by a comma, i.e. MachineFunction1, MachineFunction2';

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<Stack direction='row' spacing={1} alignItems='center'>
					<h4>Encryption At Host</h4>
					<CustomTooltip tooltip={tooltip} />
				</Stack>
				<FormControlLabel
					control={
						<Checkbox
							checked={allEncryptionAtHost}
							onChange={(e) => setAllEncryptionAtHost(e.target.checked)}
							size='small'
						/>
					}
					label='Enable All Machine Functions'
				/>
			</Stack>
			<TextField
				label='Machine Functions to Enable Encryption at Host'
				type='text'
				variant='outlined'
				value={encryptionAtHostForm}
				onChange={(e) => setEncryptionAtHostForm(e.target.value)}
				disabled={allEncryptionAtHost}
				InputLabelProps={{ shrink: true }}
				style={{ width: 400 }}
			/>
		</>
	);
}

function RegionalIPV4MFConfiguration() {
	const dispatch = useDispatch();
	const [allRegionalIPV4MF, setAllRegionalIPV4MF] = useState(false);
	const [regionalIPV4Form, setRegionalIPV4Form] = useState('');

	useEffect(() => {
		if (allRegionalIPV4MF) {
			setRegionalIPV4Form('*');
		}
		dispatch(putMaintenanceControl(regionalIPV4Form));
	}, [allRegionalIPV4MF, regionalIPV4Form, dispatch]);

	const tooltip =
		'Enter each machine function name, separated by a comma, i.e. MachineFunction1, MachineFunction2';

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<Stack direction='row' spacing={1} alignItems='center'>
					<h4>Regional IPV4</h4>
					<CustomTooltip tooltip={tooltip} />
				</Stack>
				<FormControlLabel
					control={
						<Checkbox
							checked={allRegionalIPV4MF}
							onChange={(e) => setAllRegionalIPV4MF(e.target.checked)}
							size='small'
						/>
					}
					label='Enable All Machine Functions'
				/>
			</Stack>
			<TextField
				label='Machine Functions to Enable Regional IPV4'
				type='text'
				variant='outlined'
				value={regionalIPV4Form}
				onChange={(e) => setRegionalIPV4Form(e.target.value)}
				disabled={allRegionalIPV4MF}
				InputLabelProps={{ shrink: true }}
				style={{ width: 400 }}
			/>
		</>
	);
}

function EapVMSSCustomTagConfiguration() {
	const dispatch = useDispatch();
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [id, setId] = useState(0);

	useEffect(() => {
		dispatch(putEapVMSSCustomTags(rows as VMSSCustomTagPayload[]));
	}, [dispatch, rows]);

	const handleDeleteRow = (id: GridRowId) => {
		const updatedRows = rows.filter((row) => row.id !== id);
		setRows(updatedRows);
	};

	const handleAddRow = () => {
		const newRow = {
			id,
			jsonName: randomTraderName(),
			machineFunctionName: randomTraderName(),
			machineGroupName: randomTraderName(),
		};
		setRows([...rows, newRow]);
		setId(id + 1);
	};

	const handleRowUpdate = (updatedRow: any) => {
		setRows((prevRows) => {
			return prevRows.map((row) =>
				row.id === updatedRow.id ? updatedRow : row
			);
		});
		return updatedRow;
	};

	const handleProcessRowUpdateError = (error: any) => {
		console.error('Row update error:', error);
	};

	const tooltip = 'Include .json extension in the field, i.e. filename.json';

	const columns: GridColDef[] = [
		{
			field: 'jsonName',
			headerName: 'JSON File',
			width: 250,
			editable: true,
			renderHeader: (params) => (
				<Stack direction='row' spacing={1} alignItems='center'>
					<span>{params.colDef.headerName}</span>
					<CustomTooltip tooltip={tooltip} size={18} />
				</Stack>
			),
		},
		{
			field: 'machineFunctionName',
			headerName: 'Name of Machine Function',
			width: 300,
			editable: true,
		},
		{
			field: 'machineGroupName',
			headerName: 'Name of Machine Group',
			width: 300,
			editable: true,
		},
		{
			field: 'actions',
			headerName: 'Delete',
			width: 100,
			renderCell: (params) => (
				<IconButton onClick={() => handleDeleteRow(params.id)}>
					<Delete />
				</IconButton>
			),
			editable: false,
		},
	];

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<h4>EAP VMSS Custom Tag</h4>
				<Button variant='text' onClick={handleAddRow} startIcon={<Add />}>
					VMSS Custom Tag
				</Button>
			</Stack>
			<>
				<DataGrid
					editMode='row'
					rows={rows}
					columns={columns}
					processRowUpdate={(updatedRow) => handleRowUpdate(updatedRow)}
					onProcessRowUpdateError={handleProcessRowUpdateError}
					autoHeight
				/>
			</>
		</>
	);
}

export default EnvironmentConfiguration;
