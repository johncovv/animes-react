import styled from 'styled-components';

import { AiFillPlayCircle } from 'react-icons/ai';

const PlayCircle = styled(AiFillPlayCircle)`
	position: absolute;
	width: 50px;
	height: 50px;
	z-index: 100;
	transition: opacity 0.1s ease-in-out;
	cursor: pointer;

	&.hidde {
		opacity: 0;
		pointer-events: none;
	}

	filter: drop-shadow(3px 5px 5px rgba(0, 0, 0, 0.4));
`;

export default PlayCircle;
