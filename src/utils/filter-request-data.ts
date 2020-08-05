/* eslint-disable no-restricted-syntax */
export const FilterAnime = async (data: []): Promise<ApiRequest.Anime[]> => {
	const filtered: ApiRequest.Anime[] = [];

	for await (const item of data) {
		const { Id, Nome, Desc, Status, Imagem, Ano, Categoria, Rank } = item;

		filtered.push({
			id: Id,
			title: Nome,
			status: Status,
			genres: Categoria,
			year: Ano,
			views: Rank,
			thumbnail: Imagem,
			description: Desc,
		});
	}

	return filtered;
};

export const FilterEpisodesList = async (
	data: [],
): Promise<ApiRequest.EpiList[]> => {
	const filtered: ApiRequest.EpiList[] = [];

	for await (const item of data) {
		const { Id, Nome, Data } = item;

		filtered.push({
			id: Id,
			title: Nome,
			date: Data,
		});
	}

	return filtered;
};

export const FilterEpisodeOptions = async (
	data: [],
): Promise<ApiRequest.EpiOption[]> => {
	const filtered: ApiRequest.EpiOption[] = [];

	for await (const item of data) {
		const { Id, Nome, Endereco } = item;

		filtered.push({
			id: Id,
			title: Nome,
			url: Endereco,
		});
	}

	return filtered;
};
