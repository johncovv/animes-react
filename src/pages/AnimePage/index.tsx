import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import backgroundImage from '../../assets/img/background/anime.png';

import {
	FilterEpisodesList,
	FilterAnime,
} from '../../utils/filter-request-data';

import api from '../../services/api.client';

interface AnimeParams {
	animeId: string;
}

const AnimePage: React.FunctionComponent = () => {
	const { animeId } = useParams<AnimeParams>();
	const [animeDescription, setAnimeDescription] = useState<ApiRequest.Anime[]>(
		[],
	);
	const [episodesList, setEpisodesList] = useState<ApiRequest.EpiList[]>([]);

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
				setAnimeDescription((state) => [...state, ...filtered]);
			} catch (err) {
				window.console.log(err);
			}
		};

		animeDescriptionRequest();

		episodesListRequest();
	}, [animeId]);

	return (
		<>
			<h1>Anime {animeId}</h1>

			<div>
				{animeDescription &&
					animeDescription.map(
						({ id, title, status, year, genres, description }) => (
							<ul key={id}>
								<li>{title}</li>
								<li>Status: {status ? 'Completo' : 'Ativo'}</li>
								<li>Ano: {year}</li>
								<li>Gêneros: {genres}</li>
								<li>
									<h5>Descrição:</h5>
									<p>{description}</p>
								</li>
							</ul>
						),
					)}
			</div>
			<br />
			<br />

			<ul>
				{episodesList &&
					episodesList.map(({ id, title, date }) => (
						<li key={id}>
							<ul>
								<li>{id}</li>
								<li>{title}</li>
								<li>{date}</li>
							</ul>
						</li>
					))}
			</ul>

			<style>{`.primary__background{background-image: url('${backgroundImage}');} ::-webkit-scrollbar-thumb {background-color: var(--blue-color);}`}</style>
		</>
	);
};

export default AnimePage;
