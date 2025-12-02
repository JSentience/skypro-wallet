import styled from 'styled-components';
import { breakpoints } from '../../breakpoints';

export const HeaderStyled = styled.header`
	width: 100%;
	margin: 0 auto;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	background: #fff;
	padding-left: calc(50% - 41%);
	padding-right: calc(50% - 41%);

	@media (max-width: ${breakpoints.mobile}) {
		padding-left: 0;
		padding-right: 0;
	}
`;
export const HeaderWrapper = styled.div`
	display: flex;
	margin: 0 auto;
	max-width: 1200px;
	justify-content: space-between;
	height: 64px;
	flex-shrink: 0;
	align-items: center;

	@media (max-width: ${breakpoints.mobile}) {
		padding: 0 10px;
		height: 54px;
		flex-direction: row;
		justify-content: space-between;
	}
`;
export const ExitLinkA = styled.a`
	color: #000;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 170%; /* 23.8px */
	cursor: pointer;
	&:hover {
		color: #1fa46c;
	}
`;
export const MenuButton = styled.button`
	background: none;
	color: #1fa46c;
	text-decoration: underline;
	border: none;
	font-size: 14px;
	font-family: 'Montserrat', sans-serif;
	font-weight: 600;
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 5px 0;
`;
export const TriangleIcon = styled.img`
	width: 10px;
	height: 10px;
	margin-left: 8px;
`;

export const RightContainer = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
`;
export const MobileMenu = styled.div`
	position: absolute;
	display: inline-flex;
	padding: 10px;
	flex-direction: column;
	align-items: flex-start;
	gap: 6px;
	border-radius: 6px;
	border: 0.5px solid #999;
	box-shadow: 0 20px 67px -12px rgba(0, 0, 0, 0.13);
	top: 47px;
	right: 80px;
	background: #fff;
	z-index: 1001;
	width: auto;
`;
export const MenuItem = styled.div`
	display: flex;
	border-radius: 24px;
	background: ${(props) => (props.$isActive ? '#DBFFE9' : '#f4f5f6')};
	padding: 7px 14px;
	//align-items: center;
	gap: 10px;
	cursor: pointer;
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	font-weight: 500;
	color: ${(props) => (props.$isActive ? '#1fa46c' : '#000')};

	//&:hover {
	//	background: #dbffe9;
	//}
`;
