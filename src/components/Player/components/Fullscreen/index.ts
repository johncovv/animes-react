import styled, { css } from 'styled-components';

import fullScreen from '../../assets/fullscreen.svg';
import fullScreenExit from '../../assets/fullscreen-exit.svg';

interface FullScreenAttr {
	fullscreen: boolean;
}

const FullScreen = styled.span<FullScreenAttr>`
	position: relative;
	display: block;
	width: 30px;
	height: 30px;

	&::after {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		${(props) => css`
			mask-image: url(${props.fullscreen ? fullScreenExit : fullScreen});
		`}

		background-color: #fff;
		mask-size: 100%;
		mask-position: center;
		mask-repeat: no-repeat;
	}
`;

export default FullScreen;
