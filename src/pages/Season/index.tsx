import React, { useState, useEffect } from 'react';
import backgroundImage from '../../assets/img/background/season.png';

// components, hooks
import Grid from '../../components/AnimeGrid';
import { useLoadingHook } from '../../hooks/loading';

// utils, services
import { FilterAnime } from '../../utils/filter-request-data';
import api from '../../services/api.client';

// styles
import GlobalSeason from '../../styles/page.styles';
import { Content, Title } from './styles';

const Season: React.FunctionComponent = () => {
	const [data, setData] = useState<ApiRequest.Anime[]>([]);

	const { handleSetStatus } = useLoadingHook();

	useEffect(() => {
		const requestData = async (): Promise<void> => {
			try {
				const response = await api.get(`/api/animes/lancamento`);

				const filtered = await FilterAnime(response.data);

				setData((state) => [...state, ...filtered]);
				handleSetStatus(false);
			} catch (err) {
				window.console.log(err);
			}
		};

		requestData();
	}, [handleSetStatus]);

	return (
		<>
			<Content>
				<Title>Novos episódios da temporada</Title>

				<Grid data={data} />
			</Content>

			<GlobalSeason backgroundImage={backgroundImage} varRoot="season" />
		</>
	);
};

export default Season;
