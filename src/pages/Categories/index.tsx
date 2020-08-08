import React from 'react';

import { useParams } from 'react-router-dom';

import backgroundImage from '../../assets/img/background/filter.png';

import GlobalFilters from '../../styles/page.styles';

interface CategoriesParams {
	search: string;
}

const Categories: React.FunctionComponent = () => {
	const { search } = useParams<CategoriesParams>();

	return (
		<>
			<h1>Categories</h1>
			{search && (
				<div>
					<h2>Search: {search}</h2>
				</div>
			)}

			<GlobalFilters backgroundImage={backgroundImage} varRoot="filter" />
		</>
	);
};

export default Categories;
