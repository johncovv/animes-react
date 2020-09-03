import React, { createContext, useState, useContext, useCallback } from 'react';

interface LoadingContextData {
	status: boolean;
	handleSetStatus(value: boolean): void;
}

const LoadingContext = createContext<LoadingContextData>(
	{} as LoadingContextData,
);

export const LoadingProvider: React.FunctionComponent = ({ children }) => {
	const [status, setStatus] = useState(false);

	const handleSetStatus = useCallback((value) => {
		setStatus(value);
	}, []);

	return (
		<LoadingContext.Provider value={{ status, handleSetStatus }}>
			{children}
		</LoadingContext.Provider>
	);
};

export function useLoadingHook(): LoadingContextData {
	const context = useContext(LoadingContext);

	if (!context) {
		throw new Error('useHistory must be used within a LoadingProvider');
	}

	return context;
}
