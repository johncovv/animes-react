import React, { useState, useEffect } from 'react';
import backgroundImage from '../../assets/img/background/recents.png';

// components, hooks
import Grid from '../../components/AnimeGrid';
import { useLoadingHook } from '../../hooks/loading';

// utils, services
import { FilterAnime } from '../../utils/filter-request-data';
import api from '../../services/api.client';

// styles
import GlobalRecents from '../../styles/page.styles';
import { Content, Title } from './styles';

const Recent: React.FunctionComponent = () => {
	const [data, setData] = useState<ApiRequest.Anime[]>([]);

	const { handleSetStatus } = useLoadingHook();

	useEffect(() => {
		const requestData = async (): Promise<void> => {
			const response = await api.get(`/api/animes/recentes`);

			const filtered = await FilterAnime(response.data);
			setData((state) => [...state, ...filtered]);
			handleSetStatus(false);
		};

		requestData();
	}, [handleSetStatus]);

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
