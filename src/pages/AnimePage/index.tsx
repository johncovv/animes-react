import React, { useEffect, useState, useCallback } from 'react';

import { useParams } from 'react-router-dom';

import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';
import { FiHeart, FiClock } from 'react-icons/fi';
import { BsFillEyeSlashFill } from 'react-icons/bs';

import Player from '../../components/Player';
import backgroundImage from '../../assets/img/background/anime.png';
import descriptionThumbnailError from '../../assets/img/thumb-not-found.png';

import { useHistory } from '../../hooks/history';

import { useSaved } from '../../hooks/saved';

import FilterEpisodeTitle from '../../utils/filter-episode-title';

import {
	FilterEpisodesList,
	FilterAnime,
	FilterEpisodeOptions,
} from '../../utils/filter-request-data';

import api from '../../services/api.client';

import { Title, Content, Description, PlayerContainer } from './styles';

import playerPoster from '../../assets/img/background/player2.png';

import GlobalAnime from '../../styles/page.styles';

interface AnimeParams {
	animeId: string;
	episodeId: string;
}

interface ActiveEpisode {
	id: number | undefined;
	title: string | undefined;
}

interface EspisodesListOrderType {
	isReverse: boolean;
}

const AnimePage: React.FunctionComponent = () => {
	const { addToHistory, history, removeFromHistory } = useHistory();
	const {
		favorites,
		watchLater,
		toggleFavorites,
		toggleWatchLater,
	} = useSaved();

	const { animeId, episodeId } = useParams<AnimeParams>();

	const [animeDescription, setAnimeDescription] = useState<ApiRequest.Anime>(
		{} as ApiRequest.Anime,
	);
	const [episodesList, setEpisodesList] = useState<ApiRequest.EpiList[]>([]);

	const [episodeOptions, setEpisodeOptions] = useState<ApiRequest.EpiOption[]>(
		[],
	);

	const [espideoActive, setEpisodeActive] = useState<ActiveEpisode>({
		id: undefined,
		title: undefined,
	});

	const [isReverse, setIsReverse] = useState(false);

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

	const handleEpisodeRequest = useCallback(
		async (event, id: number, title: string) => {
			if (event) event.preventDefault();

			// request episode options
			try {
				const response = await api.get(`/api/episodioexes/links?id=${id}`);

				const filtered = await FilterEpisodeOptions(response.data);
				setEpisodeOptions([...filtered]);
				setEpisodeActive({ id, title });
			} catch (err) {
				window.console.log(err);
			}
		},
		[],
	);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			const episodesListRequest = async (): Promise<void> => {
				try {
					const response = await api.get(`/api/episodioexes/${animeId}`);

					const filtered = await FilterEpisodesList(response.data);

					setEpisodesList((state) => [...state, ...filtered]);
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

					await setAnimeDescription(filtered[0]);

					episodesListRequest();
				} catch (err) {
					window.console.log(err);
				}
			};
			animeDescriptionRequest();
		}

		return () => {
			isMounted = false;
		};
	}, [animeId]);

	const findOnEpisodeList = useCallback(
		(episode: number): ApiRequest.EpiList | undefined => {
			return episodesList.find((i) => i.id === episode);
		},
		[episodesList],
	);

	useEffect(() => {
		const requestOnLoadEpisode = async (): Promise<void> => {
			if (episodeId) {
				const episode = parseInt(episodeId, 10);
				if (espideoActive.id === episode) return;

				const getEpisodeTitle = findOnEpisodeList(episode);
				if (getEpisodeTitle) {
					await handleEpisodeRequest(undefined, episode, getEpisodeTitle.title);
					handleAddToHistory(getEpisodeTitle.id, getEpisodeTitle.title, 0);
				}
			}
		};

		requestOnLoadEpisode();
	}, [
		episodeId,
		espideoActive,
		handleEpisodeRequest,
		handleAddToHistory,
		findOnEpisodeList,
	]);

	const handleSortEpisodesList = useCallback(() => {
		setIsReverse(!isReverse);
		setEpisodesList(episodesList.reverse());
	}, [setIsReverse, isReverse, episodesList, setEpisodesList]);

	const handleEpisodeThumbnailError = useCallback((e) => {
		const element = e.target as HTMLImageElement;

		const thumbNotFound =
			'https://placeholder.pics/svg/320x200/000000-000000/FFFFFF/thumbnail%20not%20found';

		element.src = thumbNotFound;
	}, []);

	const hadleDescriptionThumbnailError = useCallback((e) => {
		const element = e.target as HTMLImageElement;

		element.src = descriptionThumbnailError;
	}, []);

	const options = {
		poster: playerPoster,
		autoplay: true,
		sources: [...episodeOptions],
		episode: espideoActive,
	};

	return (
		<>
			<Title>{animeDescription.title}</Title>

			<Content>
				<PlayerContainer>
					<Player {...options} />
					<div className="episodes__list">
						<div className="episodes__list--options">
							<div className="episodes__list--options-left">
								{!isReverse ? (
									<FaSortAmountDown
										size={24}
										onClick={handleSortEpisodesList}
										className="episodes__list--options-sort"
									/>
								) : (
									<FaSortAmountDownAlt
										size={24}
										onClick={handleSortEpisodesList}
										className="episodes__list--options-sort"
									/>
								)}
							</div>

							<div className="episodes__list--options-right">
								<FiHeart
									size={24}
									onClick={() => toggleFavorites(animeDescription)}
									className={`episodes__list--options-favorite ${
										favorites.find((i) => i.id === animeDescription.id)
											? 'checked'
											: ''
									}`}
								/>
								<FiClock
									size={24}
									onClick={() => toggleWatchLater(animeDescription)}
									className={`episodes__list--options-watch-later ${
										watchLater.find((i) => i.id === animeDescription.id)
											? 'checked'
											: ''
									}`}
								/>
							</div>
						</div>
						<div className="episodes__list--container">
							{episodesList &&
								episodesList.map(({ id, title }, index, arr) => (
									<button
										type="button"
										key={id}
										onClick={(e) => {
											handleEpisodeRequest(e, id, title);
											handleAddToHistory(id, title, 0);
										}}
										className={`${
											history.find((i) => i.id === id) ? 'checked' : ''
										}`}
									>
										<div className="thumb">
											<span
												className={`uncheck-history ${
													history.find((i) => i.id === id) ? 'checked' : ''
												}`}
											>
												<BsFillEyeSlashFill
													size={25}
													onClick={() => removeFromHistory(id)}
												/>
											</span>
											<img
												data-id={id}
												className="episode-thumbnail"
												src={`http://thumb.zetai.info/${id}.jpg`}
												onError={(e) => handleEpisodeThumbnailError(e)}
												alt={`${title} thumbnail`}
											/>
										</div>
										<div className="titles-container">
											<p className="title">
												{FilterEpisodeTitle({
													index,
													animeTitle: animeDescription.title,
													episodeTitle: title,
													genres: animeDescription.genres,
													total: !isReverse ? arr.length : undefined,
												})}
											</p>
											<p className="anime-title">{animeDescription.title}</p>
										</div>
									</button>
								))}
						</div>
					</div>
				</PlayerContainer>
				<Description>
					{animeDescription && (
						<>
							<div className="description__poster">
								<div className="description__poster--background">
									<img
										src={animeDescription.thumbnail}
										onError={(e) => hadleDescriptionThumbnailError(e)}
										alt={`${animeDescription.title?.toLowerCase()} thumbnail`}
									/>
								</div>
							</div>
							<div className="descriptions__details">
								<p className="description__title">{animeDescription.title}</p>
								<p>
									Status:{' '}
									<span>{!animeDescription.status ? 'Completo' : 'Ativo'}</span>
								</p>
								<p>
									Lançamento: <span>{animeDescription.year}</span>
								</p>
								<p>
									Gêneros: <span>{animeDescription.genres}.</span>
								</p>
								<div>
									<p>Descrição:</p>
									<span>{animeDescription.description}</span>
								</div>
							</div>
						</>
					)}
				</Description>
			</Content>

			<GlobalAnime backgroundImage={backgroundImage} varRoot="season" />
		</>
	);
};

export default AnimePage;
