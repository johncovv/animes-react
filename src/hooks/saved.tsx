import React, { createContext, useContext, useState, useCallback } from 'react';

interface SavedContextData {
	favorites: ApiRequest.Anime[];
	watchLater: ApiRequest.Anime[];
	toggleFavorites(data: ApiRequest.Anime): void;
	toggleWatchLater(data: ApiRequest.Anime): void;
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
		({
			id,
			title,
			description,
			thumbnail,
			status,
			genres,
			views,
			year,
		}: ApiRequest.Anime) => {
			const exist = favorites.find((i) => i.id === id);

			if (!exist) {
				const concat = [
					...favorites,
					{ id, title, thumbnail, description, genres, status, views, year },
				];

				setFavorites(concat);
				localStorage.setItem('@AnimesReact:favorites', JSON.stringify(concat));
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

	const toggleWatchLater = useCallback(
		({
			id,
			title,
			thumbnail,
			description,
			genres,
			status,
			views,
			year,
		}: ApiRequest.Anime) => {
			const exist = watchLater.find((i) => i.id === id);

			if (!exist) {
				const concat = [
					...watchLater,
					{ id, title, thumbnail, description, genres, status, views, year },
				];

				setWatchLater(concat);
				localStorage.setItem('@AnimesReact:watchLater', JSON.stringify(concat));
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

	return (
		<SavedContext.Provider
			value={{ favorites, watchLater, toggleFavorites, toggleWatchLater }}
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
