import React, { useEffect, useState, useCallback } from 'react';

import { useParams } from 'react-router-dom';

import { FiHeart, FiClock } from 'react-icons/fi';

import { BsFillEyeSlashFill } from 'react-icons/bs';

import Player from '../../components/Player';
import backgroundImage from '../../assets/img/background/anime.png';

import { useHistory } from '../../hooks/history';

import { useSaved } from '../../hooks/saved';

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

	const handleToggleHistory = useCallback(
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

				setAnimeDescription(filtered[0]);
			} catch (err) {
				window.console.log(err);
			}
		};

		animeDescriptionRequest();

		episodesListRequest();
	}, [animeId]);

	useEffect(() => {
		const requestOnLoadEpisode = async (): Promise<void> => {
			if (episodeId) {
				const episode = parseInt(episodeId, 10);

				const getEpisodeTitle = await episodesList.find(
					(i) => i.id === episode,
				);
				if (getEpisodeTitle)
					await handleEpisodeRequest(undefined, episode, getEpisodeTitle.title);
			}
		};

		requestOnLoadEpisode();
	}, [episodeId, handleEpisodeRequest, episodesList]);

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
						<div className="episodes__list--container">
							{episodesList &&
								episodesList.map(({ id, title }) => (
									<button
										type="button"
										key={id}
										onClick={(e) => {
											handleEpisodeRequest(e, id, title);
											handleToggleHistory(id, title, 0);
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
												src={`http://thumb.zetai.info/${id}.jpg`}
												alt={`${title} thumbnail`}
											/>
										</div>
										<div className="titles-container">
											<p className="title">{title}</p>
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
