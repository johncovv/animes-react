/* eslint-disable react/require-default-props */
import React, { useCallback } from 'react';
import { FiEye } from 'react-icons/fi';
import { AiFillPlayCircle } from 'react-icons/ai';

import { Content, Item, ItemLink, Favorite, WatchLater } from './styles';
import scaleImage from '../../assets/img/thumb-grid-proportion.png';
import { useSaved } from '../../hooks/saved';

import thumbNotFound from '../../assets/img/thumb-not-found.png';

interface AnimeGridProps {
	data: ApiRequest.Anime[];
	isPopup?: boolean;
	className?: string;
}

const AnimeGrid: React.FunctionComponent<AnimeGridProps> = ({
	data,
	isPopup,
	className,
}: AnimeGridProps) => {
	const {
		toggleFavorites,
		toggleWatchLater,
		favorites,
		watchLater,
	} = useSaved();

	function handleFilterViews(number: number): string {
		return number.toString().replace(/(?=(?:\d{3})+(?:\.|$))/g, '.');
	}

	const handleClosePopup = useCallback(() => {
		if (isPopup) {
			const popup = window.document.querySelector('.popup__saved');
			const svg = window.document.querySelector('header .popup__saved-icon');

			if (popup && svg) {
				popup.classList.add('hidden');
				svg.classList.remove('popup__active');
			}
		}
	}, [isPopup]);

	return (
		<div>
			<Content className={className}>
				{data &&
					data.map((item) => (
						<Item key={item.id} className="grid__item--container">
							<div className="grid__options">
								<WatchLater
									size={24}
									className="grid__options--wl"
									onClick={() => toggleWatchLater(item)}
									$isChecked={!!watchLater.find((i) => i.id === item.id)}
								/>
								<Favorite
									size={24}
									className="grid__options--fav"
									onClick={() => toggleFavorites(item)}
									$isChecked={!!favorites.find((i) => i.id === item.id)}
								/>
							</div>
							<ItemLink
								to={`/anime/${item.id}`}
								onClick={() => handleClosePopup()}
							>
								<img
									className="grid__item--thumb"
									src={item.thumbnail}
									alt={`${item.title} thumbnail`}
									onError={(e) => {
										e.currentTarget.src = thumbNotFound;
									}}
								/>
								<img
									className="grid__scale--thumb"
									src={scaleImage}
									alt="thumb-scale"
								/>
								<p className="grid__item--title">{item.title}</p>
								<div className="grid__item-hover">
									<div className="grid__item--title-popup">
										<p>{item.title}</p>
									</div>
									<div className="grid__item--play-button">
										<AiFillPlayCircle size={50} />
									</div>
									{item.views && (
										<div className="grid__item--views">
											<FiEye size={18} />
											<p>{handleFilterViews(item.views)} views</p>
										</div>
									)}
								</div>
							</ItemLink>
						</Item>
					))}
			</Content>
		</div>
	);
};

export default AnimeGrid;
