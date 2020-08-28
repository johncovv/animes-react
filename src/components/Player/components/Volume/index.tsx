import React, {
	RefObject,
	useState,
	useCallback,
	useRef,
	useEffect,
} from 'react';

import {
	VolumeContainer,
	VolumeBackground,
	VolumeInputRange,
	VolumeBar,
	VolumeCurrent,
	VolumeIcon,
	VolumeIconMobile,
} from './styles';

import { ReactComponent as VolumeOnSvg } from '../../assets/volume/volume-max.svg';
import { ReactComponent as VolumeOffSvg } from '../../assets/volume/volume-off.svg';

interface VolumeProps {
	videoElement: RefObject<HTMLVideoElement>;
}

interface StorageVolume {
	volume: number;
	isMuted: boolean;
}

const Volume: React.FunctionComponent<VolumeProps> = ({
	videoElement,
}: VolumeProps) => {
	const volumeElement = useRef<HTMLInputElement>(null);
	const [buttonVolumeMobile, setButtonVolumeMobile] = useState(false);

	const [isMuted, setIsMuted] = useState(() => {
		const storage = localStorage.getItem('@ReactVideoPlayer:volume');

		if (storage) {
			const parsed: StorageVolume = JSON.parse(storage);

			return parsed.isMuted;
		}

		return false;
	});

	const [volume, setVolume] = useState(() => {
		const storageVolume = localStorage.getItem('@ReactVideoPlayer:volume');

		if (storageVolume) {
			const parsed: StorageVolume = JSON.parse(storageVolume);

			return parsed.volume;
		}

		return 100;
	});

	useEffect(() => {
		const element = videoElement.current;

		if (element) {
			if (!isMuted) {
				element.volume = volume / 100;
			} else {
				element.volume = 0;
			}
		}
	}, [videoElement, volume, isMuted]);

	useEffect(() => {
		localStorage.setItem(
			'@ReactVideoPlayer:volume',
			JSON.stringify({ volume, isMuted }),
		);
	}, [volume, isMuted]);

	const handleVolumeChange = useCallback(() => {
		const element = volumeElement.current;
		const video = videoElement.current;

		if (element && video) {
			video.volume = parseInt(element.value, 10) / 100;
			setVolume(parseInt(element.value, 10));
		}
	}, [videoElement]);

	const handleVolumeButton = useCallback(() => {
		const video = videoElement.current;

		if (video)
			if (isMuted) {
				video.volume = volume / 100;
				setIsMuted(false);
			} else {
				video.volume = 0;
				setIsMuted(true);
			}
	}, [volume, videoElement, isMuted]);

	const handleVolumeMobile = useCallback(() => {
		setButtonVolumeMobile(!buttonVolumeMobile);
	}, [buttonVolumeMobile]);

	return (
		<VolumeContainer>
			{/* volume icon */}
			<VolumeIcon onClick={handleVolumeButton}>
				<VolumeOnSvg style={{ display: !isMuted ? 'block' : 'none' }} />
				<VolumeOffSvg style={{ display: isMuted ? 'block' : 'none' }} />
			</VolumeIcon>
			{/* volume icon mobile */}
			<VolumeIconMobile
				onClick={handleVolumeMobile}
				className={buttonVolumeMobile ? 'active' : ''}
			>
				<VolumeOnSvg style={{ display: volume !== 0 ? 'block' : 'none' }} />
				<VolumeOffSvg style={{ display: volume === 0 ? 'block' : 'none' }} />
			</VolumeIconMobile>

			{/* inpurt bar */}
			<VolumeBar className={buttonVolumeMobile ? '' : 'hidden'}>
				{/* input range */}
				<VolumeInputRange
					ref={volumeElement}
					value={isMuted ? 0 : volume}
					onChange={handleVolumeChange}
				/>

				{/* background */}
				<VolumeBackground className="player__input--background" />

				{/* current */}
				<VolumeCurrent
					volumeRange={isMuted ? 0 : volume}
					className="player__input--current"
				/>
			</VolumeBar>
		</VolumeContainer>
	);
};

export default Volume;
