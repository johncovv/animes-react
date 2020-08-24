interface DataType {
	episodeTitle: string;
	animeTitle: string;
	genres: string;
	index: number;
	total?: number;
}

export default ({
	index,
	total = undefined,
	episodeTitle,
	animeTitle,
	genres,
}: DataType): string => {
	const splitedGenres = genres.split(/,/gi);

	if (splitedGenres.some((e) => /filme/gi.test(e))) {
		return `Parte - ${total ? total - index : index + 1}`;
	}

	if (
		/especial/i.test(animeTitle) ||
		splitedGenres.some((e) => /especial/i.test(e))
	) {
		return `Especial - ${total ? total - index : index + 1}`;
	}

	const episodeNumber = episodeTitle
		.split(/([0-9]+)/)
		.filter(Number)
		.slice(-1)[0];

	return `Episódio - ${episodeNumber}`;
};
