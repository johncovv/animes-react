import styled from 'styled-components';

export const Title = styled.p`
	margin-bottom: 15px;
`;

export const HistoryItem = styled.div`
	cursor: pointer;
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	height: 37px;
	font-size: 18px;

	@media only screen and (max-width: 480px) {
		font-size: 14px !important;

		.history__item--link {
			flex-flow: column nowrap !important;
			align-items: flex-start !important;
		}
	}

	&:not(:last-child) {
		margin-bottom: 15px;
	}

	.history__item--link {
		padding-right: 15px;
		max-width: calc(100% - 25px);
		color: #fff;
		flex-grow: 1;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

		& p:not(.history__item--current-time) {
			flex-grow: 1;
			margin-right: 15px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			@media only screen and (max-width: 480px) {
				max-width: 100%;
			}
		}

		&:hover {
			color: var(--history-color);
		}
	}

	.history__item--delete-icon {
		fill: #fff;

		&:hover {
			transition: fill 0.2s ease-in-out;
			fill: var(--fav-color);
		}
	}
`;
