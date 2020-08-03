import React from 'react';

import { useParams } from 'react-router-dom';

import backgroundImage from '../../assets/img/background/anime.png';

interface AnimeParams {
	id: string;
}

const AnimePage: React.FunctionComponent = () => {
	const { id } = useParams<AnimeParams>();

	return (
		<>
			<h1>Anime {id}</h1>

			<style>{`.primary__background{background-image: url('${backgroundImage}');}`}</style>
		</>
	);
};

export default AnimePage;
