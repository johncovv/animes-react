import styled from 'styled-components';

export const Content = styled.div``;

export const PlayerContainer = styled.div`
	position: relative;
	display: flex;
	flex-flow: row nowrap;
	margin-bottom: 25px;

	@media only screen and (max-width: 1023px) {
		#player {
			width: 60% !important;
		}

		.episodes__list {
			width: 40% !important;
		}
	}

	@media only screen and (max-width: 767px) {
		flex-flow: column nowrap;

		#player {
			width: 100% !important;
		}

		.episodes__list {
			width: 100% !important;
			margin-left: 0 !important;
			margin-top: 25px;

			height: 400px !important;
		}
	}

	#player {
		width: 70%;
		border-radius: var(--rounded);
	}

	.episodes__list {
		max-height: 100%;
		width: 30%;
		height: auto;
		margin-left: 25px;
	}
`;
