// import styled from 'styled-components';

// export const AnalyticsTitle = styled.h2`
// 	color: rgba(0, 0, 0, 1);
// 	font-size: 32px;
// 	font-weight: 700;
// 	line-height: 150%;
// 	letter-spacing: 0px;
// 	text-align: left;
// 	padding-top: 36px;
// 	margin-bottom: 32px;
// 	@media (max-width: 1024px) {
// 		font-size: 30px;
// 	}
// `;
// export const AnalyticsWrapper = styled.div`
// 	max-width: 1200px;
// 	margin: 0 auto;
// 	height: 100vh;
// `;

// export const AnalyticsContent = styled.div`
// 	display: grid;
// 	grid-template-columns: repeat(12, 1fr);
// 	gap: 32px;
// 	@media (1025px <= width <= 1439px) {
// 		display: grid;
// 		grid-template-columns: repeat(10, 1fr);
// 		gap: 20px;
// 	}
// 	@media (max-width: 1023px) {
// 		display: flex;
// 		flex-direction: column;
// 	}
// `;

// AnalysisLayout.styled.js
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
		/* text-align: center; */
	}
`;

export const AnalyticsWrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	height: 100vh;

	@media (max-width: 549px) {
		padding: 0 16px;
		height: auto;
		min-height: 100vh;
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
		display: none; // Скрываем на мобилке
	}
`;

// Новые стили для мобильной версии
export const MobileContent = styled.div`
	display: none;

	@media (max-width: 549px) {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
	}
`;

export const MobileButton = styled.button`
	display: none;

	@media (max-width: 549px) {
		display: block;
		width: 100%;
		padding: 16px;
		background: rgba(31, 164, 108, 1);
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s;

		&:hover {
			background: rgba(25, 140, 92, 1);
		}

		&:disabled {
			background: rgba(153, 153, 153, 1);
			cursor: not-allowed;
		}
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
