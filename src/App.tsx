import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import Header from './components/Header';

import GlobalStyled from './styles/global.styles';

import Background from './components/Background';

const App: React.FunctionComponent = () => {
	return (
		<>
			<GlobalStyled />

			<BrowserRouter>
				<Header />
				<Background>
					<Routes />
				</Background>
			</BrowserRouter>
		</>
	);
};

export default App;
