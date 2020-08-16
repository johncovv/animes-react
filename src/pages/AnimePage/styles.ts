import styled from 'styled-components';

import posterBackground from '../../assets/img/poster-background.png';

export const Content = styled.div``;

export const Description = styled.div`
	background: var(--secondary-bg-color);
	border-radius: var(--rounded);
	padding: 2rem;

	display: flex;
	flex-flow: row nowrap;

	@media only screen and (max-width: 767px) {
		padding: 1.3rem !important;
	}

	@media only screen and (max-width: 639px) {
		flex-flow: column nowrap;
	}

	.description__poster {
		margin-right: 2rem;
		position: relative;

		@media only screen and (max-width: 639px) {
			margin: 0 0 2rem 0;

			&--background {
				background-image: url(${posterBackground});
				background-size: 100%;
				background-repeat: no-repeat;
				display: flex;
				justify-content: center;
				padding: 2rem 0 0 0;

				border-top-left-radius: var(--rounded);
				border-top-right-radius: var(--rounded);

				img {
					max-width: 60%;
				}
			}

			img {
				box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.5);
			}
		}

		img {
			border-radius: var(--rounded);
		}
	}

	.descriptions__details {
		.description__title {
			font-size: 1.3rem;

			@media only screen and (max-width: 639px) {
				font-size: 1rem;
			}
		}

		font-size: 1.15rem;

		@media only screen and (max-width: 639px) {
			font-size: 0.88rem;
		}

		p {
			margin-bottom: 0.6rem;

			@media only screen and (max-width: 639px) {
				margin-bottom: 0.6rem;
			}
		}

		div p {
			margin-bottom: 0.3rem;

			@media only screen and (max-width: 639px) {
				margin-bottom: 0;
			}
		}

		span {
			color: var(--secondary-text-color);
		}
	}
`;

export const PlayerContainer = styled.div`
	position: relative;
	display: flex;
	flex-flow: row nowrap;
	margin-bottom: 25px;

	@media only screen and (max-width: 1023px) {
		#player {
			width: 60% !important;
		}

		.episodes__list {
			width: 40% !important;
		}
	}

	@media only screen and (max-width: 767px) {
		flex-flow: column nowrap;

		#player {
			width: 100% !important;
		}

		.episodes__list {
			width: 100% !important;
			margin-left: 0 !important;
			margin-top: 25px;

			height: 400px !important;

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
	}

	#player {
		width: 70%;
		border-radius: var(--rounded);
	}

	.episodes__list {
		background-color: #000;
		position: relative;
		max-height: 100%;
		width: 30%;
		height: auto;
		margin-left: 25px;
		border-radius: var(--rounded);
		overflow: hidden;

		&--options {
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

		&--container {
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
	}
`;
