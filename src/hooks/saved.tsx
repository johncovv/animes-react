import React, { createContext, useContext, useState, useCallback } from 'react';

import api from '../services/api.client';
import { FilterAnime } from '../utils/filter-request-data';

interface SavedContextData {
	favorites: ApiRequest.Anime[];
	watchLater: ApiRequest.Anime[];
	toggleFavorites(data: ApiRequest.Anime): void;
	concatToFavorites(params: ApiRequest.Anime[]): void;
	toggleWatchLater(data: ApiRequest.Anime): void;
	concatToWatchLater(params: ApiRequest.Anime[]): void;
}

const SavedContext = createContext<SavedContextData>({} as SavedContextData);

export const SavedProvider: React.FunctionComponent = ({ children }) => {
	const [favorites, setFavorites] = useState<ApiRequest.Anime[]>(() => {
		const data = localStorage.getItem('@AnimesReact:favorites');

		if (data) return JSON.parse(data) as ApiRequest.Anime[];

		return [] as ApiRequest.Anime[];
	});

	const [watchLater, setWatchLater] = useState<ApiRequest.Anime[]>(() => {
		const data = localStorage.getItem('@AnimesReact:watchLater');

		if (data) return JSON.parse(data) as ApiRequest.Anime[];

		return [] as ApiRequest.Anime[];
	});

	const toggleFavorites = useCallback(
		async ({ id }: ApiRequest.Anime) => {
			const exist = favorites.find((i) => i.id === id);

			if (!exist) {
				try {
					const response = await api.get(`/odata/Animesdb?$filter=Id eq ${id}`);

					const filtered = await FilterAnime(response.data.value);

					const concat = [...favorites, filtered[0]];

					setFavorites(concat);
					localStorage.setItem(
						'@AnimesReact:favorites',
						JSON.stringify(concat),
					);
				} catch (err) {
					window.console.log(err);
				}
			} else {
				const filtered = favorites.filter((y) => y.id !== id);

				setFavorites(filtered);
				localStorage.setItem(
					'@AnimesReact:favorites',
					JSON.stringify(filtered),
				);
			}
		},
		[favorites],
	);

	const concatToFavorites = (params: ApiRequest.Anime[]): void => {
		const concat = [...favorites, ...params];

		setFavorites(concat);
		localStorage.setItem('@AnimesReact:favorites', JSON.stringify(concat));
	};

	const toggleWatchLater = useCallback(
		async ({ id }: ApiRequest.Anime) => {
			const exist = watchLater.find((i) => i.id === id);

			if (!exist) {
				try {
					const response = await api.get(`/odata/Animesdb?$filter=Id eq ${id}`);

					const filtered = await FilterAnime(response.data.value);

					const concat = [...watchLater, filtered[0]];

					setWatchLater(concat);
					localStorage.setItem(
						'@AnimesReact:watchLater',
						JSON.stringify(concat),
					);
				} catch (err) {
					window.console.log(err);
				}
			} else {
				const filtered = watchLater.filter((y) => y.id !== id);

				setWatchLater(filtered);
				localStorage.setItem(
					'@AnimesReact:watchLater',
					JSON.stringify(filtered),
				);
			}
		},
		[watchLater],
	);

	const concatToWatchLater = (params: ApiRequest.Anime[]): void => {
		const concat = [...watchLater, ...params];

		setWatchLater(concat);
		localStorage.setItem('@AnimesReact:watchLater', JSON.stringify(concat));
	};

	return (
		<SavedContext.Provider
			value={{
				favorites,
				watchLater,
				toggleFavorites,
				concatToFavorites,
				toggleWatchLater,
				concatToWatchLater,
			}}
		>
			{children}
		</SavedContext.Provider>
	);
};

export function useSaved(): SavedContextData {
	const context = useContext(SavedContext);

	if (!context) {
		throw new Error('useHistory must be used within a HistoryProvider');
	}

	return context;
}
