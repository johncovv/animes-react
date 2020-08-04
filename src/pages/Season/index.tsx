import React, { useState, useEffect } from 'react';
import backgroundImage from '../../assets/img/background/season.png';

import { FilterAnime } from '../../utils/filter-request-data';

import api from '../../services/api.client';

import Grid from '../../components/AnimeGrid';

import { Content, Title } from './styles';

const Season: React.FunctionComponent = () => {
	const [data, setData] = useState<ApiRequest.Anime[]>([]);

	useEffect(() => {
		const requestData = async (): Promise<void> => {
			try {
				const response = await api.get(`/api/animes/lancamento`);

				const filtered = await FilterAnime(response.data);

				setData((state) => [...state, ...filtered]);
			} catch (err) {
				window.console.log(err);
			}
		};

		requestData();
	}, []);

	return (
		<>
			<Content>
				<Title>Novos episódios da temporada</Title>

				<Grid data={data} />
			</Content>

			<style>{`.primary__background{background-image: url('${backgroundImage}');} ::-webkit-scrollbar-thumb {background-color: var(--season-color);}`}</style>
		</>
	);
};

export default Season;
