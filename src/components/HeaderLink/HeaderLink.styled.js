import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LinkContainer = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 48px;
`;

export const NavLinks = styled(NavLink)`
	color: ${(props) => (props.$isActive ? '#1fa46c' : '#000000')};
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 14px;
	font-style: normal;
	font-weight: ${(props) => (props.$isActive ? '600' : '400')};
	line-height: 170%; /* 23.8px */
	cursor: pointer;
	text-decoration: ${(props) =>
		props.$isActive ? 'underline' : 'none'} !important;
	//&.active {
	//	color: #1fa46c;
	//	text-decoration: underline;
	//	font-weight: 600;
	//}
`;
