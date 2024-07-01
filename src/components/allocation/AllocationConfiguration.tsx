import {
	TextField,
	Stack,
	FormControlLabel,
	Checkbox,
	Typography,
	Button,
	Divider,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
} from '@mui/material';
import { NoteAdd } from '@mui/icons-material';
import { setComputeDefinition } from '../../store/allocation/computeDefinitionSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
	putAutoscaleProfile,
	putMachineFunction,
	putMachineGroupName,
	putAutoscaleRule,
} from '../../store/allocation/machineFunctionSlice';
import { putMachineGroup } from '../../store/allocation/machineGroupSlice';
import { putAutoscaleMetric } from '../../store/allocation/autoscaleMetricSlice';
import {
	AllocationType,
	MetricAggregation,
	MetricSource,
	Operator,
	ProfileType,
	SamplingType,
	ScaleDirection,
	ScaleType,
} from '../../enum/allocation.enum';
import { useEffect, useState } from 'react';
import { MachineGroup } from '../../interface/allocation/machine-group.interface';
import { AutoscaleProfile } from '../../interface/allocation/autoscale-profile.interface';
import { AutoscaleRule } from '../../interface/allocation/autoscale-rule.interface';
import { AutoscaleMetric } from '../../interface/allocation/autoscale-metric.interface';

function AllocationConfiguration() {
	return (
		<>
			<h2>Allocation Configuration</h2>
			<Stack direction='column' spacing={3}>
				{/* <ComputeDefinitionConfiguration /> */}
				<MachineFunctionConfiguration />
			</Stack>
		</>
	);
}

function AutoscaleMetricConfiguration({
	machineFunctionName,
	autoscaleProfileName,
	autoscaleRuleName,
}: {
	machineFunctionName: string;
	autoscaleProfileName: string;
	autoscaleRuleName: string;
}) {
	const dispatch = useDispatch();
	const [autoscaleMetricForm, setAutoscaleMetricForm] = useState({
		name: '',
		metricSource: MetricSource.MDM,
		metricAccount: '',
		metricNamespace: '',
		metricName: '',
		samplingType: SamplingType.AVERAGE,
		metricAggregation: MetricAggregation.AVERAGE,
		metricIncludeFilters: '',
		metricExcludeFilters: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAutoscaleMetricForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddAutoscaleMetric = (autoscaleMetric: AutoscaleMetric) => {
		dispatch(putAutoscaleMetric(autoscaleMetric));
	};

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<h3>Autoscale Metric</h3>
				<Button
					variant='outlined'
					startIcon={<NoteAdd />}
					onClick={() => handleAddAutoscaleMetric(autoscaleMetricForm)}
				>
					Add Autoscale Profile
				</Button>
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					name='name'
					label='Autoscale Metric Name'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleMetricForm.name}
					onChange={handleInputChange}
				/>
				<TextField
					name='metricAccount'
					label='Metric Account'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleMetricForm.metricAccount}
					onChange={handleInputChange}
				/>
				<TextField
					name='metricNamespace'
					label='Metric Namespace'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleMetricForm.metricNamespace}
					onChange={handleInputChange}
				/>
				<TextField
					name='metricName'
					label='Metric Name'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleMetricForm.metricName}
					onChange={handleInputChange}
				/>
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					name='samplingType'
					label='Sampling Type'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleMetricForm.samplingType}
					onChange={handleInputChange}
				/>
				<TextField
					name='metricAggregation'
					label='Metric Aggregation'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleMetricForm.metricAggregation}
					onChange={handleInputChange}
				/>
				<TextField
					name='metricIncludeFilters'
					label='Metric Include Filters'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleMetricForm.metricIncludeFilters}
					onChange={handleInputChange}
				/>
				<TextField
					name='metricExcludeFilters'
					label='Metric Exclude Filters'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleMetricForm.metricExcludeFilters}
					onChange={handleInputChange}
				/>
			</Stack>
		</>
	);
}

function AutoscaleRuleConfiguration({
	machineFunctionName,
	autoscaleProfileName,
}: {
	machineFunctionName: string;
	autoscaleProfileName: string;
}) {
	const autoscaleMetrics: AutoscaleMetric[] = useSelector(
		(state: any) => state.autoscaleMetrics
	);

	const dispatch = useDispatch();
	const [autoscaleRuleForm, setAutoscaleRuleForm] = useState({
		name: '',
		timeWindow: '',
		metric: {} as AutoscaleMetric,
		operator: Operator.GREATER_THAN,
		threshold: 0,
		scaleDirection: ScaleDirection.INCREASE,
		scaleType: ScaleType.PERCENT_CHANGE_COUNT,
		scaleValue: 0,
		cooldown: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAutoscaleRuleForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleMetricChange = (e: any) => {
		setAutoscaleRuleForm((prevState) => ({
			...prevState,
			metric: e.target.value,
		}));
	};

	const handleAddAutoscaleRule = (
		machineFunctionName: string,
		autoscaleProfileName: string,
		autoscaleRule: AutoscaleRule
	) => {
		dispatch(
			putAutoscaleRule({
				machineFunctionName,
				autoscaleProfileName,
				autoscaleRule,
			})
		);
	};

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<h3>Autoscale Rules</h3>
				<Button
					variant='outlined'
					startIcon={<NoteAdd />}
					onClick={() =>
						handleAddAutoscaleRule(
							machineFunctionName,
							autoscaleProfileName,
							autoscaleRuleForm
						)
					}
				>
					Add Autoscale Rule
				</Button>
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					name='name'
					label='Autoscale Rule Name'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleRuleForm.name}
					onChange={handleInputChange}
				/>
				<FormControl variant='outlined' required style={{ minWidth: 200 }}>
					<InputLabel id='metric-label'>Autoscale Metric</InputLabel>
					<Select
						labelId='metric-label'
						name='metric'
						value={autoscaleRuleForm.metric}
						onChange={handleMetricChange}
						fullWidth={true}
					>
						{autoscaleMetrics.map((metric) => (
							<MenuItem key={metric.name} value={metric.name}>
								{metric.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					name='timeWindow'
					label='Time Window'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleRuleForm.timeWindow}
					onChange={handleInputChange}
				/>
				<TextField
					name='operator'
					label='Operator'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleRuleForm.operator}
					onChange={handleInputChange}
				/>
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					name='threshold'
					label='Threshold'
					required={true}
					type='number'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleRuleForm.threshold}
					onChange={handleInputChange}
				/>
				<TextField
					name='scaleDirection'
					label='Scale Direction'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleRuleForm.scaleDirection}
					onChange={handleInputChange}
				/>
				<TextField
					name='scaleType'
					label='Scale Type'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleRuleForm.scaleType}
					onChange={handleInputChange}
				/>
				<TextField
					name='scaleValue'
					label='Scale Value'
					required={true}
					type='number'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleRuleForm.scaleValue}
					onChange={handleInputChange}
				/>
				<TextField
					name='cooldown'
					label='Cooldown'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleRuleForm.cooldown}
					onChange={handleInputChange}
				/>
			</Stack>
			<AutoscaleMetricConfiguration
				machineFunctionName={machineFunctionName}
				autoscaleProfileName={autoscaleProfileName}
				autoscaleRuleName={autoscaleRuleForm.name}
			/>
		</>
	);
}

function AutoscaleProfileConfiguration({
	machineFunctionName,
}: {
	machineFunctionName: string;
}) {
	const dispatch = useDispatch();
	const [autoscaleProfileForm, setAutoscaleProfileForm] = useState({
		name: '',
		minMachineCount: 0,
		defaultMachineCount: 0,
		maxMachineCount: 0,
		profileType: ProfileType.METRIC_BASED,
		autoscaleRules: [] as AutoscaleRule[],
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAutoscaleProfileForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddAutoscaleProfile = (
		machineFunctionName: string,
		autoscaleProfile: AutoscaleProfile
	) => {
		dispatch(putAutoscaleProfile({ machineFunctionName, autoscaleProfile }));
	};

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<h3>Autoscale Profiles</h3>
				<Button
					variant='outlined'
					startIcon={<NoteAdd />}
					onClick={() =>
						handleAddAutoscaleProfile(machineFunctionName, autoscaleProfileForm)
					}
				>
					Add Autoscale Profile
				</Button>
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					name='name'
					label='Autoscale Profile Name'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleProfileForm.name}
					onChange={handleInputChange}
				/>
				<TextField
					name='minMachineCount'
					label='Minimum Machine Count'
					required={true}
					type='number'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleProfileForm.minMachineCount}
					onChange={handleInputChange}
				/>
				<TextField
					name='defaultMachineCount'
					label='Default Machine Count'
					required={true}
					type='number'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleProfileForm.defaultMachineCount}
					onChange={handleInputChange}
				/>
				<TextField
					name='maxMachineCount'
					label='Maximum Machine Count'
					required={true}
					type='number'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={autoscaleProfileForm.maxMachineCount}
					onChange={handleInputChange}
				/>
			</Stack>
			<AutoscaleRuleConfiguration
				machineFunctionName={machineFunctionName}
				autoscaleProfileName={autoscaleProfileForm.name}
			/>
		</>
	);
}

function MachineGroupConfiguration({
	machineFunctionName,
}: {
	machineFunctionName: string;
}) {
	const dispatch = useDispatch();
	const [machineGroupForm, setMachineGroupForm] = useState({
		name: '',
		numberOfMachines: 0,
		sku: '',
		numberOfScaleUnits: 0,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMachineGroupForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddMachineGroup = (
		machineFunctionName: string,
		machineGroup: MachineGroup
	) => {
		dispatch(
			putMachineGroupName({
				machineFunctionName,
				machineGroupName: machineGroupForm.name,
			})
		);
		dispatch(putMachineGroup(machineGroup));
	};

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<h3>Machine Groups</h3>
				<Button
					variant='outlined'
					startIcon={<NoteAdd />}
					onClick={() =>
						handleAddMachineGroup(machineFunctionName, machineGroupForm)
					}
				>
					Add Machine Group
				</Button>
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					name='name'
					label='Machine Group Name'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={machineGroupForm.name}
					onChange={handleInputChange}
				/>
				<TextField
					name='numberOfMachines'
					label='Number of Machines'
					required={true}
					type='number'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={machineGroupForm.numberOfMachines}
					onChange={handleInputChange}
				/>
				<TextField
					name='sku'
					label='SKU'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={machineGroupForm.sku}
					onChange={handleInputChange}
				/>
				<TextField
					name='numberOfScaleUnits'
					label='Number of Scale Units'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={machineGroupForm.numberOfScaleUnits}
					onChange={handleInputChange}
				/>
			</Stack>
			<Divider />
		</>
	);
}

function MachineFunctionConfiguration() {
	const dispatch = useDispatch();
	const [useMachineGroups, setUseMachineGroups] = useState(false);
	const [enableAutoscaleProfiles, setEnableAutoscaleProfiles] = useState(false);
	const [machineFunctionForm, setMachineFunctionForm] = useState({
		name: '',
		allocationType: AllocationType.AZURE_VM,
		numberOfMachines: 0,
		sku: '',
		machineGroups: [],
		autoscaleProfiles: [] as AutoscaleProfile[],
	});

	// clears the appropriate fields for machine function form when useMachineGroups is toggled
	useEffect(() => {
		if (useMachineGroups) {
			setMachineFunctionForm((prevState) => ({
				...prevState,
				sku: '',
			}));
		} else {
			setMachineFunctionForm((prevState) => ({
				...prevState,
				machineGroups: [],
			}));
		}

		if (!enableAutoscaleProfiles) {
			setMachineFunctionForm((prevState) => ({
				...prevState,
				autoscaleProfiles: [],
			}));
		}
	}, [
		useMachineGroups,
		enableAutoscaleProfiles,
		machineFunctionForm.machineGroups,
	]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMachineFunctionForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddMachineFunction = () => {
		dispatch(putMachineFunction(machineFunctionForm));
	};

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center' sx={{ mt: 0 }}>
				<h3>Machine Functions</h3>
				<Button
					variant='outlined'
					startIcon={<NoteAdd />}
					onClick={handleAddMachineFunction}
				>
					Add Machine Function
				</Button>
				<Stack direction='column' spacing={-2}>
					<FormControlLabel
						control={
							<Checkbox
								checked={useMachineGroups}
								onChange={(event) => setUseMachineGroups(event.target.checked)}
								size='small'
							/>
						}
						label={<Typography variant='body2'>Use Machine Groups</Typography>}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={enableAutoscaleProfiles}
								onChange={(event) =>
									setEnableAutoscaleProfiles(event.target.checked)
								}
								size='small'
							/>
						}
						label={
							<Typography variant='body2'>Enable Autoscale Profiles</Typography>
						}
					/>
				</Stack>
			</Stack>

			<Stack direction='row' spacing={2}>
				<TextField
					name='name'
					label='Machine Function Name'
					required={true}
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={machineFunctionForm.name}
					onChange={handleInputChange}
				/>
				{!useMachineGroups && (
					<>
						<TextField
							name='numberOfMachines'
							label='Number of Machines'
							required={true}
							type='number'
							variant='outlined'
							InputLabelProps={{ shrink: true }}
							value={machineFunctionForm.numberOfMachines}
							onChange={handleInputChange}
						/>
						<TextField
							name='sku'
							label='SKU'
							required={true}
							type='text'
							variant='outlined'
							InputLabelProps={{ shrink: true }}
							value={machineFunctionForm.sku}
							onChange={handleInputChange}
						/>
					</>
				)}
			</Stack>
			{useMachineGroups && (
				<MachineGroupConfiguration
					machineFunctionName={machineFunctionForm.name}
				/>
			)}
			{enableAutoscaleProfiles && (
				<AutoscaleProfileConfiguration
					machineFunctionName={machineFunctionForm.name}
				/>
			)}
		</>
	);
}

function ComputeDefinitionConfiguration() {
	const dispatch = useDispatch();

	const [computeDefinitionForm, setComputeDefinitionForm] = useState({
		subscriptionId: '',
		sku: '',
		requestedNodeLabels: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setComputeDefinitionForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	useEffect(() => {
		dispatch(setComputeDefinition(computeDefinitionForm));
	}, [computeDefinitionForm, dispatch]);

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				<h3>Compute Definition</h3>
				<small>(optional - applies to all machine functions)</small>
			</Stack>
			<Stack direction='row' spacing={2}>
				<TextField
					name='subscriptionId'
					label='Subscription ID'
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={computeDefinitionForm.subscriptionId}
					onChange={handleInputChange}
				/>
				<TextField
					name='sku'
					label='SKU'
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={computeDefinitionForm.sku}
					onChange={handleInputChange}
				/>
				<TextField
					name='requestedNodeLabels'
					label='Requested Node Labels'
					type='text'
					variant='outlined'
					InputLabelProps={{ shrink: true }}
					value={computeDefinitionForm.requestedNodeLabels}
					onChange={handleInputChange}
				/>
			</Stack>
			<Divider />
		</>
	);
}

export default AllocationConfiguration;
