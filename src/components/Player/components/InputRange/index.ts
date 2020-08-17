import styled from 'styled-components';

export const InputRange = styled.input`
	-webkit-appearance: none;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
	background-color: transparent;
	width: 100%;
	height: 5px;
	cursor: pointer;

	z-index: 10;

	border-radius: 50px;
	overflow: hidden;

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 5px;
		width: 0px;
	}

	&:active {
		& ~ .player__range--current::after {
			box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.5);
		}
	}

	&:hover {
		transition: all 0.2s;
		height: 10px;

		& ~ .player__range--background,
		& ~ .player__range--current,
		& ~ .player__range--buffering,
		& ~ .player__bar--loading,
		&::-webkit-slider-thumb,
		&::after {
			transition: height 0.2s;
			height: 10px;
		}

		& ~ .player__range--current::after {
			transition: all 0.2s;
			width: 15px;
			height: 15px;
			right: -7.5px;
		}

		& ~ .player__bar--loading {
			background-size: 8px 8px;
		}

		& ~ .progress__bar--time {
			display: block;
		}
	}
`;

export const InputRangeCurrent = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
	height: 5px;
	z-index: 8;

	background: var(--season-color);

	border-radius: 50px;

	&::after {
		content: '';
		position: absolute;
		display: block;
		top: 50%;
		transform: translateY(-50%);
		right: -5px;

		height: 10px;
		width: 10px;

		border-radius: 50px;

		background-color: #fff;
	}
`;

export const InputRangeBackground = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
	width: 100%;
	height: 5px;
	z-index: 1;

	border-radius: 50px;

	background: rgba(255, 255, 255, 0.4);
`;
