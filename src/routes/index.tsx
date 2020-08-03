import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Recent from '../pages/Recent';
import Season from '../pages/Season';
import Categories from '../pages/Categories';
import AnimePage from '../pages/AnimePage';

import NotFound from '../pages/Errors/NotFound';

const Routes: React.FunctionComponent = () => (
	<Switch>
		<Route path="/" exact component={Recent} />
		<Route path="/temporada" component={Season} />
		<Route path="/filtrar/:search?" component={Categories} />
		<Route path="/anime/:id" component={AnimePage} />
		<Route path="*" component={NotFound} />
	</Switch>
);

export default Routes;
