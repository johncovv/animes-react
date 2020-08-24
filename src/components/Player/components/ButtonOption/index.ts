import styled from 'styled-components';

interface ButtonAttr {
	className: string;
}

const Button = styled.div.attrs<ButtonAttr>({
	className: 'player__button',
})`
	position: relative;
	width: 30px;
	height: 30px;

	background-size: 80%;
	background-position: center;
	background-repeat: no-repeat;

	&:hover:not(.--no-pointer) {
		background-color: var(--season-color);
		border-radius: 5px;
		transition: background-color 0.2s ease-in-out;
	}
`;

export default Button;
