import React from 'react';

import { useParams } from 'react-router-dom';

interface AnimeParams {
	id: string;
}

const AnimePage: React.FunctionComponent = () => {
	const { id } = useParams<AnimeParams>();

	return <h1>Anime {id}</h1>;
};

export default AnimePage;
