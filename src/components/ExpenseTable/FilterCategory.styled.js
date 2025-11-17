import styled from 'styled-components';

export const FilterContainer = styled.div`
	position: absolute;
	right: 0;
	top: 24px;
	width: 176px;
	height: 240px;
	padding: 12px;
	box-sizing: border-box;
	border: 0.5px solid #999999;
	border-radius: 6px;
	box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
	background-color: white;
`;

export const FilterContent = styled.div`
	width: 152px;
	height: 216px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6px;
`;

export const CategoryItem = styled.div`
	display: flex;
	border-radius: 30px;
	background-color: ${(props) => (props.$active ? '#dbffe9' : '#f3f4f6')};
	padding: 8px 20px;
	cursor: pointer;
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
