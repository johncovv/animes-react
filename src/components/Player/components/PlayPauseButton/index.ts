import styled, { css } from 'styled-components';

import play from '../../assets/play.svg';
import pause from '../../assets/pause.svg';

const PlayPauseButton = styled.span<Player.GlobalAttr>`
	position: relative;
	width: 30px;
	height: 30px;
	display: block;

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
