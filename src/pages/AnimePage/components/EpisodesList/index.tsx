import React from 'react';

import { BsFillEyeSlashFill } from 'react-icons/bs';
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';
import { FiHeart, FiClock } from 'react-icons/fi';

// hooks
import { useHistory as useHistoryHook } from '../../../../hooks/history';
import { useSaved } from '../../../../hooks/saved';

// utils
import FilterEpisodeTitle from '../../../../utils/filter-episode-title';

// styles
import { Content } from './styles';

interface EpisodesListProps {
	isReverse: boolean;
	episodesList: ApiRequest.EpiList[];
	animeDescription: ApiRequest.Anime;
	handleAddToHistory(id: number, title: string, currentTime: number): void;
	handleSortEpisodesList(): void;
	handleEpisodeRequest(
		event: React.MouseEvent<HTMLButtonElement>,
		id: number,
		title: string,
	): void;
}

const EpisodesList: React.FunctionComponent<EpisodesListProps> = ({
	isReverse,
	animeDescription,
	episodesList,
	handleAddToHistory,
	handleSortEpisodesList,
	handleEpisodeRequest,
}: EpisodesListProps) => {
	// hooks
	const { removeFromHistory, history } = useHistoryHook();
	const {
		toggleFavorites,
		toggleWatchLater,
		favorites,
		watchLater,
	} = useSaved();

	return (
		<Content className="episodes__list">
			<div className="episodes__list--options">
				<div className="episodes__list--options-left">
					{!isReverse ? (
						<FaSortAmountDown
							size={24}
							onClick={handleSortEpisodesList}
							className="episodes__list--options-sort"
						/>
					) : (
						<FaSortAmountDownAlt
							size={24}
							onClick={handleSortEpisodesList}
							className="episodes__list--options-sort"
						/>
					)}
				</div>

				<div className="episodes__list--options-right">
					<FiHeart
						size={24}
						onClick={() => toggleFavorites(animeDescription)}
						className={`episodes__list--options-favorite ${
							favorites.find((i) => i.id === animeDescription.id)
								? 'checked'
								: ''
						}`}
					/>
					<FiClock
						size={24}
						onClick={() => toggleWatchLater(animeDescription)}
						className={`episodes__list--options-watch-later ${
							watchLater.find((i) => i.id === animeDescription.id)
								? 'checked'
								: ''
						}`}
					/>
				</div>
			</div>

			<div className="episodes__list--container">
				{episodesList &&
					episodesList.map(({ id, title }, index, arr) => (
						<button
							type="button"
							key={id}
							onClick={(e) => {
								const titleFiltered = FilterEpisodeTitle({
									index,
									episodeTitle: title,
									animeTitle: animeDescription.title,
									genres: animeDescription.genres,
									total: isReverse ? arr.length : undefined,
								});

								handleEpisodeRequest(e, id, titleFiltered);
								handleAddToHistory(id, title, 0);
							}}
							className={`${history.find((i) => i.id === id) ? 'checked' : ''}`}
						>
							<div className="thumb">
								<span
									className={`uncheck-history ${
										history.find((i) => i.id === id) ? 'checked' : ''
									}`}
								>
									<BsFillEyeSlashFill
										size={25}
										onClick={(e) => {
											e.stopPropagation();
											removeFromHistory(id);
										}}
									/>
								</span>
								<img
									data-id={id}
									className="episode-thumbnail"
									src={`http://thumb.zetai.info/${id}.jpg`}
									onError={(e) => {
										e.currentTarget.src =
											'https://placeholder.pics/svg/320x200/000000-000000/FFFFFF/thumbnail%20not%20found';
									}}
									alt={`${title} thumbnail`}
								/>
							</div>
							<div className="titles-container">
								<p className="title">
									{FilterEpisodeTitle({
										index,
										animeTitle: animeDescription.title,
										episodeTitle: title,
										genres: animeDescription.genres,
										total: !isReverse ? arr.length : undefined,
									})}
								</p>
								<p className="anime-title">{animeDescription.title}</p>
							</div>
						</button>
					))}
			</div>
		</Content>
	);
};

export default EpisodesList;
