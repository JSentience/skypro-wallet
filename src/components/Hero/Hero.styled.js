import styled from 'styled-components';

export const MainStyled = styled.main`
	width: 100%;
	background: #f4f5f6;
	min-height: calc(100vh - 64px);
	padding-top: 64px;
	padding-left: calc(50% - 41%);
	padding-right: calc(50% - 41%);
	/* @media (max-width: 1439px) {
		padding-left: calc(50% - 43%);
		padding-right: calc(50% - 43%);
	} */

	/* @media (1024px <= width <= 1440px) {
		padding-left: calc(50% - 43%);
		padding-right: calc(50% - 43%);
	} */
	@media (1025px <= width <= 1439px) {
		padding-left: calc(50% - 43%);
		padding-right: calc(50% - 43%);
	}
	@media (max-width: 1024px) {
		padding-left: calc(50% - 45%);
		padding-right: calc(50% - 45%);
	}
`;
