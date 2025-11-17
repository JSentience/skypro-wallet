import styled from 'styled-components';

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
`;
export const HeaderWrapper = styled.div`
	display: flex;
	margin: 0 auto;
	max-width: 1200px;
	justify-content: space-between;
	height: 64px;
	flex-shrink: 0;

	align-items: center;
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
