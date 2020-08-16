import React from 'react';
import { Link } from 'react-router-dom';
import { GoEyeClosed } from 'react-icons/go';

import { useHistory } from '../../hooks/history';
import { HistoryItem, Title } from './styles';
import Popup from '../Popup';

const History: React.FunctionComponent = () => {
	const { history, removeFromHistory } = useHistory();

	const handleCurrentTime = (seconds: number): string => {
		return new Date(seconds * 1000).toISOString().substr(11, 8);
	};

	const handleHiddeHistory = (): void => {
		const historyPopup = window.document.querySelector('.popup__history');
		const svg = window.document.querySelector('header .popup__history-icon');

		if (historyPopup && svg) {
			historyPopup.classList.add('hidden');
			svg.classList.remove('popup__active');
		}
	};

	return (
		<Popup className="history">
			<Title className="history-title">Histórico</Title>
			{history &&
				history.map(({ id, animeId, title, currentTime }) => (
					<HistoryItem key={id} className="history__item">
						<Link
							className="history__item--link"
							onClick={handleHiddeHistory}
							to={`/anime/${animeId}/${id}`}
						>
							<p>{title}</p>
							<p className="history__item--current-time">
								{handleCurrentTime(currentTime)}
							</p>
						</Link>
						<GoEyeClosed
							size={25}
							className="history__item--delete-icon"
							onClick={() => {
								removeFromHistory(id);
							}}
						/>
					</HistoryItem>
				))}
		</Popup>
	);
};

export default History;
