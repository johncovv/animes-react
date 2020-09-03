import React from 'react';

// assets
import { ReactComponent as PlaySvg } from '../../assets/play.svg';
import { ReactComponent as PauseSvg } from '../../assets/pause.svg';
import { ReactComponent as LoadingSvg } from '../../assets/loading.svg';

// styles
import { Content } from './styles';

interface PlayPauseLoadingProps {
	isLoading: boolean;
	isPlaying: boolean;
}

const PlayPauseLoading: React.FunctionComponent<PlayPauseLoadingProps> = ({
	isLoading,
	isPlaying,
}: PlayPauseLoadingProps) => {
	return (
		<Content className={isLoading ? `loading` : undefined}>
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
