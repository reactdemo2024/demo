import {
	DataGrid,
	GridColDef,
	GridColType,
	GridColumnHeaderParams,
	GridRenderCellParams,
	GridRowId,
	GridRowsProp,
	useGridApiContext,
} from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';
import {
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	MenuItem,
	Select,
	Stack,
	styled,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import {
	Delete,
	InfoOutlined,
	Add,
	QuestionMarkOutlined,
} from '@mui/icons-material';
import { Size, TooltipText } from '../enum/common.enum';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store/store';
import { TreeItem } from '@mui/x-tree-view';

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
	tooltip?: string;
	size?: number;
	link?: string;
}

interface CustomRenderHeaderWithTooltipProps {
	params: GridColumnHeaderParams;
	text: string;
	link?: string;
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
	link?: string;
}

export const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
	'& .MuiTreeItem-content': {
		padding: '1px 0px',
		gap: '2px',
	},
}));

export const CustomTooltip: FC<CustomTooltipProps> = ({
	tooltip,
	size,
	link,
}) => {
	const questionMarkSize = size ? size - 5 : 15;
	return (
		<>
			{tooltip && (
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
			)}
			{link && (
				<Tooltip
					title={
						<Typography
							sx={{ whiteSpace: 'pre-line', fontSize: Size.TOOLTIP_ICON }}
						>
							View EAP documentation
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
					<a
						href={link}
						target='_blank'
						rel='noreferrer'
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<QuestionMarkOutlined sx={{ fontSize: questionMarkSize }} />
					</a>
				</Tooltip>
			)}
		</>
	);
};

export const CustomRenderHeaderWithTooltip: FC<
	CustomRenderHeaderWithTooltipProps
> = ({ params, text, link }) => {
	return (
		<Stack direction='row' spacing={1} alignItems='center'>
			<span>{params.colDef.headerName}</span>
			<CustomTooltip tooltip={text} size={Size.TOOLTIP_TEXT} link={link} />
		</Stack>
	);
};

const useValueOptions = (reducer: string) => {
	const valueOptions: any[] = useSelector((state: any) => state[reducer]);
	const optionsList = valueOptions?.map((value) => value.name) || [];
	return optionsList;
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

			const isMultiSelect =
				col?.type === 'multiSelect' &&
				col?.valueOptions &&
				col?.valueOptions?.reducer;
			const colType = (
				col?.type === isMultiSelect ? 'singleSelect' : col?.type
			) as GridColType;
			const valueOptions = col?.valueOptions
				? col?.valueOptions?.reducer
					? ['', ...useValueOptions(col.valueOptions.reducer)]
					: ['', ...Object.values(col.valueOptions)]
				: [];

			return {
				field: col.field,
				headerName: col.headerName,
				type: colType,
				flex: 1,
				minWidth: col.width || minWidth,
				editable: true,
				disableColumnMenu: true,
				valueOptions: valueOptions,
				renderHeader:
					col.renderHeader &&
					((params) => (
						<CustomRenderHeaderWithTooltip
							params={params}
							text={col.renderHeader!.text}
							link={col.renderHeader!.link}
						/>
					)),
				...(isMultiSelect
					? {
							valueFormatter: (value: any) => (value ? value?.join(',') : ''),
							renderEditCell: (params) =>
								CustomDiscountEditCell(params, col.valueOptions.reducer),
							filterOperators: [
								{
									value: 'contains',
									getApplyFilterFn: (filterItem: any) => {
										if (filterItem.value == null || filterItem.value === '') {
											return null;
										}
										return (value: any) => {
											// if one of the cell values corresponds to the filter item
											return value.some(
												(cellValue: any) => cellValue === filterItem.value
											);
										};
									},
									InputComponent: CustomFilterInputSingleSelect,
								},
							],
					  }
					: {}),
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
	const dataFromStore = useSelector((state: any) => {
        if (!reducer) return [];
        const [rootReducer, subReducer] = reducer.includes('.')
            ? reducer.split('.')
            : [reducer, undefined];
        const dataFromRootStore = state[rootReducer as keyof typeof state] as any[];
        return subReducer && Object.keys(dataFromRootStore).length > 0
            ? dataFromRootStore[subReducer as keyof typeof dataFromRootStore]
            : Array.isArray(dataFromRootStore)
            ? dataFromRootStore
            : [];
    });

	const [rows, setRows] = useState<GridRowsProp>(
		dataFromStore as GridRowsProp[]
	);

	const [id, setId] = useState(
		dataFromStore[dataFromStore.length - 1]?.id + 1 || 0
	);

	useEffect(() => {
		dispatch(putDispatch(rows));
	}, [dispatch, putDispatch, rows]);

	// New useEffect to update rows when the relevant part of the state changes
	useEffect(() => {
		setRows(dataFromStore as GridRowsProp[]);
		setId(dataFromStore[dataFromStore.length - 1]?.id + 1 || 0);
	}, [dataFromStore]);

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

const CustomDiscountEditCell = (params: any, reducer: string) => (
	<CustomEditComponent {...params} reducer={reducer} />
);

function CustomEditComponent(props: any) {
	const { id, value, field, reducer } = props;
	const apiRef = useGridApiContext();
	const valueOptions = [...useValueOptions(reducer)];

	const handleChange = (event: any) => {
		const eventValue = event.target.value;
		console.log({ eventValue });
		const newValue = Array.isArray(eventValue)
			? eventValue
			: eventValue.split(',');
		apiRef.current.setEditCellValue({
			id,
			field,
			value: newValue.filter((x: any) => x !== ''),
		});
	};

	const selectValue = value
		? Array.isArray(value)
			? value
			: value?.split(',')
		: [];

	return (
		<Select
			multiple
			value={selectValue}
			onChange={handleChange}
			sx={{ width: '100%' }}
		>
			{valueOptions.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</Select>
	);
}

function CustomFilterInputSingleSelect(props: any) {
	const { item, applyValue, type, apiRef, focusElementRef, ...others } = props;

	const reducer = 'autoscaleRules';
	const valueOptions = [...useValueOptions(reducer)];

	return (
		<TextField
			id={`contains-input-${item.id}`}
			value={item.value}
			onChange={(event) => applyValue({ ...item, value: event.target.value })}
			type={type || 'text'}
			variant='standard'
			InputLabelProps={{
				shrink: true,
			}}
			inputRef={focusElementRef}
			select
			SelectProps={{
				native: true,
			}}
		>
			{valueOptions.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</TextField>
	);
}

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
			<Stack
				direction='row'
				spacing={1}
				alignItems='center'
				style={{ flexWrap: 'nowrap' }}
			>
				<div style={{ flexGrow: 1 }}>
					<TextField
						label={inputLabel}
						type='text'
						variant='outlined'
						value={textInput}
						onChange={(e) => setTextInput(e.target.value)}
						disabled={isChecked || textInput === '*'}
						InputLabelProps={{ shrink: true }}
						style={{ width: '100%' }}
					/>
				</div>
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

export const CustomHeader: FC<CustomHeaderProps> = ({
	text,
	tooltip,
	link,
}) => {
	return (
		<>
			<Stack direction='row' spacing={1} alignItems='center'>
				<h4>{text}</h4>
				<CustomTooltip tooltip={tooltip} link={link} />
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

export function parseIniText(text: string): Array<Array<string>> {
	const lines = text.match(/[^\r\n]+/g) || []; // Split text into lines, excluding empty lines
	const result: Array<Array<string>> = [];
	let currentSection: Array<string> = [];

	lines.forEach((line) => {
		if (line.startsWith('[')) {
			// Check if the line is a section header
			if (currentSection.length > 0) {
				// If there's an existing section, push it to the result before starting a new one
				result.push(currentSection);
			}
			// Start a new section with the current line as the first element
			currentSection = [line];
		} else if (line.trim() !== '') {
			// Add non-empty lines to the current section
			currentSection.push(line);
		}
	});
	// After the loop, add the last section if it's not empty
	if (currentSection.length > 0) {
		result.push(currentSection);
	}

	return result;
}

export const parseSectionProperty = (
	section: string[],
	id: number,
	title: string,
	propertyHandler: any,
	payload: any[]
) => {
	const match = section[0].match(new RegExp(`\\[${title}(.+?)\\]`));
	const name = match ? match[1] : '';
	let currentPayload = {
		id: id.toString(),
		name: name,
	};
	section.forEach((line) => {
		if (line.startsWith('[')) {
			return;
		}
		const [key, value] = line.split('=');
		const handler = propertyHandler[key];
		if (handler) {
			handler(value, currentPayload);
		}
	});
	payload.push(currentPayload);
};
