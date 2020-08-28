import React from 'react';

import { HistoryProvider } from './history';

import { SavedProvider } from './saved';

import { EpisodesProvider } from './episodes';

import { LoadingProvider } from './loading';

const AppProvider: React.FunctionComponent = ({ children }) => (
	<LoadingProvider>
		<HistoryProvider>
			<SavedProvider>
				<EpisodesProvider>{children}</EpisodesProvider>
			</SavedProvider>
		</HistoryProvider>
	</LoadingProvider>
);

export default AppProvider;
