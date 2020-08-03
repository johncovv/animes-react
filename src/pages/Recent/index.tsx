import React from 'react';

import backgroundImage from '../../assets/img/background/recents.png';

const Recent: React.FunctionComponent = () => {
	return (
		<>
			<h1>Recent</h1>

			<style>{`.primary__background{background-image: url('${backgroundImage}');}`}</style>
		</>
	);
};

export default Recent;
