import { createGlobalStyle } from 'styled-components';

interface RecentsAttr {
	backgroundImage: string;
	varRoot: string;
}

export default createGlobalStyle<RecentsAttr>`
	:root {
		--primary-color: var(--${(props) => props.varRoot}-color);
	}

	.primary__background {
		background-image: url(${(props) => props.backgroundImage});
	}

	::-webkit-scrollbar-thumb {
		background-color: var(--${(props) => props.varRoot}-color);
	}
`;
