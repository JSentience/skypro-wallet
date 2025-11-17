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
`;

export const CategoryIcon = styled.img`
	width: 14px;
	height: 14px;
`;

export const CategoryText = styled.p`
	color: ${(props) => (props.$active ? '#1fa46c' : '#000000')};
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	font-weight: 400;
	line-height: 15px;
	text-align: center;
	margin-left: 12px;
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
