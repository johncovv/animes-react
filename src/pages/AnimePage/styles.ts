import styled from 'styled-components';

import posterBackground from '../../assets/img/poster-background.png';

export const Title = styled.p`
	font-size: 20px;
	margin-bottom: 10px;
`;

export const Content = styled.div``;

export const Description = styled.div`
	background: var(--secondary-bg-color);
	border-radius: var(--rounded);
	padding: 2rem;

	display: flex;
	flex-flow: row nowrap;

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

	#player {
		width: 70%;
		overflow: hidden;
		border-radius: var(--rounded);

		video {
			width: 100%;
			display: block;
		}
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
			justify-content: flex-end;
			align-items: center;

			svg {
				margin-right: 15px;
			}
		}

		&--container {
			background-image: linear-gradient(
				180deg,
				var(--secondary-bg-color) 80%,
				#131313
			);
			overflow-y: auto;
			overflow-x: hidden;
			position: absolute;
			top: 45px;
			bottom: 0;
			width: 100%;
			padding: 15px;

			button {
				background: none;
				border: none;
				display: flex;
				flex-flow: row;
				width: 100%;

				&:not(:last-child) {
					margin-bottom: 15px;
				}

				img {
					width: 25%;
					margin-right: 15px;
				}

				&:hover {
					filter: brightness(0.6);
				}

				.titles-container {
					width: calc(75% - 15px);
					display: flex;
					flex-flow: column nowrap;
					text-align: left;

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
						color: vaR(--ternary-text-color);
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
