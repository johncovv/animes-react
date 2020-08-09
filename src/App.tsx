import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import Header from './components/Header';

import GlobalStyled from './styles/global.styles';

import Background from './components/Background';

import History from './components/History';
import Saved from './components/Saved';

import AppProvider from './hooks';

const App: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<AppProvider>
				<Header />
				<History />
				<Saved />
				<Background>
					<Routes />
				</Background>
			</AppProvider>
			<GlobalStyled />
		</BrowserRouter>
	);
};

export default App;
