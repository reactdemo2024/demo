import {
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import {
	DataGrid,
	GridRowsProp,
	GridColDef,
	GridRowId,
} from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	AvailabilityZonesPayload,
	putAvailabilityZone,
	putAvailabilityZones,
} from '../../store/environment/availabilityZoneSlice';
import { putMaintenanceControl } from '../../store/environment/maintenanceControlSlice';
import { putZoneBalances } from '../../store/environment/zoneBalanceSlice';
import { putSubscriptions } from '../../store/environment/subscriptionSlice';
import { putRegionalIPV4MF } from '../../store/environment/regionalIPV4Slice';
import { putEncryptionAtHost } from '../../store/environment/encryptionHostSlice';
import { putCustomVMSSTags } from '../../store/environment/customVMSSTagSlice';
import { putCustomVMSSExtensions } from '../../store/environment/customVMSSExtensionSlice';
import { putTrustedLaunchMachineFunctions } from '../../store/environment/trustedLaunchMachineFunctionSlice';
import { LabelText, TooltipText } from '../../enum/environment.enum';
import {
	CustomDataGrid,
	CustomHeader,
	CustomTextInput,
	createDataGridColumns,
} from '../Common';
import {
	availabilityZoneColumns,
	customVMSSExtensionColumns,
	customVMSSTagColumns,
	outboundRuleColumns,
	azureSLBColumns,
	subscriptionColumns,
	zoneBalanceColumns,
	diskProfileColumns,
} from '../../enum/environment-columns.enum';
import { putAcceleratedNetworkingEnabledMachineFunctions } from '../../store/environment/acceleratedNetworkingEnabledMachineFunctionSlice';
import { putAcceleratedNetworkingInPlaceUpdate } from '../../store/environment/acceleratedNetworkingInPlaceUpdateSlice';
import { putOutboundRules } from '../../store/environment/outboundRuleSlice';
import { putAzureSLBs } from '../../store/environment/azureSLBSlice';
import { putDiskProfiles } from '../../store/environment/diskProfileSlice';

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
			<CustomVMSSTagConfiguration />
			<CustomVMSSExtensionConfiguration />
			<TrustedLaunchMachineFunctionConfiguration />
			<AcceleratedNetworkingConfiguration />
			<SNATOutboundConfiguration />
			<DiskProfileConfiguration />
		</>
	);
}

// TODO: refactor to toggle b/w text input and data grid
// ideas: might have to refactor the header portion into its own component to use the checkbox toggle
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
		const newRow = { id };
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

	const columns: GridColDef[] = createDataGridColumns(
		availabilityZoneColumns,
		handleDeleteRow
	);

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
	return (
		<>
			<CustomDataGrid
				columnList={zoneBalanceColumns}
				header='Zone Balance'
				buttonHeader='Zone Balance'
				putDispatch={putZoneBalances}
			/>
		</>
	);
}

function AzureMaintenanceControlConfiguration() {
	return (
		<>
			<CustomTextInput
				header='Azure Maintenance Control'
				inputLabel='Machine Functions to Enable Maintenance Control'
				putDispatch={putMaintenanceControl}
				showApplyToAllCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				tooltip={TooltipText.COMMA_SEPARATED}
			/>
		</>
	);
}

function SubscriptionConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={subscriptionColumns}
				header='Configure Subscriptions'
				buttonHeader='Subscription'
				putDispatch={putSubscriptions}
				tooltip={TooltipText.SUBSCRIPTION_OPTIONS}
			/>
		</>
	);
}

function EncryptionAtHostConfiguration() {
	return (
		<>
			<CustomTextInput
				header='Encryption At Host'
				inputLabel='Machine Functions to Enable Encryption at Host'
				putDispatch={putEncryptionAtHost}
				showApplyToAllCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				tooltip={TooltipText.COMMA_SEPARATED}
			/>
		</>
	);
}

function RegionalIPV4MFConfiguration() {
	return (
		<>
			<CustomTextInput
				header='Regional IPV4'
				inputLabel='Machine Functions to Enable Regional IPV4'
				putDispatch={putRegionalIPV4MF}
				showApplyToAllCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				tooltip={TooltipText.COMMA_SEPARATED}
			/>
		</>
	);
}

function CustomVMSSTagConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={customVMSSTagColumns}
				header='Custom VMSS Tags'
				buttonHeader='Tag'
				putDispatch={putCustomVMSSTags}
			/>
		</>
	);
}

function CustomVMSSExtensionConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={customVMSSExtensionColumns}
				header='Custom VMSS Extensions'
				buttonHeader='Extension'
				putDispatch={putCustomVMSSExtensions}
			/>
		</>
	);
}

function TrustedLaunchMachineFunctionConfiguration() {
	return (
		<>
			<CustomTextInput
				header='Trusted Launch'
				inputLabel='Machine Functions for Trusted Launch'
				putDispatch={putTrustedLaunchMachineFunctions}
				showApplyToAllCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				tooltip={TooltipText.COMMA_SEPARATED}
			/>
		</>
	);
}

function AcceleratedNetworkingConfiguration() {
	return (
		<>
			<CustomHeader
				text='Accelerated Networking'
				tooltip={TooltipText.COMMA_SEPARATED}
			/>
			<CustomTextInput
				inputLabel='Machine Functions for Accelerated Networking Enabled'
				putDispatch={putAcceleratedNetworkingEnabledMachineFunctions}
				showApplyToAllCheckbox={true}
				showHorizontalCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
			/>
			<CustomTextInput
				inputLabel='Machine Functions for Accelerated Networking In Place Update'
				putDispatch={putAcceleratedNetworkingInPlaceUpdate}
				showApplyToAllCheckbox={true}
				showHorizontalCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
			/>
		</>
	);
}

function SNATOutboundConfiguration() {
	return (
		<>
			<h3>SNAT / Outbound Rules</h3>
			<CustomDataGrid
				columnList={outboundRuleColumns}
				header='Outbound Rules'
				buttonHeader='Rule'
				putDispatch={putOutboundRules}
			/>
			<CustomDataGrid
				columnList={azureSLBColumns}
				header='Azure SLB Rules'
				buttonHeader='Rule'
				putDispatch={putAzureSLBs}
			/>
		</>
	);
}

// TODO: refactor so you can select from created disk profiles and the table shows the drive settings for the selected one
function DiskProfileConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={diskProfileColumns}
				header='Disk Profiles'
				buttonHeader='Disk Profile'
				putDispatch={putDiskProfiles}
				tooltip={TooltipText.DISK_PROFILE_CUSTOM_PROPERTIES}
			/>
		</>
	);
}

export default EnvironmentConfiguration;
