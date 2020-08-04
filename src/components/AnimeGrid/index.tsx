import React, { useCallback, useState } from 'react';

import { FiPlay, FiEye } from 'react-icons/fi';

import { Content, Item, ItemLink, Favorite, WatchLater } from './styles';

import scaleImage from '../../assets/img/thumb-grid-proportion.png';

interface AnimeGridProps {
	data: ApiRequest.Anime[];
}

const AnimeGrid: React.FunctionComponent<AnimeGridProps> = ({
	data,
}: AnimeGridProps) => {
	const [favorites, setFavorites] = useState([{ id: 1 }, { id: 6 }, { id: 4 }]);
	const [watchLater, setWatchLater] = useState([
		{ id: 1 },
		{ id: 6 },
		{ id: 4 },
	]);

	const handleFavorite = useCallback(
		(id: number) => {
			const exist = favorites.find((item) => item.id === id);

			if (exist) {
				setFavorites((state) => state.filter((item) => item.id !== id));
			} else {
				setFavorites((state) => [...state, { id }]);
			}
		},
		[favorites],
	);

	const handleWatchLater = useCallback(
		(id: number) => {
			const exist = watchLater.find((item) => item.id === id);

			if (exist) {
				setWatchLater((state) => state.filter((item) => item.id !== id));
			} else {
				setWatchLater((state) => [...state, { id }]);
			}
		},
		[watchLater],
	);

	function handleFilterViews(number: number): string {
		return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
	}

	return (
		<div>
			<Content>
				{data &&
					data.map(({ id, thumbnail, title, views }) => (
						<Item key={id}>
							<div className="grid__options">
								<WatchLater
									size={24}
									className="grid__options--wl"
									onClick={() => handleWatchLater(id)}
									$isChecked={!!watchLater.find((a) => a.id === id)}
								/>
								<Favorite
									size={24}
									className="grid__options--fav"
									onClick={() => handleFavorite(id)}
									$isChecked={!!favorites.find((a) => a.id === id)}
								/>
							</div>
							<ItemLink to={`/anime/${id}`}>
								<span
									className="grid__item--thumb"
									style={{ backgroundImage: `url(${thumbnail})` }}
								/>
								<img className="grid__scale--thumb" src={scaleImage} alt="" />
								<p className="grid__item--title">{title}</p>
								<div className="grid__item--title-popup">
									<p>{title}</p>
								</div>
								<div className="grid__item--play-button">
									<FiPlay size={50} />
								</div>
								<div className="grid__item--views">
									<FiEye size={18} />
									<p>{handleFilterViews(views)} views</p>
								</div>
							</ItemLink>
						</Item>
					))}
			</Content>
		</div>
	);
};

export default AnimeGrid;
