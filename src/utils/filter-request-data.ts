/* eslint-disable no-restricted-syntax */
export const FilterAnime = async (data: []): Promise<ApiRequest.Anime[]> => {
	const filtered = [];

	for await (const item of data) {
		const { Id, Nome, Desc, Status, Imagem, Ano, Categoria, Rank } = item;

		filtered.push({
			id: Id,
			title: Nome,
			description: Desc,
			status: Status,
			thumbnail: Imagem,
			year: Ano,
			genres: Categoria,
			views: Rank,
		});
	}

	return filtered;
};

export const FilterEpisodesList = async (
	data: [],
): Promise<ApiRequest.EpiList[]> => {
	const filtered = [];

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
