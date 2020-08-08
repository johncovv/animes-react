import React, { createContext, useState, useCallback, useContext } from 'react';

interface HistoryData {
	id: number;
	animeId: number;
	title: string;
	currentTime: number;
}

interface HistoryContextData {
	history: HistoryData[];
	toggleHistory(data: HistoryData): void;
}

const HistoryContext = createContext<HistoryContextData>(
	{} as HistoryContextData,
);

export const HistoryProvider: React.FunctionComponent = ({ children }) => {
	const [history, setHistory] = useState<HistoryData[]>(() => {
		const data = localStorage.getItem('@AnimesReact:history');

		if (data) return JSON.parse(data) as HistoryData[];

		return [] as HistoryData[];
	});

	const toggleHistory = useCallback(
		({ id, animeId, title, currentTime }: HistoryData) => {
			const exist = history.find((i) => i.id === id);

			if (exist) {
				const filtered = history.filter((y) => y.id !== id);

				setHistory(filtered);
				localStorage.setItem('@Animesreact:history', JSON.stringify(filtered));
			} else {
				const concat = [...history, { id, animeId, title, currentTime }];

				setHistory(concat);
				localStorage.setItem('@Animesreact:history', JSON.stringify(concat));
			}
		},
		[history],
	);

	return (
		<HistoryContext.Provider value={{ history, toggleHistory }}>
			{children}
		</HistoryContext.Provider>
	);
};

export function useHistory(): HistoryContextData {
	const context = useContext(HistoryContext);

	if (!context) {
		throw new Error('useHistory must be used within a HistoryProvider');
	}

	return context;
}
