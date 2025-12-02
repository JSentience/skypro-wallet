import styled from 'styled-components';

export const AnalyticsTitle = styled.h2`
	color: rgba(0, 0, 0, 1);
	font-size: 32px;
	font-weight: 700;
	line-height: 150%;
	letter-spacing: 0px;
	text-align: left;
	padding-top: 36px;
	margin-bottom: 32px;
	@media (max-width: 1024px) {
		font-size: 30px;
	}
`;
export const AnalyticsWrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	height: 100vh;
`;

export const AnalyticsContent = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 32px;
	@media (1025px <= width <= 1439px) {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: 20px;
	}
	@media (max-width: 1023px) {
		display: flex;
		flex-direction: column;
	}
`;
