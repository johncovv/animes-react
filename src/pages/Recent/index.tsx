import React, { useState, useEffect } from 'react';
import backgroundImage from '../../assets/img/background/recents.png';

import GlobalRecents from '../../styles/page.styles';

import Grid from '../../components/AnimeGrid';

import { Content, Title } from './styles';

import { FilterAnime } from '../../utils/filter-request-data';

import api from '../../services/api.client';

const Recent: React.FunctionComponent = () => {
	const [data, setData] = useState<ApiRequest.Anime[]>([]);

	useEffect(() => {
		const requestData = async (): Promise<void> => {
			const response = await api.get(`/api/animes/recentes`);

			const filtered = await FilterAnime(response.data);
			setData((state) => [...state, ...filtered]);
		};

		requestData();
	}, []);

	return (
		<>
			<Content>
				<Title>Novos Episódios</Title>

				<Grid data={data} />
			</Content>

			<GlobalRecents backgroundImage={backgroundImage} varRoot="recent" />
		</>
	);
};

export default Recent;
