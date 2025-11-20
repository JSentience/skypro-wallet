import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LinkContainer = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 48px;
`;

export const NavLinks = styled(NavLink)`
	color: #000;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 170%; /* 23.8px */
	cursor: pointer;
	&.active {
		color: #1fa46c;
		text-decoration: underline;
		font-weight: 600;
	}
`;
