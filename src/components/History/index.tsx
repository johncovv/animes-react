import React from 'react';

import { Link } from 'react-router-dom';

import { GoEyeClosed } from 'react-icons/go';

import { useHistory } from '../../hooks/history';

import { HistoryContent } from './styles';

const History: React.FunctionComponent = () => {
	const { history, removeFromHistory } = useHistory();

	const handleCurrentTime = (seconds: number): string => {
		return new Date(seconds * 1000).toISOString().substr(11, 8);
	};

	const handleHiddeHistory = (): void => {
		const historyPopup = window.document.querySelector('.history');
		const svg = window.document.querySelector('header .history__popup');

		if (historyPopup && svg) {
			historyPopup.classList.toggle('hidden');
			svg.classList.toggle('popup__active');
		}
	};

	return (
		<HistoryContent className="history hidden">
			<div className="history__container">
				<div className="history__container--inner">
					<div className="history__items--container">
						<p className="history__title">Histórico</p>
						{history &&
							history.reverse().map(({ id, animeId, title, currentTime }) => (
								<div key={id} className="history__item">
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
										onClick={(e) => {
											removeFromHistory(id);
										}}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
		</HistoryContent>
	);
};

export default History;
