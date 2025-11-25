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
	border: 0.5px solid #1fa46c;
	border-radius: 6px;
	background-color: #dbffe9;
	padding: 12px;
`;

export const CategorySection = styled.div`
	width: 313px;
	height: 141px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;
`;

export const CategoryGrid = styled.div`
	width: 277px;
	height: 105px;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 6px;
`;

export const CategoryItem = styled.div`
	display: flex;
	border-radius: 30px;
	background-color: ${(props) => (props.$active ? '#dbffe9' : '#f3f4f6')};
	padding: 8px 20px;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: #e8f5ee;
	}

	/* Стили для активного состояния */
	${(props) =>
		props.$active &&
		`
		background-color: #dbffe9;
		
		img {
			filter: invert(48%) sepia(79%) saturate(384%) hue-rotate(106deg) brightness(94%) contrast(89%);
		}
	`}
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
	background: #ffebee;
	color: #c62828;
	padding: 12px;
	border-radius: 4px;
	margin-bottom: 16px;
	border: 1px solid #ffcdd2;
`;

export const Hint = styled.div`
	font-size: 12px;
	color: #666;
	margin-top: 4px;
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 12px;
`;

export const CancelButton = styled.button`
	background: #6c757d;
	color: white;
	border: none;
	padding: 12px 24px;
	border-radius: 4px;
	cursor: pointer;
	flex: 1;

	&:hover:not(:disabled) {
		background: #545b62;
	}

	&:disabled {
		background: #ccc;
		cursor: not-allowed;
	}
`;
