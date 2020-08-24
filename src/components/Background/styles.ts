import styled from 'styled-components';

export const Content = styled.div`
	min-height: 100vh;

	background-position-y: 70px;
	background-position-x: center;
	background-size: 100%;
	background-repeat: no-repeat;

	padding: 95px 25px 25px;

	@media only screen and (max-width: 767px) {
		padding: 20px 20px 70px !important;
		background-size: auto;
		background-position-y: top;
	}
`;
