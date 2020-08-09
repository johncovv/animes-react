import styled from 'styled-components';

export const Content = styled.div`
	height: 100%;
	display: flex;
	flex-flow: row wrap;

	justify-content: space-around;

	& .favorites {
		p {
			margin-bottom: 15px;
		}
	}

	& .watch-later {
		margin-top: 25px;

		p {
			margin-bottom: 15px;
		}
	}
`;
