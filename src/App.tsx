import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// components
import Header from './components/Header';
import Background from './components/Background';
import History from './components/History';
import Saved from './components/Saved';
import Loading from './components/Loading';

// styles
import GlobalStyled from './styles/global.styles';

// hooks, routes
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FunctionComponent = () => (
	<BrowserRouter>
		<AppProvider>
			<Header />
			<Loading />
			<History />
			<Saved />
			<Background>
				<Routes />
			</Background>
		</AppProvider>
		<GlobalStyled />
	</BrowserRouter>
);

export default App;
