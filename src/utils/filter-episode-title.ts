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

	let title = episodeTitle.replace(new RegExp(animeTitle, 'gi'), '');

	title = title.replace(/-/gi, '');
	title = title.replace(/episódio|episodio/gi, 'Episódio - ');

	if (!/Episódio/gi.test(title)) {
		title = `Episódio - ${title}`;
	}

	return title;
};
