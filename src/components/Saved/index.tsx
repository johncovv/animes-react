import React, { useCallback, useState } from 'react';
import { FiUpload, FiDownload } from 'react-icons/fi';
import { MdWatchLater, MdFavorite } from 'react-icons/md';

import Popup from '../Popup';

import { useSaved } from '../../hooks/saved';

import Grid from '../AnimeGrid';

import { Content } from './styles';

interface JsonFileType {
	favorites: ApiRequest.Anime[];
	watchLater: ApiRequest.Anime[];
}

const Saved: React.FunctionComponent = () => {
	const {
		favorites,
		watchLater,
		concatToFavorites,
		concatToWatchLater,
	} = useSaved();

	const [inputChange, setInputChange] = useState(0);

	const handleDownload = useCallback(() => {
		const data = `data:text/json;charset=utf-8,${encodeURIComponent(
			JSON.stringify({ favorites, watchLater }),
		)}`;

		const anchor = document.createElement('a');
		anchor.href = data;
		anchor.download = `animes-react-${Date.now()}.json`;
		anchor.click();
	}, [favorites, watchLater]);

	const handleUpload = useCallback(
		async (e) => {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.onload = (event) => {
				const result = event?.target?.result;

				if (result) {
					const parsed = JSON.parse(result.toString()) as JsonFileType;

					const favoritesFiltered = parsed.favorites.filter(
						(a) => !favorites.find((i) => i.id === a.id),
					);
					concatToFavorites(favoritesFiltered);

					const watchLaterFiltered = parsed.watchLater.filter(
						(a) => !watchLater.find((i) => i.id === a.id),
					);
					concatToWatchLater(watchLaterFiltered);

					setInputChange(+1);
				}
			};
			reader.readAsText(file);
		},
		[
			favorites,
			concatToFavorites,
			watchLater,
			concatToWatchLater,
			setInputChange,
		],
	);

	return (
		<Popup className="saved">
			<Content className="saved__container">
				<div className="saved__options">
					{(favorites.length > 0 || watchLater.length > 0) && (
						<button
							type="button"
							className="saved__download"
							onClick={handleDownload}
						>
							<FiDownload size={25} />
							download
						</button>
					)}
					<label htmlFor="upload__saved" className="saved__upload">
						<FiUpload size={25} />
						upload
						<input
							id="upload__saved"
							key={inputChange}
							type="file"
							onChange={handleUpload}
						/>
					</label>
				</div>
				<div className="favorites">
					{favorites.length > 0 && (
						<p className="favorites--title">
							<MdFavorite size={25} /> Favoritos
						</p>
					)}
					<Grid data={favorites} isPopup className="popup__grid--favorites" />
				</div>
				<div className="watch-later">
					{watchLater.length > 0 && (
						<p className="watch-later--title">
							<MdWatchLater size={25} /> Assistir depois
						</p>
					)}
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
