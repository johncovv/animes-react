import styled, { css } from 'styled-components';

export const PlayerContainer = styled.div<Player.GlobalAttr>`
	position: relative;
	overflow: hidden;

	user-select: none;

	display: flex;
	justify-content: center;
	align-items: center;

	& span {
		border-radius: 5px;
		transition: background 0.2s;

		&:hover {
			background: var(--season-color);
		}
	}

	video {
		width: 100%;
		height: 100%;
		max-width: 100%;
		display: block;
	}

	&.player--controls-show {
		.player__controls,
		.player__title {
			transform: translateY(0%);
		}
	}

	.player__play-circle {
		${({ isPlaying }) => css`
			opacity: ${isPlaying ? '0' : '1'};
			cursor: ${isPlaying ? 'auto' : 'pointer'};
		`}
	}
`;

export const PlayerOptions = styled.div`
	background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.75), transparent);
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;

	padding: 80px 5px 5px;
	height: 120px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	transform: translateY(100%);
	transition: transform 0.3s ease-in-out;

	& .player__option {
		&:not(.--no-pointer) {
			cursor: pointer;
		}

		&:not(:last-child) {
			margin-right: 15px;

			@media only screen and (max-width: 767px) {
				margin-right: 10px !important;
			}
		}
	}

	& .player__useless-area {
		all: unset;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 80px;
		color: transparent;
		opacity: 0;
		background: red;
	}
`;
