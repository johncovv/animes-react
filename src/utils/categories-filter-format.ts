interface ArrayDataType {
	id: number | string;
	label: string;
	value: unknown;
}

interface QueryProps {
	genres: ArrayDataType[];
	year: ArrayDataType;
	search: string;
}

const CreateQuery = ({ genres, year, search }: QueryProps): string => {
	let finalQuery = '';

	const genresQuery = genres.map(({ value }) => {
		const array = value as string[];

		if (array.length > 0) {
			const filtered = array.map((i, index) => {
				if (index > 0) {
					return `or substringof('${i}', Categoria)`;
				}
				return `substringof('${i}', Categoria)`;
			});

			return filtered.length > 1 ? `(${filtered.join(' ')})` : filtered;
		}

		return `substringof('${value}', Categoria)`;
	});

	if (genresQuery.length > 0) {
		finalQuery += `&$filter=${genresQuery.join(' and ')}`;
	}

	if (year) {
		if (finalQuery.length > 0) {
			finalQuery += ` and substringof('${year.value}', Ano)`;
		} else {
			finalQuery += `&$filter=substringof('${year.value}', Ano)`;
		}
	}

	if (search.length > 0) {
		if (finalQuery.length > 0) {
			finalQuery += ` and substringof('${search}', Nome)`;
		} else {
			finalQuery += `&$filter=substringof('${search}', Nome)`;
		}
	}

	return finalQuery;
};

export default CreateQuery;
