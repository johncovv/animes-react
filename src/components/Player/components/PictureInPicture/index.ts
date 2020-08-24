import styled, { css } from 'styled-components';

import pipOpen from '../../assets/pip-open.svg';
import pipExit from '../../assets/pip-exit.svg';

interface PipAttr {
	isOpen: boolean;
}

const PictureInPicture = styled.span<PipAttr>`
	position: relative;
	display: block;
	width: 30px;
	height: 30px;

	@media only screen and (max-width: 767px) {
		display: none !important;
	}

	${({ isOpen }) => css`
		background-color: ${isOpen ? 'var(--season-color)' : 'none'};
	`}

	&::after {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #fff;

		mask-image: url(${({ isOpen }) => (isOpen ? pipExit : pipOpen)});
		mask-size: 75%;
		mask-position: center;
		mask-repeat: no-repeat;
	}
`;

export default PictureInPicture;
