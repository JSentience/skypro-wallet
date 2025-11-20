import styled from 'styled-components';

export const FilterContainer = styled.div`
	width: 106px;
	height: 92px;
	position: absolute;
	right: 0;
	top: 24px;
	padding: 12px;
	box-sizing: border-box;
	border: 0.5px solid #999999;
	border-radius: 6px;
	box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
	background-color: white;
`;

export const FilterContent = styled.div`
	width: 82px;
	height: 68px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6px;
`;

export const FilterItem = styled.div`
	display: flex;
	border-radius: 30px;
	background-color: ${(props) => (props.$active ? '#dbffe9' : '#f3f4f6')};
	padding: 8px 20px;
	cursor: pointer;
`;

export const FilterText = styled.p`
	color: ${(props) => (props.$active ? '#1fa46c' : '#000000')};
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	font-weight: 400;
	line-height: 15px;
	text-align: center;
`;
