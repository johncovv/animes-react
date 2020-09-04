import React, { useCallback, RefObject } from 'react';

// assets
import { ReactComponent as PlaySvg } from '../../assets/play.svg';
import { ReactComponent as PauseSvg } from '../../assets/pause.svg';
import { ReactComponent as LoadingSvg } from '../../assets/loading.svg';

// styles
import { Content } from './styles';

interface PlayPauseLoadingProps {
	isLoading: boolean;
	isPlaying: boolean;
	videoRef: RefObject<HTMLVideoElement>;
}

const PlayPauseLoading: React.FunctionComponent<PlayPauseLoadingProps> = ({
	isLoading,
	isPlaying,
	videoRef,
}: PlayPauseLoadingProps) => {
	const handlePlayVideo = useCallback(() => {
		const video = videoRef.current;

		if (video) {
			if (video.paused) {
				video.play();
			} else {
				video.pause();
			}
		}
	}, [videoRef]);

	return (
		<Content
			className={isLoading ? `loading` : undefined}
			onClick={handlePlayVideo}
		>
			<PlaySvg
				style={{ display: !isLoading && !isPlaying ? 'block' : 'none' }}
			/>
			<PauseSvg
				style={{ display: !isLoading && isPlaying ? 'block' : 'none' }}
			/>
			<LoadingSvg style={{ display: isLoading ? 'block' : 'none' }} />
		</Content>
	);
};

export default PlayPauseLoading;
