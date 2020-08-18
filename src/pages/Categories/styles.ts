import styled from 'styled-components';

import { shade } from 'polished';

export const FiltersContainer = styled.div`
	display: flex;
	flex-flow: row nowrap;

	.explain,
	.form {
		width: 50%;
	}

	.explain {
		padding-right: 0.75rem;
		.title {
			font-weight: 800;
			font-size: 50px;
		}

		p {
			color: #a1a1a1;
		}
	}

	.form {
		padding-left: 0.75rem;
		.form-group {
			&--row {
				display: grid;
				grid-template-columns: repeat(2, 50%);
				gap: 1rem;
			}
		}
	}
`;

export const SelectField = styled.div`
	position: relative;
	background-color: var(--secondary-bg-color);
	height: 38px;
	padding: 0px 45px 0px 15px;
	display: flex;
	align-items: center;
	border-radius: 50px;
	cursor: pointer;
	user-select: none;
	/* overflow-x: hidden; */

	p {
		width: 100%;
		overflow-x: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 14px;
		color: #6f6f6f;

		span {
			position: relative;

			&.selected-option {
				&:last-of-type {
					&::after {
						content: '.';
						position: absolute;
						bottom: 0;
						right: -4px;
					}
				}

				&:not(:last-of-type) {
					margin-right: 5px;

					&::after {
						content: ',';
						position: absolute;
						bottom: 0;
						right: -3px;
					}
				}
			}
		}
	}

	.default-option {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.arrow {
		position: absolute;
		right: 15px;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;

		svg {
			fill: #6f6f6f;
			transition: transform 0.2s ease-in-out;
		}
	}

	&.hidde {
		.container-options {
			display: none !important;

			&::after,
			&::before {
				display: none !important;
			}
		}

		.arrow svg {
			transform: scaleY(-1);
		}
	}

	.container-options {
		position: absolute;
		top: calc(100% + 1px);
		left: 0;
		right: 0;
		height: calc(38px * 5);

		.options {
			position: absolute;
			background-color: var(--secondary-bg-color);
			flex-flow: column nowrap;
			top: 0;
			bottom: 0;
			width: 100%;
			overflow-y: auto;
			display: flex;

			z-index: 10;
			box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);

			border-bottom-left-radius: calc(38px / 2);
			border-bottom-right-radius: calc(38px / 2);
		}

		&::before {
			z-index: 5;
			content: '';
			position: absolute;
			bottom: 100%;
			height: 38px;
			width: 15px;
			border-bottom-left-radius: 25px;
			box-shadow: 0 15px 0 0 var(--secondary-bg-color);
		}

		&::after {
			z-index: 5;
			content: '';
			position: absolute;
			bottom: 100%;
			right: 0%;
			height: 38px;
			width: 15px;
			border-bottom-right-radius: 25px;
			box-shadow: 0 15px 0 0 var(--secondary-bg-color);
		}
	}
`;

export const OptionField = styled.button.attrs({
	type: 'button',
})`
	all: unset;
	position: relative;
	background-color: var(--secondary-bg-color);
	min-height: 38px;
	max-height: 38px;
	padding: 0 15px;
	font-size: 14px;
	color: #6f6f6f;
	border-right: solid 1px rgba(0, 0, 0, 0.2);

	svg {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 7.5px;

		path {
			stroke: #fff;
		}

		&:hover {
			path {
				stroke: var(--fav-color);
			}
		}
	}

	&.selected {
		background-color: ${shade(0.5, '#1f1f1f')} !important;
	}

	&:not(.selected):hover {
		background-color: ${shade(0.2, '#1f1f1f')} !important;
	}

	&:nth-child(even) {
		background-color: ${shade(0.1, '#1f1f1f')};
	}
`;
