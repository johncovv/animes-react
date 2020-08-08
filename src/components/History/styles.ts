import styled from 'styled-components';

export const HistoryContent = styled.div`
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

	.history__container {
		max-width: 1465px;
		padding: 25px;
		margin: 0 auto;
		height: calc(100vh - 70px);

		display: flex;
		justify-content: center;
		align-items: center;

		&--inner {
			background-color: var(--secondary-bg-color);
			border-radius: var(--rounded);
			width: 100%;
			height: 100%;

			overflow-y: auto;

			.history__item--container {
				margin: 25px 0;
				padding: 0 25px;
			}
		}
	}
`;
