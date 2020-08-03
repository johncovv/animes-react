import React from 'react';
import backgroundImage from '../../assets/img/background/season.png';

const Season: React.FunctionComponent = () => {
	return (
		<>
			<h1>Season</h1>

			<style>{`.primary__background{background-image: url('${backgroundImage}');}`}</style>
		</>
	);
};

export default Season;
