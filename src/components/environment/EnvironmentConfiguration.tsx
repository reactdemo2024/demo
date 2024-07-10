import { Stack } from '@mui/material';
import {
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
import { LabelText, Size, TooltipText, Url } from '../../enum/common.enum';
import {
	CustomDataGrid,
	CustomDataGridAndTextInputToggle,
	CustomTextInput,
	CustomTooltip,
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
} from '../../data/environment-columns';
import { putAcceleratedNetworkingEnabledMachineFunctions } from '../../store/environment/acceleratedNetworkingEnabledMachineFunctionSlice';
import { putAcceleratedNetworkingInPlaceUpdate } from '../../store/environment/acceleratedNetworkingInPlaceUpdateSlice';
import { putOutboundRules } from '../../store/environment/outboundRuleSlice';
import { putAzureSLBs } from '../../store/environment/azureSLBSlice';
import { putDiskProfiles } from '../../store/environment/diskProfileSlice';

function EnvironmentConfiguration() {
	return (
		<>
			<Stack direction='row' spacing={1} sx={{ my: 3 }}>
				<h2>Environment Configuration</h2>
				<CustomTooltip
					link={Url.EAP_DOCUMENTATION}
					size={Size.QUESTION_MARK_ICON_LARGE}
				/>
			</Stack>
			<Stack direction='column' spacing={3}>
				<AzureComputeManagerConfiguration />
			</Stack>
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

function AvailabilityZoneConfiguration() {
	return (
		<>
			<CustomDataGridAndTextInputToggle
				columnList={availabilityZoneColumns}
				header='Availability Zones'
				buttonHeader='Availability Zone'
				putDispatchDataGrid={putAvailabilityZones}
				putDispatchTextInput={putAvailabilityZone}
				reducerDataGrid='availabilityZones.availabilityZones'
				reducerTextInput='availabilityZones.availabilityZone'
				inputLabel='Availability Zone'
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				tooltipTextInput={TooltipText.COMMA_SEPARATED}
			/>
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
				reducer='zoneBalances'
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
				showHorizontalCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				tooltip={TooltipText.COMMA_SEPARATED}
				reducer='maintenanceControl'
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
				reducer='subscriptions'
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
				showHorizontalCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				tooltip={TooltipText.COMMA_SEPARATED}
				reducer='hostEncryption'
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
				showHorizontalCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				tooltip={TooltipText.COMMA_SEPARATED}
				reducer='regionalIPV4'
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
				reducer='customVMSSTags'
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
				reducer='customVMSSExtensions'
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
				showHorizontalCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				tooltip={TooltipText.COMMA_SEPARATED}
				reducer='trustedLaunchMachineFunctions'
			/>
		</>
	);
}

function AcceleratedNetworkingConfiguration() {
	return (
		<>
			<CustomTextInput
				header='Accelerated Networking'
				tooltip={TooltipText.COMMA_SEPARATED}
				inputLabel='Machine Functions for Accelerated Networking Enabled'
				putDispatch={putAcceleratedNetworkingEnabledMachineFunctions}
				showApplyToAllCheckbox={true}
				showHorizontalCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				reducer='acceleratedNetworkingEnabledMachineFunctions'
			/>
			<CustomTextInput
				inputLabel='Machine Functions for Accelerated Networking In Place Update'
				putDispatch={putAcceleratedNetworkingInPlaceUpdate}
				showApplyToAllCheckbox={true}
				showHorizontalCheckbox={true}
				checkboxLabel={LabelText.ENABLE_ALL_MACHINE_FUNCTIONS}
				reducer='acceleratedNetworkingInPlaceUpdate'
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
				reducer='outboundRules'
			/>
			<CustomDataGrid
				columnList={azureSLBColumns}
				header='Azure SLB Rules'
				buttonHeader='Rule'
				putDispatch={putAzureSLBs}
				reducer='azureSLBs'
			/>
		</>
	);
}

function DiskProfileConfiguration() {
	return (
		<>
			<CustomDataGrid
				columnList={diskProfileColumns}
				header='Disk Profiles'
				buttonHeader='Disk Profile'
				putDispatch={putDiskProfiles}
				tooltip={TooltipText.DISK_PROFILE_CUSTOM_PROPERTIES}
				reducer='diskProfiles'
			/>
		</>
	);
}

export default EnvironmentConfiguration;
