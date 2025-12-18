import styled from 'styled-components';
import { breakpoints } from '../../breakpoints';

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
	box-shadow: 0 20px 67px -12px rgba(0, 0, 0, 0.13);
	background-color: white;
	z-index: 10;

	@media (max-width: ${breakpoints.mobile}) {
		position: absolute;
		left: 0;
		top: calc(100% + 4px);
		width: 176px;
		height: auto;
		padding: 12px;
	}
`;

export const FilterContent = styled.div`
	width: 152px;
	height: 216px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6px;

	@media (max-width: ${breakpoints.mobile}) {
		width: 152px;
		height: auto;
	}
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

	@media (max-width: ${breakpoints.mobile}) {
		font-size: 10px;
		line-height: 12px;
	}
`;
