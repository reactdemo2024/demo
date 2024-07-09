import {
	DataGrid,
	GridColDef,
	GridColType,
	GridColumnHeaderParams,
	GridRenderCellParams,
	GridRowId,
	GridRowsProp,
} from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';
import {
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { Delete, InfoOutlined, Add } from '@mui/icons-material';
import { Size, TooltipText } from '../enum/common.enum';
import { useDispatch } from 'react-redux';
import store from '../store/store';
import { AvailabilityZonesPayload } from '../store/environment/availabilityZoneSlice';

export const customPropertiesColumn = [
	{
		field: 'customProperties',
		headerName: 'Custom Properties',
		width: 300,
		renderHeader: {
			text: TooltipText.CUSTOM_PROPERTIES,
		},
	},
];

interface CustomTooltipProps {
	tooltip: string;
	size?: number;
}

interface CustomRenderHeaderWithTooltipProps {
	params: GridColumnHeaderParams;
	text: string;
}

interface CustomDataGridProps {
	columnList: any[];
	header?: string;
	buttonHeader: string;
	putDispatch: Function;
	tooltip?: string;
	reducer?: string;
}

interface CustomTextInputProps {
	header?: string;
	inputLabel: string;
	putDispatch: Function;
	showApplyToAllCheckbox?: boolean;
	showHorizontalCheckbox?: boolean;
	checkboxLabel?: string;
	tooltip?: string;
	reducer?: string;
}

interface CustomDataGridAndTextInputToggleProps {
	columnList: any[];
	header?: string;
	buttonHeader: string;
	putDispatchDataGrid: Function;
	putDispatchTextInput: Function;
	reducerDataGrid: string;
	reducerTextInput: string;
	tooltipDataGrid?: string;
	tooltipTextInput?: string;
	inputLabel: string;
	checkboxLabel?: string;
}

interface CustomCheckboxProps {
	checkboxLabel?: string;
	isChecked: boolean;
	setIsChecked: Function;
	setTextInput?: Function;
}

interface CustomHeaderProps {
	text: string;
	tooltip?: string;
}

export const CustomTooltip: FC<CustomTooltipProps> = ({ tooltip, size }) => {
	return (
		<Tooltip
			title={
				<Typography
					sx={{ whiteSpace: 'pre-line', fontSize: Size.TOOLTIP_ICON }}
				>
					{tooltip}
				</Typography>
			}
			PopperProps={{
				sx: {
					'& .MuiTooltip-tooltip': {
						maxWidth: 'none',
						width: 'auto',
					},
				},
			}}
		>
			<InfoOutlined sx={{ fontSize: size || 20 }} />
		</Tooltip>
	);
};

export const CustomRenderHeaderWithTooltip: FC<
	CustomRenderHeaderWithTooltipProps
> = ({ params, text }) => {
	return (
		<Stack direction='row' spacing={1} alignItems='center'>
			<span>{params.colDef.headerName}</span>
			<CustomTooltip tooltip={text} size={Size.TOOLTIP_TEXT} />
		</Stack>
	);
};

export function createDataGridColumns(
	columnTemplate: any[],
	handleDeleteRow: any
) {
	const columns = [
		...columnTemplate.map((col) => {
			const baseMinWidth = 150;
			const minWidth = Math.max(
				baseMinWidth,
				col.renderHeader
					? col.headerName.length * 10 + 50
					: col.headerName.length * 10
			);

			return {
				field: col.field,
				headerName: col.headerName,
				type: col?.type as GridColType,
				flex: 1,
				minWidth: col.width || minWidth,
				editable: true,
				disableColumnMenu: true,
				valueOptions: col?.valueOptions
					? ['', ...Object.values(col.valueOptions)]
					: [],
				renderHeader:
					col.renderHeader &&
					((params) => (
						<CustomRenderHeaderWithTooltip
							params={params}
							text={col.renderHeader!.text}
						/>
					)),
			} as GridColDef;
		}),
		{
			field: 'actions',
			headerName: 'Delete',
			width: 100,
			disableColumnMenu: true,
			renderCell: (params: GridRenderCellParams) => (
				<IconButton onClick={() => handleDeleteRow(params.id)}>
					<Delete />
				</IconButton>
			),
			editable: false,
		},
	];

	return columns;
}

export const CustomDataGrid: FC<CustomDataGridProps> = ({
	columnList,
	header,
	buttonHeader,
	putDispatch,
	tooltip,
	reducer,
}) => {
	const dispatch = useDispatch();
	const state = store.getState();

	let dataFromStore: any[];
	if (reducer) {
		const [rootReducer, subReducer] = reducer.includes('.')
			? reducer.split('.')
			: [reducer, undefined];
		const dataFromRootStore = state[rootReducer as keyof typeof state] as any[];
		dataFromStore =
			subReducer && Object.keys(dataFromRootStore).length > 0
				? dataFromRootStore[subReducer as keyof typeof dataFromRootStore]
				: Array.isArray(dataFromRootStore)
				? dataFromRootStore
				: [];
	} else dataFromStore = [];

	const [rows, setRows] = useState<GridRowsProp>(
		dataFromStore as GridRowsProp[]
	);

	const [id, setId] = useState(
		dataFromStore[dataFromStore.length - 1]?.id + 1 || 0
	);

	useEffect(() => {
		dispatch(putDispatch(rows));
	}, [dispatch, putDispatch, rows]);

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

	const columns = createDataGridColumns(columnList, handleDeleteRow);

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				{header && <CustomHeader text={header} tooltip={tooltip} />}
				<Button variant='text' onClick={handleAddRow} startIcon={<Add />}>
					{buttonHeader}
				</Button>
			</Stack>
			<>
				{rows.length > 0 && (
					<DataGrid
						editMode='row'
						rows={rows}
						columns={columns}
						processRowUpdate={(updatedRow) => handleRowUpdate(updatedRow)}
						onProcessRowUpdateError={handleProcessRowUpdateError}
						autoHeight
					/>
				)}
			</>
		</>
	);
};

export const CustomTextInput: FC<CustomTextInputProps> = ({
	header,
	inputLabel,
	putDispatch,
	showApplyToAllCheckbox,
	showHorizontalCheckbox,
	checkboxLabel,
	tooltip,
	reducer,
}) => {
	const dispatch = useDispatch();
	const state = store.getState();

	let dataFromStore;
	if (reducer) {
		const [rootReducer, subReducer] = reducer.includes('.')
			? reducer.split('.')
			: [reducer, undefined];
		const dataFromRootStore = state[rootReducer as keyof typeof state];
		dataFromStore =
			subReducer && dataFromRootStore
				? dataFromRootStore[subReducer as keyof typeof dataFromRootStore]
				: dataFromRootStore || '';
	} else dataFromStore = '';

	const initialCheckboxState = dataFromStore === '*';
	const [isChecked, setIsChecked] = useState(initialCheckboxState);
	const [textInput, setTextInput] = useState(dataFromStore || '');

	useEffect(() => {
		if (isChecked || textInput === '*') {
			setIsChecked(true);
			setTextInput('*');
		}
		dispatch(putDispatch(textInput));
	}, [isChecked, textInput, dispatch, putDispatch]);

	return (
		<>
			{header && (
				<Stack direction='row' spacing={3} alignItems='center'>
					<CustomHeader text={header} tooltip={tooltip} />
					{showApplyToAllCheckbox && !showHorizontalCheckbox && (
						<CustomCheckbox
							checkboxLabel={checkboxLabel}
							isChecked={isChecked}
							setIsChecked={setIsChecked}
							setTextInput={setTextInput}
						/>
					)}
				</Stack>
			)}
			<Stack direction='row' spacing={1} alignItems='center'>
				<TextField
					label={inputLabel}
					type='text'
					variant='outlined'
					value={textInput}
					onChange={(e) => setTextInput(e.target.value)}
					disabled={isChecked || textInput === '*'}
					InputLabelProps={{ shrink: true }}
					style={{ width: 400 }}
				/>
				{showApplyToAllCheckbox && showHorizontalCheckbox && (
					<CustomCheckbox
						checkboxLabel={checkboxLabel}
						isChecked={isChecked}
						setIsChecked={setIsChecked}
						setTextInput={setTextInput}
					/>
				)}
			</Stack>
		</>
	);
};

export const CustomDataGridAndTextInputToggle: FC<
	CustomDataGridAndTextInputToggleProps
> = ({
	columnList,
	header,
	buttonHeader,
	putDispatchDataGrid,
	putDispatchTextInput,
	reducerDataGrid,
	reducerTextInput,
	tooltipTextInput,
	tooltipDataGrid,
	inputLabel,
	checkboxLabel,
}) => {
	const dispatch = useDispatch();
	const state = store.getState();

	let dataFromStore;
	if (reducerDataGrid) {
		const [rootReducer, subReducer] = reducerDataGrid.includes('.')
			? reducerDataGrid.split('.')
			: [reducerDataGrid, undefined];
		const dataFromRootStore = state[rootReducer as keyof typeof state] as any[];
		dataFromStore =
			subReducer && Object.keys(dataFromRootStore).length > 0
				? dataFromRootStore[subReducer as keyof typeof dataFromRootStore]
				: Array.isArray(dataFromRootStore)
				? dataFromRootStore
				: [];
	} else dataFromStore = [];

	const [rows, setRows] = useState<GridRowsProp>(
		dataFromStore as GridRowsProp[]
	);

	const [id, setId] = useState(
		dataFromStore[dataFromStore.length - 1]?.id + 1 || 0
	);

	useEffect(() => {
		dispatch(putDispatchDataGrid(rows));
	}, [dispatch, putDispatchDataGrid, rows]);

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

	const columns = createDataGridColumns(columnList, handleDeleteRow);

	return (
		<>
			<Stack direction='row' spacing={3} alignItems='center'>
				{header && (
					<CustomHeader
						text={header}
						tooltip={rows.length === 0 ? tooltipTextInput : tooltipDataGrid}
					/>
				)}
				<Button variant='text' onClick={handleAddRow} startIcon={<Add />}>
					{buttonHeader}
				</Button>
			</Stack>
			{rows.length === 0 ? (
				<CustomTextInput
					inputLabel={inputLabel}
					putDispatch={putDispatchTextInput}
					showApplyToAllCheckbox={true}
					showHorizontalCheckbox={true}
					checkboxLabel={checkboxLabel}
					reducer={reducerTextInput}
				/>
			) : (
				<DataGrid
					editMode='row'
					rows={rows}
					columns={columns}
					processRowUpdate={(updatedRow) => handleRowUpdate(updatedRow)}
					onProcessRowUpdateError={handleProcessRowUpdateError}
					autoHeight
				/>
			)}
		</>
	);
};

export const CustomHeader: FC<CustomHeaderProps> = ({ text, tooltip }) => {
	return (
		<>
			<Stack direction='row' spacing={1} alignItems='center'>
				<h4>{text}</h4>
				{tooltip && <CustomTooltip tooltip={tooltip} />}
			</Stack>
		</>
	);
};

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
	checkboxLabel,
	isChecked,
	setIsChecked,
	setTextInput,
}) => {
	return (
		<>
			<FormControlLabel
				control={
					<Checkbox
						checked={isChecked}
						onChange={(e) => {
							setIsChecked(e.target.checked);
							if (!e.target.checked) {
								setTextInput && setTextInput('');
							}
						}}
						size='small'
					/>
				}
				label={checkboxLabel}
			/>
		</>
	);
};
