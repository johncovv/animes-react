import styled from 'styled-components';

export const Content = styled.div`
	position: fixed;
	z-index: 700;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(2px);
	transition: opacity 0.2s ease-in-out;
	height: calc(100vh - 70px);

	@media only screen and (max-width: 767px) {
		height: calc(100vh - 50px) !important;
		top: 0 !important;
		bottom: auto !important;

		.popup__container {
			padding: 0 !important;

			.popup__items--container {
				padding: 20px !important;
			}
		}
	}

	.popup__container {
		height: 100%;
		max-width: 1465px;
		margin: 0 auto;
		padding: 25px;

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

			@media only screen and (min-width: 768px) {
				border-radius: var(--rounded);
			}

			width: 100%;
			height: 100%;

			overflow-y: auto;

			.popup__items--container {
				min-height: 100%;
				display: flex;
				flex-flow: column nowrap;
				padding: 25px;
			}
		}
	}

	&.hidden {
		opacity: 0;
		pointer-events: none;
	}
`;
