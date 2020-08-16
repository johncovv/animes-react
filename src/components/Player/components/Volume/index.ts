import styled from 'styled-components';

import {
	InputRange,
	InputRangeBackground,
	InputRangeCurrent,
} from '../InputRange';

import Button from '../ButtonOption';

import volumeMax from '../../assets/volume/volume-max.svg';
import volumeOff from '../../assets/volume/volume-off.svg';

/*
	VOLUME ICON / MOBILE
*/

interface VolumeAttr {
	volumeStatus?: number;
	isActive?: boolean;
	volumeRange?: number;
	isMuted?: number;
}

const Icon = styled(Button).attrs<VolumeAttr>(({ isMuted }) => ({
	style: {
		backgroundImage: `url(${isMuted === 0 ? volumeOff : volumeMax})`,
	},
}))<VolumeAttr>``;

export const VolumeIconMobile = styled(Icon)<VolumeAttr>`
	border-radius: 5px;

	background-color: ${(props) =>
		props.isActive ? 'var(--season-color)' : 'transparent'};

	@media only screen and (min-width: 768px) {
		display: none;
	}
`;

/*
	VOLUME BAR
*/

export const VolumeContainer = styled.div`
	display: flex;
	width: 140px;
	align-items: center;

	@media only screen and (max-width: 820px) and (orientation: landscape) {
		width: 100px !important;
	}

	position: relative;

	@media only screen and (max-width: 767px) {
		width: 30px !important;
	}
`;

export const VolumeIcon = styled(Icon)<VolumeAttr>`
	margin-right: 10px;
	@media only screen and (max-width: 768px) {
		display: none;
	}
`;

export const VolumeBar = styled.div<VolumeAttr>`
	flex-grow: 1;
	max-width: 100px;
	display: flex;
	align-items: center;
	height: 100%;
	position: relative;

	@media only screen and (max-width: 767px) {
		transform: rotate(-90deg);
		position: absolute;
		bottom: calc(100% + 17px);
		left: 0;
		margin-left: -10px;

		height: 30px;
		width: 50px;

		&.hidden {
			display: none !important;
		}
	}
`;

export const Volume = styled(InputRange).attrs({
	type: `range`,
	min: 0,
	max: 100,
})``;

export const VolumeBackground = styled(InputRangeBackground)`
	@media only screen and (max-width: 767px) {
		box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
	}
`;

export const VolumeCurrent = styled(InputRangeCurrent).attrs<VolumeAttr>(
	(props) => ({
		style: {
			width: `${props.volumeRange}%`,
		},
	}),
)<VolumeAttr>``;
