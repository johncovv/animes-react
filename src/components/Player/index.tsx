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
} from './components/ProgressBar';
import TimePopup from './components/TimePopup';
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

interface ActiveEpisode {
	id: number | undefined;
	title: string | undefined;
}

interface PlayerProps {
	poster: string;
	episode: ActiveEpisode;
	autoplay: boolean;
	sources: ApiRequest.EpiOption[];
}

const Player: React.FunctionComponent<PlayerProps> = ({
	poster,
	episode,
	autoplay = false,
	sources,
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
	const [currentTime, setCurrentTime] = useState(0);
	const [videoDuration, setVideoDuration] = useState(0);
	const [currentVideo, setCurrentVideo] = useState<ApiRequest.EpiOption>(
		{} as ApiRequest.EpiOption,
	);
	const [resoPopupOpen, setResoPopupOpen] = useState(false);
	const [timePopup, setTimePopup] = useState('00:00:00');
	const [timePopupLocation, setTimePopupLocation] = useState(0);
	const [volume, setVolume] = useState(100);
	const [pipStatus, setPipStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [volumeIcon, setVolumeIcon] = useState('max');
	const [volumeMobile, setVolumeMobile] = useState(false);
	const [showControls, setShowControls] = useState(false);

	useEffect(() => {
		if (sources && sources?.length > 0) {
			setCurrentVideo(sources[0]);
		}
	}, [sources]);

	useEffect(() => {
		if (volume === 0) {
			setVolumeIcon('off');
		} else if (volume >= 1 && volume <= 15) {
			setVolumeIcon('min');
		} else if (volume >= 16 && volume <= 50) {
			setVolumeIcon('medium');
		} else {
			setVolumeIcon('max');
		}
	}, [volume]);

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

	const handleTimeUpdate = useCallback(() => {
		const video = videoElement.current;
		const progress = progressBarElement.current;

		if (video && progress) {
			setVideoDuration(video?.duration);
			setCurrentTime(video?.currentTime);
		}

		handleProgressBarUpdate();
	}, [handleProgressBarUpdate]);

	const handleResolutiontitle = useCallback((title: string): string => {
		return title.split('-')[1];
	}, []);

	const handleChangeResolution = useCallback(
		async ({ id, title, url }: ApiRequest.EpiOption) => {
			const video = videoElement.current;

			if (video) {
				const time = video.currentTime;

				await setCurrentVideo({ id, title, url });

				video.currentTime = time;
			}
		},
		[],
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

	const handleProgressBarHover = useCallback(
		(e) => {
			e.persist();

			const position = e.nativeEvent.offsetX;

			setTimePopupLocation(position);

			const element = progressBarElement.current;

			if (element) {
				const seconds = (position / element.clientWidth) * videoDuration;
				const formated = new Date(seconds * 1000).toISOString().substr(11, 8);

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
		}
	}, []);

	const handleVolumeButton = useCallback(() => {
		const video = videoElement.current;

		if (video)
			if (volume === 0) {
				video.volume = 0.5;
				setVolume(50);
			} else {
				video.volume = 0;
				setVolume(0);
			}
	}, [volume]);

	const handlePictureInPicture = useCallback(() => {
		const video = videoElement.current;

		if (video && video.readyState >= 2) {
			if (document.pictureInPictureElement) {
				setPipStatus(false);
				document.exitPictureInPicture();
			} else {
				setPipStatus(true);
				video.requestPictureInPicture();
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
			{episode.title && (
				<PlayerTitle
					className="player__title"
					onClick={() => handlePlayPause(true)}
				>
					{episode.title}
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
				poster={
					episode.id ? `http://thumb.zetai.info/${episode.id}.jpg` : poster
				}
				onLoadStart={() => setIsLoading(true)}
				onWaiting={() => setIsLoading(true)}
				onCanPlay={() => setIsLoading(false)}
			/>

			{/* circle play center */}
			<PlayCircle
				style={{
					display: isPlaying ? 'block' : 'none',
				}}
				className="player__play-circle"
				onClick={handlePlayPause}
			/>

			{/* player controls */}
			<PlayerOptions className="player__controls">
				<button
					type="button"
					className="player__useless-area"
					onClick={() => handlePlayPause(true)}
				>
					hehe boy
				</button>

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
						onMouseMove={handleProgressBarHover}
						data-width={`${progressBarWidth}%`}
					/>
					<ProgressBarBackground className="player__range--background" />
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

				{/* volume */}
				<>
					<VolumeContainer className="player__option">
						<VolumeIconMobile
							className={`player__volume--icon player__volume--${volumeIcon}`}
							volumeStatus={volume}
							onClick={handleVolumeMobile}
							isActive={volumeMobile}
						/>
						<VolumeIcon
							className={`player__volume--icon player__volume--${volumeIcon}`}
							volumeStatus={volume}
							onClick={handleVolumeButton}
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
					{sources && sources.length > 0 && (
						<div onMouseLeave={handleCloseResoPopup}>
							{sources.map(({ id, title, url }) => (
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
					isOpen={pipStatus}
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
