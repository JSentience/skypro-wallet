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

	@media (max-width: 549px) {
		font-size: 24px;
		padding-top: 20px;
		margin-bottom: 20px;
	}
`;

export const AnalyticsTitleMobileBlock = styled.div`
	position: relative;
`;

export const AnalyticsTitleMobile = styled.button`
	color: rgba(153, 153, 153, 1);
	font-size: 12px;
	font-weight: 600;
	line-height: 150%;
	letter-spacing: 0px;
	padding-top: 20px;
	padding-bottom: 12px;
	text-align: left;
	position: relative;
	left: 20px;
`;

export const AnalyticsWrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	height: 100vh;

	@media (max-width: 549px) {
		width: 100%;
		padding: 0;
		height: 100vh;
		min-height: 100vh;
		position: relative;
		box-sizing: border-box;
	}
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

	@media (max-width: 549px) {
		display: none;
	}
`;

export const MobileButtonContainer = styled.div`
	display: none;

	@media (max-width: 549px) {
		display: block;
		width: 100%;
		padding: 24px 16px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px -20px 67px -12px rgba(0, 0, 0, 0.13);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		box-sizing: border-box;
	}
`;

export const MobileButton = styled.button`
	display: none;

	@media (max-width: 549px) {
		display: block;
		width: 100%;
		padding: 12px;
		background: rgba(31, 164, 108, 1);
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s;
		box-sizing: border-box;

		&:hover {
			background: rgba(25, 140, 92, 1);
		}

		&:disabled {
			background: rgba(153, 153, 153, 1);
			cursor: not-allowed;
		}
	}
`;

export const MobileContent = styled.div`
	display: none;

	@media (max-width: 549px) {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		padding-bottom: 90px;
		position: relative;
		box-sizing: border-box;
	}
`;

export const MobileSecondaryButton = styled(MobileButton)`
	@media (max-width: 549px) {
		background: transparent;
		color: rgba(31, 164, 108, 1);
		border: 1px solid rgba(31, 164, 108, 1);

		&:hover {
			background: rgba(31, 164, 108, 0.1);
		}
	}
`;

export const HistogramContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	padding-bottom: 20px;
`;

export const CalendarContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
`;
