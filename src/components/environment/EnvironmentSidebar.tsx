import { FileDownload, FileCopy } from '@mui/icons-material';
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
import { useEffect, useState } from 'react';
import store from '../../store/store';
import { CustomVMSSExtensionPayload } from '../../store/environment/customVMSSExtensionSlice';
import { OutboundRulePayload } from '../../store/environment/outboundRuleSlice';
import { AzureSLBPayload } from '../../store/environment/azureSLBSlice';
import { Font, Size } from '../../enum/common.enum';
import { useDispatch } from 'react-redux';
import { putEnvironmentPreview } from '../../store/environment/environmentPreviewSlice';

const generateEnvironmentIni = () => {
	const state = store.getState();
	const availabilityZones = state.availabilityZones;
	const zoneBalances = state.zoneBalances;
	const maintenanceControl = state.maintenanceControl;
	const subscriptions = state.subscriptions;
	const hostEncryption = state.hostEncryption;
	const regionalIPV4 = state.regionalIPV4;
	const customVMSSTags = state.customVMSSTags;
	const customVMSSExtensions = state.customVMSSExtensions;
	const trustedLaunchMachineFunctions = state.trustedLaunchMachineFunctions;
	const acceleratedNetworkingEnabledMachineFunctions =
		state.acceleratedNetworkingEnabledMachineFunctions;
	const acceleratedNetworkingInPlaceUpdate =
		state.acceleratedNetworkingInPlaceUpdate;
	const outboundRules = state.outboundRules;
	const azureSLBs = state.azureSLBs;
	const diskProfiles = state.diskProfiles;

	let result = '[AzureComputeManager]\n';

	// DiskProfile_MF=Foo or DiskProfile=Foo
	diskProfiles?.forEach((dp) => {
		if (dp.machineFunctions) {
			const machineFunctions = dp.machineFunctions.split(',');
			machineFunctions.forEach((mf) => {
				result += `DiskProfile_${mf.trim()}=${dp.name}\n`;
			});
		} else result += `DiskProfile=${dp.name}\n`;
	});

	// AvailabilityZones_<MF>=<zone number>

	availabilityZones.availabilityZones?.forEach((az) => {
		result += `AvailabilityZones_${az.machineFunctionName}=${az.availabilityZone}\n`;
	});
	if (availabilityZones.availabilityZone) {
		result += `AvailabilityZones=${availabilityZones.availabilityZone}\n`;
	}

	// Zonebalance_MF1=true or Zonebalance_MF2=false
	zoneBalances?.forEach((zb) => {
		result += `Zonebalance_${zb.machineFunctionName}=${!!zb.enabled}\n`;
	});

	// EnableAzureMaintenanceControl=MF1,MF2
	if (maintenanceControl) {
		result += `EnableAzureMaintenanceControl=${maintenanceControl}\n`;
	}

	/**
	 * 3 ways to configure subscriptions
	 * depending on what is filled, will change formatting
	 *
	 * environment level subscription
	 * There are 3 options for subscription configuration and will be formatted based on the filled inputs.
	 * option 1: SubscriptionIds=<<Replace with comma separated subscription guid>>
	 * option 2: Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>>
	 * option 3: Cluster:<<Cluster name>>,Environment:<<Environment name>>$SubscriptionIds=<<Replace with comma separated subscription guid>>
	 *
	 */
	subscriptions?.forEach((s) => {
		if (s.cluster && s.environment) {
			// option 3
			result += `Cluster:${s.cluster},Environment:${s.environment}`;
			result += s.subscriptionIds
				? `$SubscriptionIds=${s.subscriptionIds}`
				: '';
			result += '\n';
		} else if (s.environment) {
			// option 2
			result += `Environment:${s.environment}`;
			result += s.subscriptionIds
				? `$SubscriptionIds=${s.subscriptionIds}`
				: '';
			result += '\n';
		} else if (s.subscriptionIds) {
			// option 1
			result += `SubscriptionIds=${s.subscriptionIds}\n`;
		}
		// result += s.customProperties ? `$${s.customProperties}\n` : '';
	});

	// EncryptionAtHost=MF1 or all: EncryptionAtHost=*
	if (hostEncryption) {
		result += `EncryptionAtHost=${hostEncryption}\n`;
	}

	// RegionalIPV4MF=MF1 or all: RegionalIPV4MF=*
	if (regionalIPV4) {
		result += `RegionalIPV4MF=${regionalIPV4}\n`;
	}

	// CustomVMSSTags.json
	customVMSSTags?.forEach((cvt) => {
		result += `EAPVMSS${cvt.jsonName}=`;
		if (cvt.machineGroupName) {
			result += `${cvt.machineFunctionName}_${cvt.machineGroupName}\n`;
		} else result += `${cvt.machineFunctionName}\n`;
	});

	// TrustedLaunchMachineFunction=MF1 or all: TrustedLaunchMachineFunction=*
	if (trustedLaunchMachineFunctions) {
		result += `TrustedLaunchMachineFunction=${trustedLaunchMachineFunctions}\n`;
	}

	if (acceleratedNetworkingEnabledMachineFunctions) {
		result += `AcceleratedNetworkingEnabledMachineFunctions=${acceleratedNetworkingEnabledMachineFunctions}\n`;
	}

	if (acceleratedNetworkingInPlaceUpdate) {
		result += `AcceleratedNetworkingInPlaceUpdate=${acceleratedNetworkingInPlaceUpdate}\n`;
	}

	// [CustomVMSSExtension.<ExtensionName>]
	// Type=<VMSS Extension Type>
	// Publisher=<VMSS Extension Publisher>
	// TypeHandlerVersion=<VMSS Extension version string>
	customVMSSExtensions?.forEach((cve) => {
		result += `\n[CustomVMSSExtension.${cve.name}]\n`;
		Object.keys(cve).forEach((key) => {
			if (key !== 'name' && key !== 'id') {
				const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
				result += cve[key as keyof CustomVMSSExtensionPayload]
					? `${formatKey}=${cve[key as keyof CustomVMSSExtensionPayload]}\n`
					: '';
			}
		});
	});

	// [OutboundRule.{Outbound Rule identifier name}]
	// AllocatedOutboundPorts={number of ports}
	// IdleTimeoutInMinutes={time in minutes}
	// EnableTcpReset={true | false}
	// Protocol={protocolName}
	outboundRules?.forEach((or) => {
		result += `\n[OutboundRule.${or.name}]\n`;
		Object.keys(or).forEach((key) => {
			if (key !== 'name' && key !== 'id') {
				const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
				result += or[key as keyof OutboundRulePayload]
					? `${formatKey}=${or[key as keyof OutboundRulePayload]}\n`
					: '';
			}
		});
	});

	// [AzureSLB.SNAT1]
	// MachineFunction=MF1
	// OutboundRules={Outbound Rule identifier name 1},{Outbound Rule identifier name 2},...
	// NumberOfIPs={n}
	// Scope=Internet
	// SKU=Standard
	azureSLBs?.forEach((aslb) => {
		result += `\n[AzureSLB.${aslb.name}]\n`;
		Object.keys(aslb).forEach((key) => {
			if (key !== 'name' && key !== 'id') {
				const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
				result += aslb[key as keyof AzureSLBPayload]
					? `${formatKey}=${aslb[key as keyof AzureSLBPayload]}\n`
					: '';
			}
		});
		result += `Scope=Internet\nSKU=Standard\n`;
	});

	// [DiskProfile.<profile name>]
	diskProfiles?.forEach((dp) => {
		result += `\n[DiskProfile.${dp.name}]\n`;
		// C
		if (dp.cDiskSize && dp.cStorageAccountType) {
			result += `C=${dp.cDiskSize},${dp.cStorageAccountType}\n`;
		} else {
			const line = dp.cDiskSize
				? `C=${dp.cDiskSize}\n`
				: `C=${dp.cStorageAccountType}\n`;
			result += line;
		}

		// D
		if (dp.dDiskSize || dp.dStorageAccountType) {
			if (dp.dDiskSize && dp.dStorageAccountType) {
				result += `D=${dp.dDiskSize},${dp.dStorageAccountType}`;
			} else {
				const line = dp.dDiskSize
					? `D=${dp.dDiskSize}`
					: `D=${dp.dStorageAccountType}`;
				result += line;
			}
			if (dp.dCachingType) result += `,${dp.dCachingType}`;
			if (dp.dIsPersistent) result += `,${dp.dIsPersistent}`;
			result += '\n';
		}

		// E
		if (dp.eDiskSize || dp.eStorageAccountType) {
			if (dp.eDiskSize && dp.eStorageAccountType) {
				result += `E=${dp.eDiskSize},${dp.eStorageAccountType}`;
			} else {
				const line = dp.eDiskSize
					? `E=${dp.eDiskSize}`
					: `E=${dp.eStorageAccountType}`;
				result += line;
			}
			if (dp.eCachingType) result += `,${dp.eCachingType}`;
			if (dp.eIsPersistent) result += `,${dp.eIsPersistent}`;
			result += '\n';
		}

		if (dp.customProperties) {
			dp.customProperties.split(',').forEach((cp) => {
				result += `${cp}\n`;
			});
		}
	});

	return result;
};

function EnvironmentSidebar() {
	const dispatch = useDispatch();
	const state = store.getState();
	const dataFromStore = state.environmentPreview;

	const [open, setOpen] = useState(false);
	const [storeJson, setStoreJson] = useState(dataFromStore);

	useEffect(() => {
		dispatch(putEnvironmentPreview(storeJson));
	}, [dispatch, storeJson]);

	const handleOpen = () => {
		const environmentIni = generateEnvironmentIni();
		setStoreJson(environmentIni);
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
		element.download = 'environment.ini';
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
					ml: '25px',
					mb: '20px',
				}}
			>
				Generate Environment.ini
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
					<DialogTitle variant='h6'>environment.ini</DialogTitle>
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
					mt: 1,
				}}
			>
				<EnvironmentPreview storeJson={storeJson} />
			</Stack>
		</>
	);
}

function EnvironmentPreview({ storeJson }: { storeJson: string }) {
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

export default EnvironmentSidebar;
