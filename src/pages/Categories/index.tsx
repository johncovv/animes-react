import React from 'react';

import { useParams } from 'react-router-dom';

import backgroundImage from '../../assets/img/background/filter.png';

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

			<style>{`.primary__background{background-image: url('${backgroundImage}');} ::-webkit-scrollbar-thumb {background-color: var(--filter-color);}`}</style>
		</>
	);
};

export default Categories;
