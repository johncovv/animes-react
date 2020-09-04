import styled from 'styled-components';

import loading from '../../../../assets/img/loading.gif';

export const Content = styled.div`
	background-color: #000;
	position: relative;
	border-radius: var(--rounded);
	overflow: hidden;

	.episodes__list--options {
		height: 45px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;

		svg {
			cursor: pointer;

			&:not(:last-child) {
				margin-right: 15px;
			}
		}

		&-favorite {
			&:hover {
				stroke: var(--fav-color);
			}

			&.checked {
				stroke: var(--fav-color);
				fill: var(--fav-color);
			}
		}

		&-watch-later {
			&:hover {
				stroke: var(--wl-color);
			}

			&.checked {
				fill: var(--wl-color);

				circle {
					stroke: var(--wl-color);
				}

				polyline {
					stroke: #000;
				}
			}
		}
	}

	.episodes__list--container {
		background-color: var(--secondary-bg-color);
		overflow-y: auto;
		overflow-x: hidden;
		position: absolute;
		top: 45px;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 15px;

		button {
			background: none;
			border: none;
			display: flex;
			flex-flow: row;
			align-items: center;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;

			&:not(:last-child) {
				margin-bottom: 15px;
			}

			.thumb {
				position: relative;
				width: 25%;
				margin-right: 15px;

				.uncheck-history {
					all: unset;
					position: absolute;
					z-index: 10;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;

					justify-content: center;
					align-items: center;

					display: none;
					transition: fill 0.2s ease-in-out;

					&.checked {
						display: flex;
					}

					svg {
						fill: #fff;

						&:hover {
							fill: var(--fav-color);
						}
					}
				}

				img {
					width: 100%;
					display: block;

					background-repeat: no-repeat;
					background-position: center;
					background-size: 15%;
					background-image: url(${loading});
					color: rgba(0, 0, 0, 0);
				}
			}

			&:hover {
				p,
				img {
					filter: brightness(0.5);
				}
			}

			&.checked {
				img {
					filter: brightness(0.1);
				}

				.titles-container {
					p {
						color: #000;
					}
				}
			}

			.titles-container {
				width: calc(75% - 15px);
				display: flex;
				flex-flow: column nowrap;
				text-align: left;
				overflow: hidden;

				.title {
					font-size: 15px;
					color: var(--secondary-text-color);
					margin-bottom: 5px;

					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.anime-title {
					font-size: 14px;
					color: var(--ternary-text-color);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-right: 30px;
				}
			}
		}
	}

	@media only screen and (max-width: 1023px) {
		width: 40% !important;
	}
	@media only screen and (max-width: 767px) {
		&--container {
			&::-webkit-scrollbar-track {
				background-image: linear-gradient(
					180deg,
					#000,
					var(--secondary-bg-color)
				);
			}

			& button {
				height: 70px !important;

				&:not(:last-child) {
					margin-bottom: 5px !important;
				}

				.thumb {
					width: 110px !important;
				}

				.titles-container {
					.title {
						font-size: 14px !important;
					}

					.anime-title {
						font-size: 13px !important;
					}
				}
			}
		}
	}
`;
