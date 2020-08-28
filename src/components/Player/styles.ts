import styled, { createGlobalStyle } from 'styled-components';

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

		&:hover:not(.--no-hover) {
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
			&::after {
				opacity: 1;
			}
		}
	}

	@media (max-width: 479px) {
		.player__title p,
		.player__option {
			font-size: 14px !important;
		}
	}
`;

export const PlayerOptions = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;

	padding: 5px;
	height: 40px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	transform: translateY(100%);
	transition: transform 0.3s ease-in-out;

	& > div {
		margin-right: 15px;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 120px;
		z-index: -1;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		background-image: linear-gradient(
			to bottom,
			transparent,
			rgba(0, 0, 0, 0.6)
		);
	}
`;

export default createGlobalStyle`
	:root {
		--player-color: #228ef3;
		--player-rounded: 5px;
	}
`;
