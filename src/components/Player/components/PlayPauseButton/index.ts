import styled, { css, keyframes } from 'styled-components';

import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';
import loading from '../../assets/loading.svg';

const loadingAnimation = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const PlayPauseButton = styled.span<Player.GlobalAttr>`
	position: relative;
	width: 30px;
	height: 30px;
	display: block;

	&.loading {
		&:hover {
			background-color: none !important;
		}

		&::after {
			mask-image: url(${loading}) !important;
			margin: auto;
			width: 20px;
			height: 20px;

			animation: ${loadingAnimation} 1.2s ease infinite;
			pointer-events: none;
		}
	}

	&::after {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		${({ isPlaying }) => css`
			mask-image: url(${isPlaying ? pause : play});
		`}

		background-color: #fff;
		mask-size: 100%;
		mask-position: center;
		mask-repeat: no-repeat;
	}
`;

export default PlayPauseButton;
