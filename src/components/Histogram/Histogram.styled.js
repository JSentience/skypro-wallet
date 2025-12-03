import styled from 'styled-components';

export const HistogramBlock = styled.div`
	display: grid;
	grid-column-start: 5;
	grid-column-end: 13;
	border-radius: 30px;
	box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
	background: rgba(255, 255, 255, 1);
	padding: 32px 32px 32px 32px;
	gap: 21px;
	@media (max-width: 549px) {
		grid-column-start: unset;
		grid-column-end: unset;
		width: 100%;
		padding: 20px;
	}
`;

export const HistogramHead = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const HistogramSumm = styled.p`
	color: rgba(0, 0, 0, 1);
	font-size: 24px;
	font-weight: 700;
	line-height: 29px;
	letter-spacing: 0px;
	text-align: left;

	@media (max-width: 1024px) {
		font-size: 20px;
	}
`;

export const HistogramText = styled.div`
	display: flex;
	gap: 4px;
`;

export const ExpensesText = styled.span`
	color: rgba(153, 153, 153, 1);
	font-size: 12px;
	font-weight: 400;
	line-height: 15px;
	letter-spacing: 0px;
	text-align: center;
	@media (max-width: 1024px) {
		font-size: 10px;
	}
`;

export const ExpensesBold = styled(ExpensesText)`
	font-weight: 600;
`;

export const HistogramMainContent = styled.div`
	display: flex;
	gap: 32px;
	justify-content: space-between;
	align-items: flex-end;
	min-height: 300px;
	@media (max-width: 1439px) {
		gap: 20px;
	}
	@media (max-width: 1024px) {
		height: 250px;
		min-height: 250px;
	}
	@media (max-width: 1023px) {
		height: 450px;
	}
	@media (max-width: 549px) {
		height: 300px;
		min-height: 250px;
		gap: 6px;
	}
`;

// И добавляем обертку для контейнера колонок
export const ColumnAndExpenses = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	justify-content: flex-end;
	align-items: center;
	height: 100%;
	width: 100%; /* Важно для ограничения ширины дочерних элементов */

	@media (max-width: 549px) {
		gap: 6px;
	}
`;

export const ColumnSumm = styled.p`
	color: rgba(0, 0, 0, 1);
	font-size: 16px;
	font-weight: 600;
	line-height: 20px;
	letter-spacing: 0px;
	text-align: center;
	@media (1025px <= width <= 1439px) {
		font-size: 13px;
	}
	@media (max-width: 1024px) {
		font-size: 12px;
	}
`;

// Обновляем ширину колонок для мобилки
export const ColumnGraphicksFood = styled.div`
	width: clamp(20px, 5vw, 94px);
	border-radius: 12px;
	height: ${(props) => props.$height || 0}%;
	transition: height 0.3s ease;
	background: rgba(217, 182, 255, 1);
	min-height: 20px;

	@media (max-width: 549px) {
		width: 52px; /* Фиксированная ширина как в макете */
		min-width: 52px;
		max-width: 52px;
		border-radius: 6px;
	}
`;

export const ColumnGraphicksTransport = styled(ColumnGraphicksFood)`
	height: ${(props) => props.$height || 0}%;
	background: rgba(255, 181, 61, 1);
`;

export const ColumnGraphicksHousing = styled(ColumnGraphicksFood)`
	height: ${(props) => props.$height || 0}%;
	background: rgba(110, 228, 254, 1);
`;

export const ColumnGraphicksEntertainment = styled(ColumnGraphicksFood)`
	height: ${(props) => props.$height || 0}%;
	background: rgba(176, 174, 255, 1);
`;

export const ColumnGraphicksEducation = styled(ColumnGraphicksFood)`
	height: ${(props) => props.$height || 0}%;
	background: rgba(188, 236, 48, 1);
`;

export const ColumnGraphicksOthers = styled(ColumnGraphicksFood)`
	height: ${(props) => props.$height || 0}%;
	background: rgba(255, 185, 184, 1);
`;

export const ColumnTitle = styled.p`
	color: rgba(0, 0, 0, 1);
	font-size: 12px;
	font-weight: 400;
	line-height: 15px;
	letter-spacing: 0px;
	text-align: center;
	margin-top: 8px;

	/* Базовые стили для всех */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 100%;

	/* Десктоп */
	max-width: 94px;

	@media (1025px <= width <= 1439px) {
		max-width: 80px;
		font-size: 11px;
	}

	@media (max-width: 1024px) {
		max-width: 70px;
		font-size: 10px;
	}

	@media (max-width: 1023px) {
		max-width: 90px;
	}

	@media (max-width: 549px) {
		/* Для мобилки - точно 52px как в макете */
		max-width: 52px;
		font-size: 10px;
		line-height: 12px;

		/* Уменьшаем padding для лучшего отображения */
		padding: 0 2px;
		box-sizing: border-box;
	}
`;

export const LoadingText = styled.div`
	text-align: center;
	padding: 50px;
	color: #666;
`;

export const ErrorText = styled.div`
	text-align: center;
	padding: 50px;
	color: #ff4444;
`;

export const PlaceholderText = styled.div`
	text-align: center;
	padding: 50px;
	color: #666;
`;

export const NoDataText = styled.div`
	text-align: center;
	padding: 20px;
	color: #666;
`;

export const DebugInfo = styled.div`
	font-size: 12px;
	color: #666;
	text-align: center;
	margin-top: 10px;
	padding: 8px;
	background: #f5f5f5;
	border-radius: 4px;
`;
