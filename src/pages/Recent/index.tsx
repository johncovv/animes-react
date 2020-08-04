import React from 'react';

import backgroundImage from '../../assets/img/background/recents.png';

import Grid from '../../components/AnimeGrid';

import { Content, Title } from './styles';

const Recent: React.FunctionComponent = () => {
	const episodiosRecentes = [
		{
			id: 1,
			title: 'Gintama - Espisódio - 01',
			thumbnail: 'http://png.zetai.info/84460.jpg',
			views: 6546457,
		},
		{
			id: 2,
			title: 'Boruto: Naruto Next Generations - Espisódio - 02',
			thumbnail: 'http://png.zetai.info/84460.jpg',
			views: 2141,
		},
		{
			id: 3,
			title: 'Boruto: Naruto Next Generations - Espisódio - 03',
			thumbnail: 'http://png.zetai.info/84460.jpg',
			views: 423,
		},
		{
			id: 4,
			title: 'Boruto: Naruto Next Generations - Espisódio - 04',
			thumbnail: 'http://png.zetai.info/84460.jpg',
			views: 745646,
		},
		{
			id: 5,
			title: 'Boruto: Naruto Next Generations - Espisódio - 05',
			thumbnail: 'http://png.zetai.info/84460.jpg',
			views: 75464,
		},
		{
			id: 6,
			title: 'Boruto: Naruto Next Generations - Espisódio - 06',
			thumbnail: 'http://png.zetai.info/84460.jpg',
			views: 74672,
		},
		{
			id: 7,
			title: 'Boruto: Naruto Next Generations - Espisódio - 07',
			thumbnail: 'http://png.zetai.info/84460.jpg',
			views: 987,
		},
		{
			id: 8,
			title: 'Boruto: Naruto Next Generations - Espisódio - 08',
			thumbnail: 'http://png.zetai.info/84460.jpg',
			views: 98735,
		},
		{
			id: 9,
			title: 'Boruto: Naruto Next Generations - Espisódio - 09',
			thumbnail: 'http://png.zetai.info/84460.jpg',
			views: 14325,
		},
	];

	return (
		<>
			<Content>
				<Title>Novos Episódios</Title>

				<Grid data={episodiosRecentes} />
			</Content>

			<style>{`.primary__background{background-image: url('${backgroundImage}');}`}</style>
		</>
	);
};

export default Recent;
