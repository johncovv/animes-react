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

			.history__items--container {
				margin: 25px 0;
				padding: 0 25px;
				display: flex;
				flex-flow: column nowrap;

				.history__title {
					margin-bottom: 15px;
				}

				.history__item {
					cursor: pointer;
					width: 100%;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					height: 37px;
					font-size: 18px;

					&:not(:last-child) {
						margin-bottom: 15px;
					}

					.history__item--link {
						padding-right: 15px;
						color: #fff;
						flex: 1;
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						justify-content: space-between;

						&:hover {
							color: var(--history-color);
						}
					}

					.history__item--delete-icon {
						fill: #fff;

						&:hover {
							transition: fill 0.2s ease-in-out;
							fill: var(--fav-color);
						}
					}
				}
			}
		}
	}
`;
