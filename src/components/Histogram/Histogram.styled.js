import styled from 'styled-components';

export const HistogramBlock = styled.div`
	display: grid;
	grid-column-start: 5;
	grid-column-end: 13;
	border-radius: 30px;
	box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
	background: rgba(255, 255, 255, 1);
	padding: 32px 32px 44px 32px;
	gap: 21px;
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
	@media (max-width: 1024px) {
		gap: 20px;
	}
`;

export const ColumnAndExpenses = styled.div`
	display: grid;
	gap: 12px;
	justify-items: center;
`;

export const ColumnSumm = styled.p`
	color: rgba(0, 0, 0, 1);
	font-size: 16px;
	font-weight: 600;
	line-height: 20px;
	letter-spacing: 0px;
	text-align: center;
	@media (max-width: 1024px) {
		font-size: 12px;
	}
`;

// с апи нужно будет оставить, возможно,
// только общую ширину (и то не факт),
// плюс цвет в зависимости от категории
// (возможно пропсом, состоянием)
// высота уже с апи как-то будет связана
export const ColumnGraphicksFood = styled.div`
	/* width: 94px; */
	width: clamp(20px, 5vw, 94px);
	height: 328px;
	border-radius: 12px;
	background: rgba(217, 182, 255, 1);
`;

export const ColumnGraphicksTransport = styled(ColumnGraphicksFood)`
	height: 169px;
	background: rgba(255, 181, 61, 1);
`;

export const ColumnGraphicksHousing = styled(ColumnGraphicksFood)`
	height: 4px;
	background: rgba(110, 228, 254, 1);
`;

export const ColumnGraphicksEntertainment = styled(ColumnGraphicksFood)`
	height: 109px;
	background: rgba(176, 174, 255, 1);
`;

export const ColumnGraphicksEducation = styled(ColumnGraphicksFood)`
	height: 65px;
	background: rgba(188, 236, 48, 1);
`;

export const ColumnGraphicksOthers = styled(ColumnGraphicksFood)`
	height: 212px;
	background: rgba(255, 185, 184, 1);
`;

export const ColumnTitle = styled.p`
	color: rgba(0, 0, 0, 1);
	font-size: 12px;
	font-weight: 400;
	line-height: 15px;
	letter-spacing: 0px;
	text-align: center;
`;
