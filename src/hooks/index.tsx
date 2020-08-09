import React from 'react';

import { HistoryProvider } from './history';

const AppProvider: React.FunctionComponent = ({ children }) => (
	<HistoryProvider>{children}</HistoryProvider>
);

export default AppProvider;
