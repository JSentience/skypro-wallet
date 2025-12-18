import styled, { css } from 'styled-components';
import { breakpoints } from '../../breakpoints';

const mobileQuery = `@media (max-width: ${breakpoints.mobile})`;

const inputStyles = css`
	width: ${(props) => (props.$fullWidth ? '100%' : '313px')};
	height: 39px;
	box-sizing: border-box;
	border: 0.5px solid
		${(props) =>
			props.$error ? '#ff4444' : props.$filled ? '#1fa46c' : '#cccccc'};
	border-radius: 6px;
	background-color: ${(props) =>
		props.$error ? '#ffebee' : props.$filled ? '#dbffe9' : '#ffffff'};
	padding: 12px;
	transition: all 0.3s ease;

	&:focus {
		outline: none;
		border-color: ${(props) => (props.$error ? '#ff4444' : '#1fa46c')};
		background-color: ${(props) => (props.$error ? '#ffebee' : '#dbffe9')};
	}

	${mobileQuery} {
		width: 100%;
		margin-top: 12px;
	}
`;

export const Container = styled.div`
	width: 379px;
	height: 618px;
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	box-shadow: 0 20px 67px -12px rgba(0, 0, 0, 0.13);
	background-color: white;
	padding: 32px 32px 32px 34px;
	position: relative;

	${mobileQuery} {
		width: 100%;
		height: auto;
		min-height: calc(100vh - 54px);
		border-radius: 0;
		box-shadow: none;
		padding: 24px 0 32px 0;
	}
`;

export const Content = styled.div`
	width: 313px;
	display: flex;
	flex-direction: column;
	gap: 24px;

	${mobileQuery} {
		width: 100%;
		gap: 20px;
	}
`;

export const Title = styled.h2`
	color: #000000;
	font-family: 'Montserrat', sans-serif;
	font-size: 24px;
	font-weight: 700;
	line-height: 29px;
	text-align: center;

	${mobileQuery} {
		font-size: 20px;
		line-height: 24px;
		text-align: left;
	}
`;

export const BackButton = styled.button`
	display: none;

	${mobileQuery} {
		color: #999;
		font-size: 12px;
		font-weight: 600;
		font-family: 'Montserrat', sans-serif;
		line-height: 17px;
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin-bottom: 8px;

		&:hover {
			opacity: 0.8;
		}
	}
`;

export const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const InputGroup = styled.div`
	width: 313px;
	display: flex;
	flex-direction: column;

	${mobileQuery} {
		width: 100%;
	}
`;

export const InputLabel = styled.h3`
	color: #000000;
	font-family: 'Montserrat', sans-serif;
	font-size: 16px;
	font-weight: 600;
	line-height: 20px;

	${mobileQuery} {
		font-size: 14px;
		line-height: 17px;
	}
`;

export const Input = styled.input`
	${inputStyles};
	margin-top: 16px;
`;

export const CategorySection = styled.div`
	width: 313px;
	display: flex;
	flex-direction: column;

	${mobileQuery} {
		width: 100%;
	}
`;

export const CategoryGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	margin-top: 16px;

	${mobileQuery} {
		margin-top: 12px;
	}
`;

export const CategoryItem = styled.div`
	display: flex;
	border-radius: 30px;
	background-color: ${(props) => (props.$active ? '#dbffe9' : '#f3f4f6')};
	padding: 8px 20px;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${(props) => (props.$active ? '#dbffe9' : '#e8f5ee')};
	}
`;

export const CategoryIcon = styled.img`
	width: 14px;
	height: 14px;
	filter: ${(props) =>
		props.$active
			? 'invert(48%) sepia(79%) saturate(384%) hue-rotate(106deg) brightness(94%) contrast(89%)'
			: 'none'};
	transition: filter 0.2s ease;
`;

export const CategoryText = styled.p`
	color: ${(props) => (props.$active ? '#1fa46c' : '#000000')};
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	font-weight: 400;
	line-height: 15px;
	margin-left: 12px;
	transition: color 0.2s ease;
`;

export const Button = styled.button`
	width: 313px;
	height: 39px;
	border-radius: 6px;
	background-color: #1fa46c;
	padding: 12px;
	border: none;
	cursor: pointer;

	&:disabled {
		background-color: #999;
		cursor: not-allowed;
	}

	${mobileQuery} {
		width: 100%;
		max-width: 373px;
	}
`;

export const ButtonText = styled.div`
	color: #ffffff;
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	font-weight: 600;
	line-height: 15px;
	text-align: center;
`;

export const ErrorMessage = styled.div`
	position: absolute;
	top: 70px;
	left: 32px;
	right: 32px;
	background: #ffebee;
	color: #c62828;
	padding: 12px;
	border-radius: 4px;
	border: 1px solid #ffcdd2;
	z-index: 10;

	${mobileQuery} {
		top: 60px;
		left: 16px;
		right: 16px;
	}
`;

export const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	gap: 12px;

	${mobileQuery} {
		background: #ffffff;
		box-shadow: 0 -20px 67px -12px rgba(0, 0, 0, 0.13);
		position: fixed;
		bottom: 0;
		padding: 24px 16px;
		left: clamp(0px, -57.14px + 15.24vw, 16px);
		justify-content: center;
		align-items: center;
	}
`;

export const FieldError = styled.div`
	color: #ff4444;
	font-size: 12px;
	margin-top: 4px;
	font-family: 'Montserrat', sans-serif;
`;

export const SumInput = styled(Input)`
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	-moz-appearance: textfield;
	appearance: textfield;
`;
