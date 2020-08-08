import styled, { keyframes } from 'styled-components';

import {
	InputRange,
	InputRangeBackground,
	InputRangeCurrent,
} from '../InputRange';

interface ProgressBarAttr {
	progressValue: number;
}

export const ProgressBarContainer = styled.div`
	flex-grow: 1;
	display: flex;
	align-items: center;
	height: 100%;
	position: relative;
`;

export const ProgressBar = styled(InputRange).attrs({
	type: `range`,
	min: 0,
})``;

export const ProgressBarCurrent = styled(InputRangeCurrent).attrs<
	ProgressBarAttr
>((props) => ({
	style: {
		width: `${props.progressValue}%`,
	},
}))<ProgressBarAttr>``;

export const ProgressBarBackground = styled(InputRangeBackground)``;

interface ProgressBarLoadingAttr {
	isLoading: boolean;
}

const loadingMode = keyframes`
	0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
`;

export const ProgressBarLoading = styled.div.attrs<ProgressBarLoadingAttr>(
	(props) => ({
		style: {
			opacity: props.isLoading ? 1 : 0,
		},
	}),
)<ProgressBarLoadingAttr>`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
	width: 100%;

	z-index: 2;
	height: 5px;

	border-radius: 50px;

	background-image: linear-gradient(
		-45deg,
		rgba(0, 0, 0, 0.3) 25%,
		transparent 25%,
		transparent 50%,
		rgba(0, 0, 0, 0.3) 50%,
		rgba(0, 0, 0, 0.3) 75%,
		transparent 75%,
		transparent
	);
	background-size: 5px 5px;

	animation: ${loadingMode} 8s linear infinite;
`;
