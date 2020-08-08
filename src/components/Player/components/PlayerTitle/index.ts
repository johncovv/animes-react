import styled from 'styled-components';

const PlayerTitle = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;

	height: 120px;

	padding: 10px 10px 80px 10px;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	transform: translateY(-100%);
	transition: transform 0.2s ease-in-out;

	background-image: linear-gradient(0deg, transparent, rgba(0, 0, 0, 0.5));
`;

export default PlayerTitle;
