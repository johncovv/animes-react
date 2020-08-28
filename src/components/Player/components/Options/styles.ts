import styled from 'styled-components';

export const Content = styled.div`
	position: relative;
	width: 30px;
	height: 30px;

	display: flex;
	justify-content: center;
	align-items: center;

	transition: background-color 0.1s ease-in-out;
	border-radius: var(--player-rounded);
	cursor: pointer;

	&:hover,
	&.active {
		background-color: var(--player-color);
	}

	svg {
		width: 80%;
		height: 80%;
	}
`;

export const Popup = styled.div`
	display: none;

	background: rgba(255, 255, 255, 0.8);
	position: absolute;
	bottom: calc(100% + 10px);
	left: 50%;
	transform: translateX(-50%);

	min-width: 125px;
	text-align: center;

	border-radius: 5px;

	padding: 5px;
	font-size: 14px;
	white-space: nowrap;
	font-weight: 500;
	color: #1f1f1f;

	flex-flow: column nowrap;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;

		transform: translateX(-50%);
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid #fff;
	}
`;

export const MainContainer = styled.div<{ length: number }>`
	border-radius: var(--player-rounded);

	&:not(:last-child) {
		margin-bottom: 3px;
	}

	&.active {
		background-color: rgba(0, 0, 0, 0.15);

		p {
			background-color: var(--player-color);
			border-radius: var(--player-rounded);
			margin-top: 3px;
			color: #fff;
		}

		p svg:nth-child(1) {
			display: block;
		}
		p svg:nth-child(2) {
			display: none;
		}
	}

	&.active > div {
		transition: max-height 0.3s, opacity 0.2s ease-in-out 0.3s;
		max-height: calc(
			27px * ${(props) => props.length} + (${(props) => props.length} * 3px)
		);
		opacity: 1;
	}

	p svg:nth-child(1) {
		display: none;
	}
	p svg:nth-child(2) {
		display: block;
	}
`;

export const Title = styled.p`
	font-size: 16px;
	padding: 3px 5px;
	color: #000;
	position: relative;
	width: 100%;

	svg {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
	}
`;

export const Container = styled.div`
	transition: max-height 0.3s, opacity 0s ease-in-out 0s;
	overflow: hidden;
	max-height: 0;
	opacity: 0;

	display: flex;
	flex-flow: column nowrap;
`;

export const Option = styled.button`
	all: unset;
	transition: all 0.1s ease-in-out;
	padding: 1px 7px;
	border-radius: 5px;
	cursor: pointer;
	color: #000;

	display: flex;
	justify-content: space-between;
	align-items: center;

	svg {
		width: 25px;
		height: 25px;

		path {
			fill: #828282;
		}
	}

	&.active svg path {
		fill: var(--player-color);
	}

	&:hover {
		background-color: var(--player-color);
		color: #fff;

		svg path {
			fill: #fff;
		}
	}

	&:not(:last-child) {
		margin-bottom: 3px;
	}
`;
