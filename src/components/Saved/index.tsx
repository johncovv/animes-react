import React from 'react';

import Popup from '../Popup';

import { useSaved } from '../../hooks/saved';

import Grid from '../AnimeGrid';

import { Content } from './styles';

const Saved: React.FunctionComponent = () => {
	const { favorites, watchLater } = useSaved();

	return (
		<Popup className="saved">
			<Content className="saved__container">
				<div className="favorites">
					<p>Favoritos</p>
					<Grid data={favorites} isPopup className="popup__grid--favorites" />
				</div>
				<div className="watch-later">
					<p>Assistir depois</p>
					<Grid
						data={watchLater}
						isPopup
						className="popup__grid--watch-later"
					/>
				</div>
			</Content>
		</Popup>
	);
};

export default Saved;
