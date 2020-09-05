import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

// components, hooks
import Player from '../../components/Player';
import { useHistory as useHistoryHook } from '../../hooks/history';
import { useEspisodesHook } from '../../hooks/episodes';
import { useLoadingHook } from '../../hooks/loading';

// assets
import backgroundImage from '../../assets/img/background/anime.png';
import playerPoster from '../../assets/img/background/player2.png';

// utils, services
import api from '../../services/api.client';
import {
	FilterEpisodesList,
	FilterAnime,
	FilterEpisodeOptions,
} from '../../utils/filter-request-data';

// styles
import { Content, PlayerContainer } from './styles';
import GlobalAnime from '../../styles/page.styles';

// internal components
import Description from './components/Description';
import EpisodesList from './components/EpisodesList';

interface AnimeParams {
	animeId: string;
	episodeId: string;
}

const AnimePage: React.FunctionComponent = () => {
	const { handleSetStatus } = useLoadingHook();

	const { addToHistory, updateCurrentTime } = useHistoryHook();
	const { handleChangeEpisode, activeEpisode } = useEspisodesHook();

	const { animeId, episodeId } = useParams<AnimeParams>();

	const [animeDescription, setAnimeDescription] = useState<ApiRequest.Anime>(
		{} as ApiRequest.Anime,
	);
	const [episodesList, setEpisodesList] = useState<ApiRequest.EpiList[]>([]);

	const [isReverse, setIsReverse] = useState(false);

	const { pathname } = useLocation();
	const historyHook = useHistory();

	const handleAddToHistory = useCallback(
		(id: number, title: string, currentTime: number) => {
			addToHistory({
				id,
				animeId: parseInt(animeId, 10),
				title,
				currentTime,
			});
		},
		[addToHistory, animeId],
	);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			handleSetStatus(true);
			const episodesListRequest = async (): Promise<void> => {
				try {
					const response = await api.get(`/api/episodioexes/${animeId}`);

					const filtered = await FilterEpisodesList(response.data);

					setEpisodesList(filtered);
				} catch (err) {
					window.console.log(err);
				}
			};

			const animeDescriptionRequest = async (): Promise<void> => {
				try {
					const response = await api.get(
						`/odata/Animesdb?$filter=Id eq ${animeId}`,
					);

					const filtered = await FilterAnime(response.data.value);

					setAnimeDescription(filtered[0]);

					episodesListRequest();
					handleSetStatus(false);
				} catch (err) {
					window.console.log(err);
				}
			};
			animeDescriptionRequest();
		}

		return () => {
			isMounted = false;
		};
	}, [animeId, handleSetStatus]);

	const findOnEpisodeList = useCallback(
		(episode: number): ApiRequest.EpiList | undefined => {
			return episodesList.find((i) => i.id === episode);
		},
		[episodesList],
	);

	const handleEpisodeRequest = useCallback(
		async (event, id: number, title: string) => {
			if (event) event.preventDefault();

			try {
				const response = await api.get(`/api/episodioexes/links?id=${id}`);

				const filtered = await FilterEpisodeOptions(response.data);
				handleChangeEpisode(id, title, filtered);
			} catch (err) {
				window.console.log(err);
			}
		},
		[handleChangeEpisode],
	);

	useEffect(() => {
		const requestOnLoadEpisode = async (): Promise<void> => {
			if (episodeId) {
				const episode = parseInt(episodeId, 10);
				if (activeEpisode.id === episode) return;

				const getEpisodeTitle = findOnEpisodeList(episode);
				if (getEpisodeTitle) {
					await handleEpisodeRequest(undefined, episode, getEpisodeTitle.title);
					handleAddToHistory(getEpisodeTitle.id, getEpisodeTitle.title, 0);

					const pathSplited = pathname.split('/');
					if (pathSplited) {
						pathSplited.pop();

						historyHook.replace(pathSplited.join('/'));
						handleSetStatus(false);
					}
				}
			}
		};

		requestOnLoadEpisode();
	}, [
		episodeId,
		activeEpisode,
		handleEpisodeRequest,
		handleAddToHistory,
		findOnEpisodeList,
	]);

	const handleSortEpisodesList = useCallback(() => {
		setIsReverse(!isReverse);
		setEpisodesList(episodesList.reverse());
	}, [setIsReverse, isReverse, episodesList, setEpisodesList]);

	useEffect(() => {
		const video = document.querySelector('video');
		if (video) {
			video.ontimeupdate = () => {
				if (activeEpisode.id === undefined) return;
				if (video.currentTime > 5) {
					updateCurrentTime(activeEpisode.id, video.currentTime);
				}
			};
		}
	}, [activeEpisode, updateCurrentTime]);

	return (
		<>
			<Content>
				<PlayerContainer>
					<Player poster={playerPoster} autoplay loop />
					<EpisodesList
						animeDescription={animeDescription}
						episodesList={episodesList}
						handleEpisodeRequest={(event, id, title) => {
							handleEpisodeRequest(event, id, title);
						}}
						handleAddToHistory={(id, title, currentTime) => {
							handleAddToHistory(id, title, currentTime);
						}}
						isReverse={isReverse}
						handleSortEpisodesList={handleSortEpisodesList}
					/>
				</PlayerContainer>
				<Description animeDescription={animeDescription} />
			</Content>

			<GlobalAnime backgroundImage={backgroundImage} varRoot="season" />
		</>
	);
};

export default AnimePage;
