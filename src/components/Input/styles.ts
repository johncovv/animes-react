import styled from 'styled-components';

import { shade } from 'polished';

export const Content = styled.div`
	position: relative;

	.search__icon {
		z-index: 50;
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;

		transition: stroke 0.2s ease-in-out;

		&:hover path {
			stroke: #fff;
		}
	}

	.clean__icon {
		z-index: 50;
		position: absolute;
		right: calc(15px + 20px + 5px);
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;

		transition: stroke 0.2s ease-in-out;

		&:hover g path:nth-child(2) {
			fill: var(--fav-color);
		}
	}

	input {
		height: 38px;
		min-width: 270px;
		width: 100%;
		background: #1f1f1f;
		border: none;
		color: white;
		padding: 0 65px 0 15px;
		border-radius: 50px;
		font-size: 16px;

		transition: background-color 0.1s ease-in-out;
		&:hover {
			background-color: ${shade(0.1, '#1f1f1f')};
		}

		&:focus {
			box-shadow: 0 0 0 1px var(--primary-color);
		}
	}

	svg path,
	input::placeholder {
		color: #6f6f6f;
		stroke: #6f6f6f;
	}
`;
