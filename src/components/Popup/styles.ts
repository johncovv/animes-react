import styled from 'styled-components';

export const Content = styled.div`
	position: fixed;
	z-index: 1000;
	top: 70px;
	left: 0;
	right: 0%;
	min-height: 100%;
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(2px);
	transition: opacity 0.2s ease-in-out;

	&.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.popup__container {
		max-width: 1465px;
		padding: 25px;
		margin: 0 auto;
		height: calc(100vh - 70px);

		display: flex;
		justify-content: center;
		align-items: center;

		&--inner {
			background-image: linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.63) 0%,
				rgba(31, 31, 31, 0) 100%
			);
			background-color: var(--secondary-bg-color);
			border-radius: var(--rounded);
			width: 100%;
			height: 100%;

			overflow-y: auto;

			.popup__items--container {
				height: 100%;
				padding: 25px;
				display: flex;
				flex-flow: column nowrap;
			}
		}
	}
`;
