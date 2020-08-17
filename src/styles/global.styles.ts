import { createGlobalStyle } from 'styled-components';

import { lighten } from 'polished';

export default createGlobalStyle`
	:root {
		--history-color: #48BB78;
		--wl-color: #48BB78;
		--fav-color: #EC2E2E;
		--secondary-bg-color: #1f1f1f;
		--blue-color: #228ef3;

		--recent-color: #bd3c2f;
		--season-color: #228ef3;
		--filter-color: #ff008c;

		--secondary-text-color: #929292;
		--ternary-text-color: #616161;

		--rounded: 8px;
	}

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

	ul {
		list-style: none;
	}

	/* scrollbar */
	::-webkit-scrollbar {
		width: 12px;

		@media only screen and (max-width: 767px) {
			width: 5px !important;
		}
	}

	::-webkit-scrollbar-thumb {
		background-color: #2d2d2d;

		&:hover {
			background-color: ${lighten(0.05, '#2d2d2d')};
		}
	}
`;
