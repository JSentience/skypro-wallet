import styled from 'styled-components';

export const Container = styled.div`
	width: 379px;
	height: 618px;
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
	background-color: white;
	margin-top: 32px;
	padding: 32px 32px 32px 34px;
	position: relative;
`;

export const Content = styled.div`
	width: 313px;
	height: 554px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 24px;
	background-color: white;
`;

export const Title = styled.h2`
	color: #000000;
	font-family: 'Montserrat', sans-serif;
	font-size: 24px;
	font-weight: 700;
	line-height: 29px;
	text-align: center;
`;

export const InputGroup = styled.div`
	width: 313px;
	height: 75px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const InputLabel = styled.h3`
	color: #000000;
	font-family: 'Montserrat', sans-serif;
	font-size: 16px;
	font-weight: 600;
	line-height: 20px;
	text-align: left;
`;

export const Input = styled.input`
	margin-top: 16px;
	width: 313px;
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
`;

export const CategorySection = styled.div`
	width: 313px;
	height: 141px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const CategoryGrid = styled.div`
	width: 277px;
	height: 105px;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 6px;
	margin-top: 16px;
`;

export const CategoryItem = styled.div`
	display: flex;
	border-radius: 30px;
	background-color: ${(props) => (props.$active ? '#dbffe9' : '#f3f4f6')};
	padding: 8px 20px;
	cursor: pointer;
	transition: all 0.2s ease;

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
	text-align: center;
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
		background-color: #cccccc;
		cursor: not-allowed;
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
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 12px;
`;

export const FieldError = styled.div`
	color: #ff4444;
	font-size: 12px;
	margin-top: 4px;
	font-family: 'Montserrat', sans-serif;
`;
