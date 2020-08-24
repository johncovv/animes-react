import styled from 'styled-components';

interface TimePopupAttr {
	hoverTime: number;
}

const TimePopup = styled.div.attrs<TimePopupAttr>((props) => ({
	style: {
		left: `${props.hoverTime}px`,
	},
}))<TimePopupAttr>`
	@media only screen and (max-width: 425px) {
		display: none !important;
	}

	position: absolute;
	background: rgba(255, 255, 255, 0.7);
	bottom: 100%;
	color: #000;
	font-size: 14px;
	font-weight: 700;
	padding: 3px 7px;
	border-radius: 5px;

	display: none;

	transform: translateX(-50%);
	filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;

		transform: translateX(-50%);
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid rgba(255, 255, 255, 0.7);
	}
`;

export default TimePopup;
