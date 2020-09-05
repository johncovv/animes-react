import React, { useCallback, useRef, useState, useEffect } from 'react';

import PlayerTitle from './components/PlayerTitle';
import PlayCircle from './components/PlayCircle';
import ClockTime from './components/Clock';
import PictureInPicture from './components/PictureInPicture';
import FullScreen from './components/Fullscreen';

import { useHistory } from '../../hooks/history';
import { useEspisodesHook } from '../../hooks/episodes';

// components
import ProgressBar from './components/ProgressBar';
import PlayPauseLoading from './components/PlayPauseLoading';
import Volume from './components/Volume';
import Options from './components/Options';

import GlobalStyles, { PlayerContainer, PlayerOptions } from './styles';

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

	/* STATE */
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFullScreen, setIsFullscreen] = useState(false);
	const [progressBarWidth, setProgressBarWidth] = useState(0);
	const [bufferedWidth, setBufferedWidth] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [videoDuration, setVideoDuration] = useState(0);

	const [isLoading, setIsLoading] = useState(false);

	const [showControls, setShowControls] = useState(false);
	const [pipActive, setPipActive] = useState(false);

	/* HOOKS */
	const { history } = useHistory();
	const {
		currentVideo,
		activeEpisode,
		episodeResolutions,
		handleChangeCurrentVideo,
		handleClearEpisodeHookData,
	} = useEspisodesHook();

	useEffect(() => {
		if (episodeResolutions.length > 0) {
			handleChangeCurrentVideo(episodeResolutions[0]);
		}
	}, [episodeResolutions, handleChangeCurrentVideo]);

	useEffect(() => {
		return () => {
			handleClearEpisodeHookData();
		};
	}, [handleClearEpisodeHookData]);

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

	const handleManualUpdate = useCallback(() => {
		const element = progressBarElement.current;
		const video = videoElement.current;

		if (video && element) {
			video.currentTime = parseInt(element.value, 0);
		}

		handleProgressBarUpdate();
	}, [handleProgressBarUpdate]);

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
		<>
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
					<PlayPauseLoading
						videoRef={videoElement}
						isLoading={isLoading}
						isPlaying={isPlaying}
					/>

					{/* progressbar */}
					<ProgressBar
						isLoading={isLoading}
						videoDuration={videoDuration}
						currentTime={currentTime}
						progressBarWidth={progressBarWidth}
						bufferedWidth={bufferedWidth}
						progressBarElement={progressBarElement}
						handleManualUpdate={handleManualUpdate}
					/>

					{/* clock time */}
					<ClockTime currentTime={currentTime} duration={videoDuration} />

					{/* volume */}
					<Volume videoElement={videoElement} />

					{/* options */}
					{currentVideo.id !== undefined && (
						<Options
							resolutions={episodeResolutions}
							videoElement={videoElement}
						/>
					)}

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

			<GlobalStyles />
		</>
	);
};

export default Player;
