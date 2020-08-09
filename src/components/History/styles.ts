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

	&:not(:last-child) {
		margin-bottom: 15px;
	}

	.history__item--link {
		padding-right: 15px;
		color: #fff;
		flex: 1;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;

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
