import React, { createContext, useState, useCallback, useContext } from 'react';

import lodash from 'lodash';

interface ActiveEpisodeType {
	id: number;
	title: string;
}

interface EpisodesContextData {
	activeEpisode: ActiveEpisodeType;
	episodeResolutions: ApiRequest.EpiOption[];
	currentVideo: ApiRequest.EpiOption;
	handleChangeEpisode(
		id: number,
		title: string,
		resolutions: ApiRequest.EpiOption[],
	): void;
	handleChangeCurrentVideo(option: ApiRequest.EpiOption): void;
	handleClearEpisodeHookData(): void;
}

const EpisodesContext = createContext<EpisodesContextData>(
	{} as EpisodesContextData,
);

export const EpisodesProvider: React.FunctionComponent = ({ children }) => {
	const [activeEpisode, setActiveEpisode] = useState<ActiveEpisodeType>(
		{} as ActiveEpisodeType,
	);

	const [episodeResolutions, setEpisodeResolutions] = useState<
		ApiRequest.EpiOption[]
	>([]);

	const [currentVideo, setCurrentVideo] = useState<ApiRequest.EpiOption>(
		{} as ApiRequest.EpiOption,
	);

	const handleChangeEpisode = useCallback(
		(id, title, resolutions) => {
			if (!lodash.isEqual(episodeResolutions, resolutions)) {
				setActiveEpisode({ id, title });
				setEpisodeResolutions(resolutions);
			}
		},
		[episodeResolutions],
	);

	const handleChangeCurrentVideo = useCallback(
		(option) => {
			setCurrentVideo(option);
		},
		[setCurrentVideo],
	);

	const handleClearEpisodeHookData = useCallback(() => {
		setEpisodeResolutions([] as ApiRequest.EpiOption[]);
		setActiveEpisode({} as ActiveEpisodeType);
		setCurrentVideo({} as ApiRequest.EpiOption);
	}, []);

	return (
		<EpisodesContext.Provider
			value={{
				activeEpisode,
				episodeResolutions,
				currentVideo,
				handleChangeEpisode,
				handleChangeCurrentVideo,
				handleClearEpisodeHookData,
			}}
		>
			{children}
		</EpisodesContext.Provider>
	);
};

export function useEspisodesHook(): EpisodesContextData {
	const context = useContext(EpisodesContext);

	if (!context) {
		throw new Error('useHistory must be used within a EpisodesProvider');
	}

	return context;
}
