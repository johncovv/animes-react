import styled, { keyframes } from 'styled-components';

import { ReactComponent as LogoSvg } from '../../assets/logo/logo.svg';

import { ReactComponent as IconSvg } from '../../assets/logo/react-icon.svg';

const IconRotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

export const Content = styled.div`
	position: fixed;
	z-index: 10000;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #000;
`;

export const Container = styled.div`
	width: 70%;
	max-width: 350px;
	height: auto;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Logo = styled(LogoSvg)`
	width: 70%;
	#animes-react-logo-icon {
		display: none;
	}
`;

export const ReactIcon = styled(IconSvg)`
	width: 17%;
	margin-left: 0.5em;
	animation-name: ${IconRotate};
	animation-duration: 4s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
`;
