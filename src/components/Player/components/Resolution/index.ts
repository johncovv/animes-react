import styled, { css } from 'styled-components';

import { shade } from 'polished';

import resolution from '../../assets/resolution.svg';

interface ResolutionAttr {
	isOpen: boolean;
	currentResolution: ApiRequest.EpiOption;
}

const Resolution = styled.span<ResolutionAttr>`
	position: relative;
	display: block;
	width: 30px;
	height: 30px;

	&::after {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #fff;

		mask-image: url(${resolution});
		mask-size: 80%;
		mask-position: center;
		mask-repeat: no-repeat;
	}

	div {
		position: absolute;
		z-index: 50;
		bottom: calc(100% + 10px);
		background: rgba(255, 255, 255, 0.8);
		color: black;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 5px;

		padding: 5px;
		font-size: 14px;
		white-space: nowrap;
		font-weight: 500;
		color: var(--secondary-bg-color);

		flex-flow: column nowrap;

		${(props) => css`
			display: ${props.isOpen ? 'flex' : 'none'};
		`}

		button {
			all: unset;
			transition: all 0.1s ease-in-out;
			padding: 5px 7px;
			border-radius: 5px;
			cursor: pointer;
			text-align: center;

			&[data-id="${(props) => props.currentResolution.id}"] {
				background-color: #ababab;
				color: #fff;

				&:hover {
					background-color: ${shade(0.2, '#ababab')};
				}
			}

			&:hover {
				background-color: var(--season-color);
				color: #fff;
			}

			&:not(:last-child) {
				margin-bottom: 3px;
			}
		}

		&::after {
			content: '';
			position: absolute;
			top: 100%;
			left: 50%;

			transform: translateX(-50%);
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-top: 5px solid #fff;
		}
	}
`;

export default Resolution;
