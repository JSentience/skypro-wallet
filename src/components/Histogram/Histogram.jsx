import {
	HistogramBlock,
	HistogramHead,
	HistogramSumm,
	HistogramText,
	ExpensesText,
	ExpensesBold,
	HistogramMainContent,
	ColumnAndExpenses,
	ColumnSumm,
	ColumnGraphicksFood,
	ColumnGraphicksTransport,
	ColumnGraphicksHousing,
	ColumnGraphicksEntertainment,
	ColumnGraphicksEducation,
	ColumnGraphicksOthers,
	ColumnTitle,
} from './Histogram.styled';

export const Histogram = () => {
	return (
		<HistogramBlock>
			<HistogramHead>
				<HistogramSumm>9 581 ₽</HistogramSumm>
				<HistogramText>
					<ExpensesText>Расходы за</ExpensesText>
					<ExpensesBold>10 июля 2024</ExpensesBold>
				</HistogramText>
			</HistogramHead>
			<HistogramMainContent>
				<ColumnAndExpenses>
					<ColumnSumm>3 590 ₽</ColumnSumm>
					<ColumnGraphicksFood></ColumnGraphicksFood>
					<ColumnTitle>Еда</ColumnTitle>
				</ColumnAndExpenses>
				<ColumnAndExpenses>
					<ColumnSumm>1 835 ₽</ColumnSumm>
					<ColumnGraphicksTransport></ColumnGraphicksTransport>
					<ColumnTitle>Транспорт</ColumnTitle>
				</ColumnAndExpenses>
				<ColumnAndExpenses>
					<ColumnSumm>0 ₽</ColumnSumm>
					<ColumnGraphicksHousing></ColumnGraphicksHousing>
					<ColumnTitle>Жилье</ColumnTitle>
				</ColumnAndExpenses>
				<ColumnAndExpenses>
					<ColumnSumm>1 250 ₽</ColumnSumm>
					<ColumnGraphicksEntertainment></ColumnGraphicksEntertainment>
					<ColumnTitle>Развлечения</ColumnTitle>
				</ColumnAndExpenses>
				<ColumnAndExpenses>
					<ColumnSumm>600 ₽</ColumnSumm>
					<ColumnGraphicksEducation></ColumnGraphicksEducation>
					<ColumnTitle>Образование</ColumnTitle>
				</ColumnAndExpenses>
				<ColumnAndExpenses>
					<ColumnSumm>2 306 ₽</ColumnSumm>
					<ColumnGraphicksOthers></ColumnGraphicksOthers>
					<ColumnTitle>Другое</ColumnTitle>
				</ColumnAndExpenses>
			</HistogramMainContent>
		</HistogramBlock>
	);
};
