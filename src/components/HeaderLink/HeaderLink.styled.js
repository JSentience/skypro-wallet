import styled from 'styled-components';

export const LinkContainer = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 48px;
`;

export const NavLinkExpense = styled.a`
	//color: #000;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 14px;
	font-style: normal;
	//font-weight: 400;
	line-height: 170%; /* 23.8px */
	cursor: pointer;
	color: #1fa46c;
	text-decoration: underline;
	text-weight: 600;
	&:checked {
		color: #1fa46c;
		text-decoration: underline;
	}
`;

export const NavLinkAnalytics = styled.a`
	color: #000;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 170%; /* 23.8px */
	cursor: pointer;
`;
