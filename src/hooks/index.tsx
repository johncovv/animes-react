import React from 'react';

import { HistoryProvider } from './history';

import { SavedProvider } from './saved';

const AppProvider: React.FunctionComponent = ({ children }) => (
	<HistoryProvider>
		<SavedProvider>{children}</SavedProvider>
	</HistoryProvider>
);

export default AppProvider;
