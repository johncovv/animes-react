import React, { RefObject, useCallback, useState, useRef } from 'react';

import { BiCheckboxSquare, BiCheckbox } from 'react-icons/bi';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

// hooks
import { useEspisodesHook } from '../../../../hooks/episodes';

// assets
import { ReactComponent as SettingsSvg } from '../../assets/settings.svg';

// styles
import {
	Content,
	Popup,
	MainContainer,
	Option,
	Title,
	Container,
} from './styles';

interface OptionsProps {
	resolutions: ApiRequest.EpiOption[];
	videoElement: RefObject<HTMLVideoElement>;
}

const Options: React.FunctionComponent<OptionsProps> = ({
	resolutions,
	videoElement,
}: OptionsProps) => {
	const { currentVideo, handleChangeCurrentVideo } = useEspisodesHook();

	const QualityOption = useRef<HTMLDivElement>(null);
	const SpeedOption = useRef<HTMLDivElement>(null);

	const [popupStatus, setPopupStatus] = useState(false);

	const speed = [
		{ number: 0.25, label: '0.25x' },
		{ number: 0.5, label: '0.5x' },
		{ number: 1, label: 'normal' },
		{ number: 1.5, label: '1.5x' },
		{ number: 2, label: '2x' },
		{ number: 4, label: '4x' },
	];

	const handleChangeResolution = useCallback(
		async ({ id, title, url }: ApiRequest.EpiOption) => {
			const video = videoElement.current;

			if (video) {
				const time = video.currentTime;

				handleChangeCurrentVideo({ id, title, url });

				video.currentTime = time;
			}
		},
		[handleChangeCurrentVideo, videoElement],
	);

	const checkResolution = useCallback(
		(id: number): boolean => {
			return !!(id === currentVideo.id);
		},
		[currentVideo],
	);

	const handleChangeSpeed = useCallback(
		(speedNumber: number) => {
			const element = videoElement.current;

			if (element) element.playbackRate = speedNumber;
		},
		[videoElement],
	);

	const checkSpeed = useCallback(
		(speedNumber: number): boolean => {
			const element = videoElement.current;

			if (element) {
				return !!(element.playbackRate === speedNumber);
			}

			return false;
		},
		[videoElement],
	);

	const handleOptionToggle = useCallback(
		(refElement: RefObject<HTMLDivElement>) => {
			const options = [SpeedOption, QualityOption];

			options.forEach((item) => {
				const element = item.current;
				const ref = refElement.current;

				if (element && ref) {
					if (element === ref) {
						ref.classList.toggle('active');
					} else {
						element.classList.remove('active');
					}
				}
			});
		},
		[SpeedOption, QualityOption],
	);

	const handleOptionButtonClick = useCallback(() => {
		setPopupStatus(!popupStatus);

		const options = [SpeedOption, QualityOption];

		options.forEach((ref) => ref.current?.classList.remove('active'));
	}, [setPopupStatus, popupStatus]);

	return (
		<Content
			onClick={() => handleOptionButtonClick()}
			className={popupStatus ? 'active' : ''}
		>
			<SettingsSvg />

			<Popup style={{ display: popupStatus ? 'flex' : 'none' }}>
				{speed && (
					<MainContainer
						ref={SpeedOption}
						length={speed.length ?? 0}
						onClick={(event) => {
							event.stopPropagation();
							handleOptionToggle(SpeedOption);
						}}
					>
						<Title>
							<IoMdArrowDropleft style={{ left: 0 }} />
							Speed
							<IoMdArrowDropright style={{ right: 0 }} />
						</Title>
						<Container>
							{speed.map(({ number, label }) => (
								<Option
									type="button"
									key={number}
									onClick={() => handleChangeSpeed(number)}
									className={checkSpeed(number) ? 'active' : undefined}
								>
									<BiCheckboxSquare
										style={{ display: checkSpeed(number) ? 'block' : 'none' }}
									/>
									<BiCheckbox
										style={{ display: !checkSpeed(number) ? 'block' : 'none' }}
									/>
									{label}
								</Option>
							))}
						</Container>
					</MainContainer>
				)}

				{resolutions.length > 0 && (
					<MainContainer
						ref={QualityOption}
						length={resolutions.length ?? 0}
						onClick={(event) => {
							event.stopPropagation();
							handleOptionToggle(QualityOption);
						}}
					>
						<Title>
							<IoMdArrowDropleft style={{ left: 0 }} />
							Quality
							<IoMdArrowDropright style={{ right: 0 }} />
						</Title>
						<Container>
							{resolutions.map(({ id, title, url }) => (
								<Option
									type="button"
									key={id}
									onClick={() => handleChangeResolution({ id, title, url })}
									className={checkResolution(id) ? 'active' : undefined}
								>
									<BiCheckboxSquare
										style={{ display: checkResolution(id) ? 'block' : 'none' }}
									/>
									<BiCheckbox
										style={{ display: !checkResolution(id) ? 'block' : 'none' }}
									/>
									{title.split('-')[1].trim()}
								</Option>
							))}
						</Container>
					</MainContainer>
				)}
			</Popup>
		</Content>
	);
};

export default Options;
