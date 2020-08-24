import styled from 'styled-components';

import { shade } from 'polished';

export const FiltersContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;

	@media (min-width: 780px) {
		margin-top: 200px;
		flex-flow: row nowrap;
		justify-content: space-between;

		.explain,
		.form {
			width: calc(50% - 1rem) !important;
		}

		.explain {
			margin: 0 !important;
		}

		.form .form-group--row {
			&.cols-2 {
				display: grid;
				grid-template-columns: repeat(2, calc(50% - 0.5rem));
				gap: 1rem;
			}
		}
	}

	.explain,
	.form {
		width: 100%;
	}

	.form {
		display: flex;
		align-items: flex-end;
		border-radius: 8px;
		padding: 10px;

		@media (min-width: 480px) {
			padding: 25px;
		}

		.active__filter {
			font-size: 16px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;

			p span {
				color: var(--filter-color);
			}

			a {
				color: #fff;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		background-image: linear-gradient(
			to bottom,
			transparent,
			rgba(0, 0, 0, 0.64)
		);

		.form-group {
			width: 100%;

			&--row {
				& > button {
					all: unset;
					width: 100%;
					height: 38px;
					border-radius: 50px;
					background-color: var(--filter-color);
					transition: background-color 0.1s ease-in-out;

					&:hover {
						background-color: ${shade(0.2, '#ff008c')};
					}

					display: flex;
					justify-content: center;
					align-items: center;

					font-size: 16px;
					cursor: pointer;

					svg {
						margin-right: 6px;

						path {
							stroke: #fff;
						}
					}
				}

				& > div,
				& > button {
					margin-top: 1rem;
				}
			}
		}
	}

	.explain {
		margin-bottom: 20px;

		.title {
			margin-bottom: 15px;
			font-weight: 800;
			font-size: 50px;
		}

		p {
			color: #a1a1a1;

			&:not(:last-child) {
				margin-bottom: 20px;
			}
		}
	}
`;

export const ResultContainer = styled.div`
	margin-top: 50px;

	.results-title {
		margin-bottom: 25px;
	}

	.pagination {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;

		font-size: 14px;

		&-top {
			margin-bottom: 25px;
		}

		&-bottom {
			margin-top: 25px;
		}

		li {
			background-color: #1f1f1f;
			color: #6f6f6f;
			border-radius: 8px;
			cursor: pointer;

			a {
				height: 38px;
				padding: 0 12px;
				display: flex;
				align-items: center;

				svg {
					polyline {
						stroke: #6f6f6f;
					}
				}
			}

			transition: background-color 0.1s ease-in-out, filter 0.1s ease-in-out;

			&:not(.disabled):not(.selected):hover {
				background-color: ${shade(0.3, '#1f1f1f')};
			}

			&.selected {
				color: #fff;
				background-color: var(--primary-color);

				&:hover {
					filter: brightness(0.8);
				}
			}

			&.disabled {
				display: none;
			}

			&.break {
				background-color: ${shade(0.3, '#1f1f1f')};
				pointer-events: none;
			}

			&:not(:last-child) {
				margin-right: 0.5rem;
			}
		}
	}
`;
