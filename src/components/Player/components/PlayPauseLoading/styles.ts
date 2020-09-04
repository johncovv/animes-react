import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

export const Content = styled.div`
	width: 30px;
	height: 30px;

	border-radius: 8px;

	display: flex;
	justify-content: center;
	align-items: center;

	&:not(.loading):hover {
		background-color: var(--player-color);
	}

	svg {
		width: 100%;
		height: 100%;
	}

	&.loading {
		svg {
			width: 20px;
			height: 20px;
			animation: ${loadingAnimation} 1.2s ease infinite;
			pointer-events: none;
		}
	}
`;
