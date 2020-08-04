import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

import { FiHeart, FiClock } from 'react-icons/fi';

import { IconBaseProps } from 'react-icons';

export const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	grid-gap: 2rem;
`;

interface IconProps extends IconBaseProps {
	$isChecked?: boolean;
}

export const Favorite = styled(FiHeart)<IconProps>`
	cursor: pointer;
	stroke: #fff;

	&:hover {
		stroke: var(--fav-color);
	}

	${(props) =>
		props.$isChecked &&
		css`
			path {
				stroke: var(--fav-color);
				fill: var(--fav-color);
			}
		`}
`;

export const WatchLater = styled(FiClock)<IconProps>`
	cursor: pointer;
	stroke: #fff;

	margin-right: 0.5rem;
	&:hover {
		stroke: var(--wl-color);
	}

	${(props) =>
		props.$isChecked &&
		css`
			circle {
				fill: var(--wl-color);
				stroke: var(--wl-color);
			}

			polyline {
				stroke: #000;
			}
		`}
`;

export const Item = styled.div`
	position: relative;

	&:hover {
		.grid__item {
			&--thumb {
				filter: brightness(0.5);
				transition: filter 0.3s;
			}

			&--play-button,
			&--views {
				display: flex;
			}

			&--title {
				display: none;

				&-popup {
					display: block;
				}
			}
		}
	}

	.grid__options {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 500;
		padding: 0.5rem 0.5rem 0 0;
	}
`;

export const ItemLink = styled(Link)`
	position: relative;
	display: block;
	border-radius: 8px;
	overflow: hidden;

	.grid__scale--thumb {
		width: 100%;
	}

	&::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;

		background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7));
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 200;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(
			10deg,
			transparent 60%,
			rgba(0, 0, 0, 0.8) 100%
		);
	}

	.grid__item--thumb {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 50;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.grid__item--play-button {
		position: absolute;
		top: 0;
		left: 0%;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		z-index: 350;
		display: none;

		svg {
			stroke: #fff;
		}
	}

	.grid__item--title {
		position: absolute;
		bottom: 0;
		z-index: 150;
		padding: 0.5rem;
		font-size: 16px;
		color: #fff;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		&-popup {
			display: none;
			position: absolute;
			z-index: 300;
			bottom: 0;
			left: 0;
			width: 100%;
			font-size: 16px;
			padding: 0 1rem 3.5rem;
			text-align: center;

			color: #fff;
		}
	}

	.grid__item--views {
		display: none;
		position: absolute;
		bottom: 0%;
		left: 0;
		width: 100%;
		flex-flow: row nowrap;
		justify-content: center;
		z-index: 300;
		font-size: 1rem;
		color: #fff;

		padding-bottom: 1.5rem;

		svg {
			margin-right: 0.5rem;
		}
	}
`;
