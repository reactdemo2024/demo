import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { CustomTheme } from './components/Common';
import store from './store/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<React.StrictMode>
			<Provider store={store}>
				<ThemeProvider theme={CustomTheme}>
					<App />
				</ThemeProvider>
			</Provider>
		</React.StrictMode>
	</BrowserRouter>
);