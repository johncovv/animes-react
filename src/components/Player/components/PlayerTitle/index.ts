import styled from 'styled-components';

const PlayerTitle = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;

	height: 40px;

	padding: 10px;

	transform: translateY(-100%);
	transition: transform 0.2s ease-in-out;

	p {
		width: 100%;
		font-size: 16px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 120px;
		z-index: -1;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		background-image: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.6));
	}
`;

export default PlayerTitle;
