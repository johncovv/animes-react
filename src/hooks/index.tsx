import React from 'react';

import { HistoryProvider } from './history';

import { SavedProvider } from './saved';

import { EpisodesProvider } from './episodes';

const AppProvider: React.FunctionComponent = ({ children }) => (
	<HistoryProvider>
		<SavedProvider>
			<EpisodesProvider>{children}</EpisodesProvider>
		</SavedProvider>
	</HistoryProvider>
);

export default AppProvider;
