import React, { useCallback, useRef, useState, useEffect } from 'react';

import { PlayerContainer, PlayerOptions } from './styles';
import PlayerTitle from './components/PlayerTitle';
import PlayPauseButton from './components/PlayPauseButton';
import PlayCircle from './components/PlayCircle';
import {
	ProgressBarContainer,
	ProgressBar,
	ProgressBarBackground,
	ProgressBarLoading,
	ProgressBarCurrent,
	BufferedBar,
} from './components/ProgressBar';
import TimePopup from './components/TimePopup';
import ClockTime from './components/Clock';
import {
	VolumeBar,
	VolumeIcon,
	Volume,
	VolumeBackground,
	VolumeCurrent,
	VolumeIconMobile,
	VolumeContainer,
} from './components/Volume';
import PictureInPicture from './components/PictureInPicture';
import Resolution from './components/Resolution';
import FullScreen from './components/Fullscreen';

import { useHistory } from '../../hooks/history';
import { useEspisodesHook } from '../../hooks/episodes';

interface ActiveEpisode {
	id: number | undefined;
	title: string | undefined;
}

interface PlayerProps {
	poster: string;
	autoplay: boolean;
	loop?: boolean;
}

interface StorageVolume {
	volume: number;
}

const Player: React.FunctionComponent<PlayerProps> = ({
	poster,
	autoplay = false,
	loop = false,
}: PlayerProps) => {
	/* REFS */
	const videoElement = useRef<HTMLVideoElement>(null);
	const playerElement = useRef<HTMLDivElement>(null);
	const progressBarElement = useRef<HTMLInputElement>(null);
	const volumeElement = useRef<HTMLInputElement>(null);

	/* STATE */
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFullScreen, setIsFullscreen] = useState(false);
	const [progressBarWidth, setProgressBarWidth] = useState(0);
	const [bufferedWidth, setBufferedWidth] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [videoDuration, setVideoDuration] = useState(0);
	const [resoPopupOpen, setResoPopupOpen] = useState(false);
	const [timePopup, setTimePopup] = useState('00:00:00');
	const [timePopupLocation, setTimePopupLocation] = useState(0);
	const [volume, setVolume] = useState(() => {
		const storageVolume = localStorage.getItem('@ReactVideoPlayer:volume');

		if (storageVolume) {
			const parsed: StorageVolume = JSON.parse(storageVolume);

			return parsed.volume;
		}

		return 100;
	});
	const [isLoading, setIsLoading] = useState(false);
	const [volumeMobile, setVolumeMobile] = useState(false);
	const [showControls, setShowControls] = useState(false);
	const [pipActive, setPipActive] = useState(false);

	/* HOOKS */
	const { history } = useHistory();
	const {
		currentVideo,
		activeEpisode,
		episodeResolutions,
		handleChangeCurrentVideo,
	} = useEspisodesHook();

	useEffect(() => {
		const video = videoElement.current;

		if (video) {
			video.volume = volume / 100;
		}
	}, [volume]);

	useEffect(() => {
		if (episodeResolutions.length > 0) {
			handleChangeCurrentVideo(episodeResolutions[0]);
		}
	}, [episodeResolutions, handleChangeCurrentVideo]);

	useEffect(() => {
		const video = videoElement.current;

		if (video) {
			video.addEventListener('enterpictureinpicture', () => {
				setPipActive(true);
			});

			video.addEventListener('leavepictureinpicture', () => {
				setPipActive(false);
			});
		}
	}, []);

	const handleVideoChange = useCallback(() => {
		const element = videoElement.current;

		setIsPlaying(!element?.paused);
	}, []);

	const handleFullScreen = useCallback(() => {
		const element = playerElement.current;

		if (element) {
			if (window.document.fullscreenElement) {
				window.document.exitFullscreen();
				setIsFullscreen(false);
			} else {
				element.requestFullscreen();
				setIsFullscreen(true);
			}
		}
	}, []);

	const handleProgressBarUpdate = useCallback(() => {
		const video = videoElement.current;

		if (video) {
			setProgressBarWidth((video.currentTime / video.duration) * 100);
		}
	}, []);

	const handleBufferedUpdate = useCallback(() => {
		const video = videoElement.current;
		if (!video) return;
		if (video.duration > 0) {
			// eslint-disable-next-line no-plusplus
			for (let i = 0; i < video.buffered.length; i++) {
				if (
					video.buffered.start(video.buffered.length - 1 - i) <
					video.currentTime
				) {
					setBufferedWidth(
						(video.buffered.end(video.buffered.length - 1 - i) /
							video.duration) *
							100,
					);
					break;
				}
			}
		}
	}, []);

	const handleTimeUpdate = useCallback(() => {
		const video = videoElement.current;
		const progress = progressBarElement.current;

		if (video && progress) {
			setVideoDuration(video.duration);
			setCurrentTime(video.currentTime);
		}
		handleProgressBarUpdate();
		handleBufferedUpdate();
	}, [handleProgressBarUpdate, handleBufferedUpdate]);

	const handleResolutiontitle = useCallback((title: string): string => {
		return title.split('-')[1];
	}, []);

	const handleChangeResolution = useCallback(
		async ({ id, title, url }: ApiRequest.EpiOption) => {
			const video = videoElement.current;

			if (video) {
				const time = video.currentTime;

				handleChangeCurrentVideo({ id, title, url });

				video.currentTime = time;
			}
		},
		[handleChangeCurrentVideo],
	);

	const handleResoPopup = useCallback(() => {
		setResoPopupOpen(!resoPopupOpen);
	}, [resoPopupOpen]);

	const handleCloseResoPopup = useCallback(() => {
		setResoPopupOpen(false);
	}, []);

	const handleManualUpdate = useCallback(() => {
		const element = progressBarElement.current;
		const video = videoElement.current;

		if (video && element) {
			video.currentTime = parseInt(element.value, 0);
		}

		handleProgressBarUpdate();
	}, [handleProgressBarUpdate]);

	const handlePopupTimeHover = useCallback(
		(e) => {
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
		[videoDuration],
	);

	const handleVolumeChange = useCallback(() => {
		const element = volumeElement.current;
		const video = videoElement.current;

		if (element && video) {
			video.volume = parseInt(element.value, 10) / 100;
			setVolume(parseInt(element.value, 10));
			localStorage.setItem(
				'@ReactVideoPlayer:volume',
				JSON.stringify({ volume: parseInt(element.value, 10) }),
			);
		}
	}, []);

	const handleVolumeButton = useCallback(() => {
		const video = videoElement.current;

		const storageVolume = localStorage.getItem('@ReactVideoPlayer:volume');

		let parsed: StorageVolume = { volume: 0.5 };

		if (storageVolume) {
			parsed = JSON.parse(storageVolume);
		}

		if (video)
			if (volume === 0) {
				video.volume = parsed.volume / 100;
				setVolume(parsed.volume);
			} else {
				video.volume = 0;
				setVolume(0);
			}
	}, [volume]);

	const handlePictureInPicture = useCallback(() => {
		const video = videoElement.current;

		if (video && video.readyState >= 2) {
			if (document.pictureInPictureElement) {
				document.exitPictureInPicture();
				setPipActive(false);
			} else {
				video.requestPictureInPicture();
				setPipActive(true);
			}
		}
	}, []);

	const handleVolumeMobile = useCallback(() => {
		setVolumeMobile(!volumeMobile);
	}, [volumeMobile]);

	const handleShowControls = useCallback(() => {
		if (!showControls && window.innerWidth > 480) setShowControls(true);
	}, [showControls]);

	const handleCloseControls = useCallback(() => {
		if (showControls) setShowControls(false);
	}, [showControls]);

	/* CALLBACKS */
	const handlePlayPause = useCallback(
		(mobile = false): void => {
			const element = videoElement.current;

			if (mobile === true) {
				if (window.innerWidth <= 480) {
					setShowControls(!showControls);
					return;
				}
			}

			if (element)
				if (element.paused) {
					if (element.readyState >= 2) {
						element.play();
					}
				} else {
					element.pause();
				}
		},
		[showControls],
	);

	const handleVideoStartLoad = useCallback(() => {
		const exist = history.find((i) => i.id === activeEpisode.id);
		const element = videoElement.current;

		if (element && exist) {
			element.currentTime = exist.currentTime;
		}
	}, [history, activeEpisode]);

	/* DOM COMPONENT */
	return (
		<PlayerContainer
			id="player"
			ref={playerElement}
			isPlaying={isPlaying}
			onContextMenu={(e) => e.preventDefault()}
			onMouseMove={handleShowControls}
			onMouseLeave={handleCloseControls}
			className={`player--controls-${
				showControls || !isPlaying ? 'show' : 'hidde'
			}`}
		>
			{activeEpisode.title && (
				<PlayerTitle
					className="player__title"
					onClick={() => handlePlayPause(true)}
				>
					<p>{activeEpisode.title}</p>
				</PlayerTitle>
			)}
			<video
				ref={videoElement}
				src={currentVideo?.url || undefined}
				autoPlay={autoplay}
				onClick={() => handlePlayPause(true)}
				onPlay={handleVideoChange}
				onPause={handleVideoChange}
				onTimeUpdate={handleTimeUpdate}
				loop={loop}
				poster={
					activeEpisode.id
						? `http://thumb.zetai.info/${activeEpisode.id}.jpg`
						: poster
				}
				onLoadStart={() => {
					handleVideoStartLoad();
					setIsLoading(true);
				}}
				onWaiting={() => setIsLoading(true)}
				onCanPlay={() => setIsLoading(false)}
			/>

			{/* circle play center */}
			<PlayCircle
				className={`player__play-circle ${!isPlaying ? 'show' : 'hidde'}`}
				onClick={handlePlayPause}
			/>

			{/* player controls */}
			<PlayerOptions className="player__controls">
				<PlayPauseButton
					className={`player__option ${isLoading ? 'loading' : 'none'}`}
					isPlaying={isPlaying}
					onClick={handlePlayPause}
				/>

				{/* progressbar */}
				<ProgressBarContainer className="player__option --no-pointer">
					<ProgressBar
						ref={progressBarElement}
						max={videoDuration || 0}
						value={currentTime}
						onChange={handleManualUpdate}
						onMouseMove={handlePopupTimeHover}
						data-width={`${progressBarWidth}%`}
					/>
					<ProgressBarBackground className="player__range--background" />
					<BufferedBar
						style={{ width: `${bufferedWidth}%` }}
						className="player__range--buffering"
					/>
					<ProgressBarLoading
						className="player__bar--loading"
						isLoading={isLoading}
					/>
					<ProgressBarCurrent
						className="player__range--current"
						progressValue={progressBarWidth}
					/>
					<TimePopup
						className="progress__bar--time"
						hoverTime={timePopupLocation}
					>
						{timePopup}
					</TimePopup>
				</ProgressBarContainer>
				<ClockTime
					className="player__option --no-pointer --no-hover"
					currentTime={currentTime}
					duration={videoDuration}
				/>

				{/* volume */}
				<>
					<VolumeContainer className="player__option">
						<VolumeIconMobile
							volumeStatus={volume}
							onClick={handleVolumeMobile}
							isActive={volumeMobile}
							isMuted={volume}
						/>
						<VolumeIcon
							volumeStatus={volume}
							onClick={handleVolumeButton}
							isMuted={volume}
						/>
						<VolumeBar
							className={`player__volume--bar --no-pointer ${
								volumeMobile ? '' : 'hidden'
							}`}
						>
							<Volume
								ref={volumeElement}
								value={volume}
								onChange={handleVolumeChange}
							/>
							<VolumeBackground className="player__range--background" />
							<VolumeCurrent
								className="player__range--current"
								volumeRange={volume}
							/>
						</VolumeBar>
					</VolumeContainer>
				</>

				{/* resolution */}
				<Resolution
					className="player__option"
					isOpen={resoPopupOpen}
					onClick={handleResoPopup}
					currentResolution={currentVideo}
				>
					{episodeResolutions && episodeResolutions.length > 0 && (
						<div onMouseLeave={handleCloseResoPopup}>
							{episodeResolutions.map(({ id, title, url }) => (
								<button
									type="button"
									key={id}
									onClick={() => handleChangeResolution({ id, title, url })}
									data-id={id}
								>
									{handleResolutiontitle(title)}
								</button>
							))}
						</div>
					)}
				</Resolution>

				{/* Picture in Picture */}
				<PictureInPicture
					className="player__option"
					onClick={handlePictureInPicture}
					isOpen={pipActive}
				/>

				{/* fullscreen */}
				<FullScreen
					className="player__option"
					fullscreen={isFullScreen}
					onClick={handleFullScreen}
				/>
			</PlayerOptions>
		</PlayerContainer>
	);
};

export default Player;
