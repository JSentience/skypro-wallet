import styled from 'styled-components';

export const MainStyled = styled.main`
	width: 100%;
	background: #f4f5f6;
	min-height: calc(100vh - 64px);
	padding-top: 64px;
	padding-left: calc(50% - 41%);
	padding-right: calc(50% - 41%);

	@media (1025px <= width <= 1439px) {
		padding-left: calc(50% - 43%);
		padding-right: calc(50% - 43%);
	}

	@media (max-width: 1024px) {
		padding-left: calc(50% - 45%);
		padding-right: calc(50% - 45%);
	}

	@media (max-width: 549px) {
		position: relative;
		background: linear-gradient(to bottom, white, rgba(244, 245, 246, 1));
		padding: 64px 16px 90px 16px;
		min-height: 100vh;
		height: auto;
		box-sizing: border-box;
	}
`;
