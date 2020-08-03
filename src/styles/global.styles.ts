import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: 0;
	}

	body {
		color: #fff;
		--webkit-font-smoothing: antialiased;
		max-width: 1465px;
		margin: 0 auto;
		background: #000;
	}

	body, input, button {
		font-family: 'Roboto', sans-serif;
		font-size: 20px;
	}

	h1, h1, h3, h4, h5, h6, strong {
		font-weight: 500;
	}

	button {
		cursor: pointer;
	}

	a {
		text-decoration: none;
	}
`;
