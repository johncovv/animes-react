import styled from 'styled-components';

export const Content = styled.div`
	min-height: 100%;
	display: flex;
	flex-flow: column nowrap;

	.saved__options {
		display: flex;
		flex-flow: row nowrap;
		margin-bottom: 3rem;

		@media only screen and (max-width: 480px) {
			justify-content: center;
		}

		.saved__download,
		.saved__upload {
			all: unset;
			color: #fff;
			padding: 0.5rem 0;
			cursor: pointer;

			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: center;

			width: fit-content;

			svg {
				margin-right: 15px;
			}

			transition: color 0.2s ease-in-out;

			&:hover {
				color: var(--primary-color);
			}
		}

		.saved__download {
			margin-right: 3rem;
		}

		.saved__upload {
			input {
				display: none;
			}
		}
	}

	& .favorites {
		margin-bottom: 3rem;

		&--title {
			margin-bottom: 15px;
			display: flex;
			align-items: center;

			svg {
				margin-right: 10px;
			}
		}
	}

	& .watch-later {
		&--title {
			margin-bottom: 15px;
			display: flex;
			align-items: center;

			svg {
				margin-right: 10px;
			}
		}
	}
`;
