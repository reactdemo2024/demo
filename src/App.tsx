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
} from '@mui/material';
import AllocationSidebar from './components/allocation/AllocationSidebar';
import EnvironmentSidebar from './components/environment/EnvironmentSidebar';
import { Provider } from 'react-redux';
import store from './store/store';
import { useState } from 'react';

export default function App() {
	const [tabIsAllocation, setTabIsAllocation] = useState(true);

	const handleTabChange = (e: any, tabIndex: number) => {
		setTabIsAllocation(tabIndex === 0);
	};

	const theme = createTheme({
		components: {
			MuiMenuItem: {
				styleOverrides: {
					root: {
						height: 32, // height for each menu item
					},
				},
			},
		},
	});

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Typography>
					<Box sx={{ width: '100%' }} mb={2}>
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
					<Stack
						direction='row'
						spacing={2}
						sx={{ alignItems: 'stretch', minHeight: 'calc(100vh - 80px)' }}
					>
						<Card variant='outlined' sx={{ minWidth: '260px' }}>
							{tabIsAllocation ? <AllocationSidebar /> : <EnvironmentSidebar />}
						</Card>
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
