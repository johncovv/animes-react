import styled from 'styled-components';

export const HeaderTag = styled.header`
	background-color: #000;
	z-index: 1000;
	position: fixed;
	max-width: 1465px;
	padding: 0 25px;
	height: 70px;
	top: 0;
	right: 0;
	left: 0;
	margin: 0 auto;

	@media only screen and (max-width: 767px) {
		height: 50px;
		bottom: 0%;
		top: auto;
		padding: 0 20px !important;

		#header__logo {
			font-size: 25px !important;
		}
	}

	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;

	#header__logo {
		font-size: 32px;
		font-weight: bold;
		color: #fff;
	}

	.header__container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		align-items: center;

		nav {
			margin-right: 25px;

			a {
				color: #fff;

				&:not(:last-child) {
					margin-right: 25px;
				}
			}

			@media only screen and (max-width: 767px) {
				&.mobile__menu {
					transform: translateX(calc(100%));

					&.menu__open {
						transform: translateX(0%);
					}
				}

				transition: transform 0.3s ease-in-out;

				background-image: linear-gradient(90deg, transparent, #000);
				z-index: 900;
				position: fixed;
				margin: 0;
				padding: 20px 20px;
				bottom: 50px;
				right: 0;
				left: 0;

				display: flex;
				flex-flow: column nowrap;
				align-items: flex-end;

				a {
					&:not(:last-child) {
						margin-right: 0 !important;
						margin-bottom: 15px;
					}
				}
			}
		}

		.search__input {
			position: relative;
			margin-right: 25px;

			.search__icon {
				z-index: 50;
				position: absolute;
				right: 15px;
				top: 50%;
				transform: translateY(-50%);
				cursor: pointer;

				transition: stroke 0.2s ease-in-out;

				&:hover {
					stroke: #fff;
				}

				&-mobile {
					display: none;

					& svg {
						stroke: #fff;
					}
				}
			}

			input {
				height: 38px;
				min-width: 270px;
				background: #1f1f1f;
				border: none;
				color: white;
				padding: 0 45px 0 15px;
				border-radius: 50px;
				font-size: 16px;
			}

			@media only screen and (max-width: 1023px) {
				margin-right: 15px;

				input,
				.search__icon {
					display: none;

					&-mobile {
						display: block;
					}
				}
			}

			svg,
			input::placehholder {
				color: #6f6f6f;
			}
		}

		.header__buttons {
			display: flex;
			flex-flow: row nowrap;

			.menu__mobile {
				display: none;

				@media only screen and (max-width: 767px) {
					display: block;
				}
			}

			svg {
				&.saves__popup {
					&:hover,
					&.popup__active {
						path {
							fill: red;
							stroke: red;
							transition: 0.3s;
						}
					}
				}

				&:hover {
					cursor: pointer;
				}

				&:not(:last-child) {
					margin-right: 25px;

					@media only screen and (max-width: 767px) {
						margin-right: 15px !important;
					}
				}
			}
		}
	}

	.navlink__recent {
		&.navlink__active,
		&:hover {
			color: #bd3c2f !important;
		}
	}

	.navlink__season {
		&.navlink__active,
		&:hover {
			color: #228ef3 !important;
		}
	}

	.navlink__categories {
		&.navlink__active,
		&:hover {
			color: #ff008c !important;
		}
	}
`;
