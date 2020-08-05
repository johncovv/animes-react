import React, { useEffect, useState, useCallback } from 'react';

import { useParams } from 'react-router-dom';

import { FiHeart, FiClock } from 'react-icons/fi';

import backgroundImage from '../../assets/img/background/anime.png';

import {
	FilterEpisodesList,
	FilterAnime,
	FilterEpisodeOptions,
} from '../../utils/filter-request-data';

import api from '../../services/api.client';

import { Title, Content, Description, PlayerContainer } from './styles';

import playerPoster from '../../assets/img/background/player2.png';

interface AnimeParams {
	animeId: string;
}

const AnimePage: React.FunctionComponent = () => {
	const { animeId } = useParams<AnimeParams>();

	const [animeDescription, setAnimeDescription] = useState<ApiRequest.Anime>(
		{} as ApiRequest.Anime,
	);
	const [episodesList, setEpisodesList] = useState<ApiRequest.EpiList[]>([]);

	const [episodeOptions, setEpisodeOptions] = useState<ApiRequest.EpiOption[]>(
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

	const handleEpisodeRequest = useCallback(async (event, id: number) => {
		event.preventDefault();

		try {
			const response = await api.get(`/api/episodioexes/links?id=${id}`);

			const filtered = await FilterEpisodeOptions(response.data);
			setEpisodeOptions([...filtered]);
		} catch (err) {
			window.console.log(err);
		}
	}, []);

	return (
		<>
			<Title>{animeDescription.title}</Title>

			<Content>
				<PlayerContainer>
					<div id="player">
						<video
							controls={!!episodeOptions[0]}
							autoPlay={!!episodeOptions[0]}
							poster={playerPoster}
							src={episodeOptions[0]?.url}
						/>
					</div>
					<div className="episodes__list">
						<div className="episodes__list--options">
							<FiHeart size={24} />
							<FiClock size={24} />
						</div>
						<div className="episodes__list--container">
							{episodesList &&
								episodesList.map(({ id, title }) => (
									<button
										type="button"
										key={id}
										onClick={(e) => handleEpisodeRequest(e, id)}
									>
										<img
											src={`http://thumb.zetai.info/${id}.jpg`}
											alt={`${title} thumbnail`}
										/>
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

			<style>{`.primary__background{background-image: url('${backgroundImage}');} ::-webkit-scrollbar-thumb {background-color: var(--blue-color);}`}</style>
		</>
	);
};

export default AnimePage;
