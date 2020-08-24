import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHeart, FiClock } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';

import thumbNotFound from '../../assets/img/thumb-not-found.png';

export const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	grid-gap: 25px;

	@media only screen and (max-width: 1240px) {
		grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
		grid-gap: 20px !important;
	}

	@media only screen and (max-width: 900px) and (orientation: landscape) {
		grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
	}

	@media only screen and (max-width: 767px) {
		grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
	}

	@media only screen and (max-width: 480px) {
		grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
	}
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
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-image: url(${thumbNotFound});

	&:hover {
		.grid__item {
			&--thumb {
				filter: brightness(0.5);
				transition: filter 0.3s;
			}

			&-hover {
				transform: translateY(0%);
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
		}
	}

	@media only screen and (max-width: 1024px) {
		.grid__item--title {
			font-size: 14px !important;
		}

		.grid__item-hover {
			font-size: 14px !important;
			.grid__item--views {
				font-size: 12px !important;
			}
		}
	}

	.grid__item-hover {
		transition: transform 0.3s ease-in-out;
		transform: translateY(calc(100% + 25px));
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--secondary-bg-color);
		z-index: 500;
		color: #fff;
		padding: calc(1rem + 25px) 1rem 1rem;
		font-size: 16px;
		border-top-left-radius: 50px;

		.grid__item--play-button {
			position: absolute;
			top: -1rem;
			right: 15px;

			svg {
				transition: fill 0.2s ease-in-out;
			}

			&:hover svg {
				fill: var(--primary-color);
			}
		}

		.grid__item--title-popup {
			text-align: center;
			margin-bottom: 10px;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3; /* number of lines to show */
			-webkit-box-orient: vertical;
		}

		.grid__item--views {
			font-size: 14px;
			display: flex;
			align-items: center;
			flex-flow: row nowrap;
			justify-content: center;

			svg {
				margin-right: 0.5rem;
			}
		}
	}
`;
