import React, { RefObject, useCallback, useState } from 'react';

import {
	ProgressBarContainer,
	BufferedBar,
	ProgressBarInputRange,
	ProgressBarBackground,
	ProgressBarCurrent,
	ProgressBarLoading,
	TimePopup,
} from './styles';

interface ProgressBarProps {
	isLoading: boolean;
	videoDuration: number;
	currentTime: number;
	progressBarWidth: number;
	bufferedWidth: number;
	progressBarElement: RefObject<HTMLInputElement>;
	handleManualUpdate(): void;
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
	isLoading,
	videoDuration,
	currentTime,
	progressBarWidth,
	bufferedWidth,
	progressBarElement,
	handleManualUpdate,
}: ProgressBarProps) => {
	const [timePopup, setTimePopup] = useState('00:00:00');
	const [timePopupLocation, setTimePopupLocation] = useState(0);

	const handlePopupTimeHover = useCallback(
		(e: React.MouseEvent<HTMLInputElement>) => {
			e.persist();

			const position = e.nativeEvent.offsetX;

			setTimePopupLocation(position);

			const element = progressBarElement.current;

			if (element) {
				const seconds = (position / element.clientWidth) * videoDuration;
				const formated = new Date((seconds || 0) * 1000)
					.toISOString()
					.substr(11, 8);

				const splited = formated.split(':');

				if (splited[0] === '00') {
					splited.shift();
				}

				setTimePopup(splited.join(':'));
			}
		},
		[videoDuration, progressBarElement],
	);

	return (
		<ProgressBarContainer>
			{/* input range */}
			<ProgressBarInputRange
				ref={progressBarElement}
				max={videoDuration || 0}
				value={currentTime}
				onChange={handleManualUpdate}
				onMouseMove={handlePopupTimeHover}
				data-width={`${progressBarWidth}%`}
			/>
			{/* background */}
			<ProgressBarBackground className="player__input--background" />

			{/* beffered */}
			<BufferedBar
				style={{ width: `${bufferedWidth}%` }}
				className="player__input--buffered"
			/>

			{/* loading */}
			<ProgressBarLoading
				isLoading={isLoading}
				className="player__input--loading"
			/>

			{/* current time */}
			<ProgressBarCurrent
				progressValue={progressBarWidth}
				className="player__input--current"
			/>

			{/* time popup */}
			<TimePopup hoverTime={timePopupLocation} className="player__input--time">
				{timePopup}
			</TimePopup>
		</ProgressBarContainer>
	);
};

export default ProgressBar;
