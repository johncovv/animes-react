import React, { useEffect } from 'react';

import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

import Recent from '../pages/Recent';
import Season from '../pages/Season';
import Categories from '../pages/Categories';
import AnimePage from '../pages/AnimePage';

import { useLoadingHook } from '../hooks/loading';

const Routes: React.FunctionComponent = () => {
	const { handleSetStatus } = useLoadingHook();

	const { pathname } = useLocation();

	useEffect(() => {
		if (!pathname.match('anime')) handleSetStatus(true);
	}, [pathname, handleSetStatus]);

	return (
		<Switch>
			<Route path="/" exact component={Recent} />
			<Route path="/temporada" component={Season} />
			<Route path="/filtrar/:search?" component={Categories} />
			<Route path="/anime/:animeId/:episodeId?" component={AnimePage} />
			<Redirect from="*" to="/" />
		</Switch>
	);
};

export default Routes;
