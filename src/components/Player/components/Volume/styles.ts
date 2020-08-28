import styled, { css } from 'styled-components';

import {
	InputRange,
	InputRangeBackground,
	InputRangeCurrent,
} from '../InputRange';

/*
	VOLUME ICON / MOBILE
*/

interface VolumeAttr {
	volumeStatus?: number;
	isActive?: boolean;
	volumeRange?: number;
	isMuted?: number;
}

const Button = css`
	@media only screen and (max-width: 767px) {
		display: none;
	}

	width: 30px;
	height: 30px;

	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 8px;

	svg {
		width: 80%;
		height: 80%;
	}
`;

export const VolumeIconMobile = styled.div`
	@media only screen and (min-width: 768px) {
		display: none;
	}

	&.active {
		background-color: var(--player-color);
	}

	${Button}
`;

export const VolumeIcon = styled.div`
	@media only screen and (max-width: 767px) {
		display: none;
	}

	margin-right: 10px;

	${Button}
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

export const VolumeInputRange = styled(InputRange).attrs({
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
