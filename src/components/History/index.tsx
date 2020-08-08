import React from 'react';

import { Link } from 'react-router-dom';

import { MdDeleteForever } from 'react-icons/md';

import { useHistory } from '../../hooks/history';

import { HistoryContent } from './styles';

const History: React.FunctionComponent = () => {
	const { history } = useHistory();

	return (
		<HistoryContent className="history hidden">
			<div className="history__container">
				<div className="history__container--inner">
					<div className="history__item--container">
						{history &&
							history.map(({ id, animeId, title, currentTime }) => (
								<Link
									key={id}
									className="history__item"
									to={`/anime/${animeId}/${id}`}
								>
									<p className="history__item-title">{title}</p>
									<div>
										<p className="history__item--current-time">{currentTime}</p>
										<MdDeleteForever
											size={25}
											className="history__item--delete-icon"
										/>
									</div>
								</Link>
							))}
					</div>
				</div>
			</div>
		</HistoryContent>
	);
};

export default History;
