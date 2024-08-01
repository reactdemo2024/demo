import AllocationConfiguration from './components/allocation/AllocationConfiguration';
import EnvironmentConfiguration from './components/environment/EnvironmentConfiguration';
import {
	Tabs,
	Tab,
	Box,
	Stack,
	Card,
	Typography,
	createTheme,
	ThemeProvider,
	FormControlLabel,
	Switch,
	Slide,
} from '@mui/material';
import AllocationSidebar from './components/allocation/AllocationSidebar';
import EnvironmentSidebar from './components/environment/EnvironmentSidebar';
import { Provider } from 'react-redux';
import store from './store/store';
import { useState } from 'react';
import logo from './assets/logo-microsoft-96.png';

export default function App() {
	const [tabIsAllocation, setTabIsAllocation] = useState(true);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

	const handleTabChange = (e: any, tabIndex: number) => {
		setTabIsAllocation(tabIndex === 0);
	};

	const theme = createTheme({
		components: {
			MuiMenuItem: {
				styleOverrides: {
					root: {
						height: 32,
					},
				},
			},
			MuiAutocomplete: {
				styleOverrides: {
					option: {
						height: 32,
					},
				},
			},
		},
	});

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Typography>
					<Box
						sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 2 }}
					>
						<Box
							component='img'
							sx={{
								height: '100%',
								width: 'auto',
								maxHeight: { xs: 48, sm: 48, md: 48 },
							}}
							src={logo}
							alt='Microsoft Logo'
						/>
						<Tabs
							onChange={handleTabChange}
							value={tabIsAllocation ? 0 : 1}
							aria-label='Tabs where selection follows focus'
							selectionFollowsFocus
						>
							<Tab label='Allocation Configuration' />
							<Tab label='Environment Configuration' />
						</Tabs>
					</Box>
					<Box sx={{ ml: 1 }}>
						<FormControlLabel
							control={
								<Switch
									checked={sidebarIsOpen}
									onChange={() => setSidebarIsOpen((prev) => !prev)}
									size='small'
								/>
							}
							label={
								<Typography variant='subtitle2' sx={{ pl: '4px' }}>
									Toggle Sidebar
								</Typography>
							}
						/>
					</Box>
					<Stack
						direction='row'
						spacing={2}
						sx={{ alignItems: 'stretch', minHeight: 'calc(100vh - 80px)' }}
					>
						<Slide
							in={sidebarIsOpen}
							direction='right'
							mountOnEnter
							unmountOnExit
						>
							<Card
								variant='outlined'
								sx={{ minWidth: sidebarIsOpen ? '260px' : '0' }}
							>
								{tabIsAllocation ? (
									<AllocationSidebar />
								) : (
									<EnvironmentSidebar />
								)}
							</Card>
						</Slide>
						<Card
							variant='outlined'
							sx={{ px: 2, width: '-webkit-fill-available' }}
						>
							{tabIsAllocation ? (
								<AllocationConfiguration />
							) : (
								<EnvironmentConfiguration />
							)}
						</Card>
					</Stack>
				</Typography>
			</ThemeProvider>
		</Provider>
	);
}
