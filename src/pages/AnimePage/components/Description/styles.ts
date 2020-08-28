import styled from 'styled-components';

import posterBackground from '../../../../assets/img/poster-background.png';
import loading from '../../../../assets/img/loading.gif';

export const Content = styled.div`
	background: var(--secondary-bg-color);
	border-radius: var(--rounded);
	padding: 2rem;

	display: flex;
	flex-flow: row nowrap;

	@media only screen and (max-width: 767px) {
		padding: 1.3rem !important;
	}

	@media only screen and (max-width: 639px) {
		flex-flow: column nowrap;
	}
`;
Content.displayName = 'DescriptionContainer';

export const Thumbnail = styled.div`
	margin-right: 2rem;
	position: relative;

	.background > .container {
		position: relative;
		display: flex;
		justify-content: center;

		img {
			&.thumbnail {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: block;

				background-image: url(${loading});
				background-repeat: no-repeat;
				background-position: center;
				background-size: 15%;
			}
		}
	}

	@media only screen and (max-width: 639px) {
		margin: 0 0 2rem 0;

		.background {
			background-image: url(${posterBackground});
			background-size: 100%;
			background-repeat: no-repeat;
			display: flex;
			justify-content: center;
			padding: 2rem 0 0 0;

			border-top-left-radius: var(--rounded);
			border-top-right-radius: var(--rounded);

			.container {
				max-width: 60%;

				& > .proportion {
					width: 100%;
				}
			}
		}

		img.thumbnail {
			box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.5);
		}
	}

	img {
		border-radius: var(--rounded);
	}
`;
Thumbnail.displayName = 'Thumbnail';

export const Details = styled.div`
	.title {
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
`;
Details.displayName = 'Details';
