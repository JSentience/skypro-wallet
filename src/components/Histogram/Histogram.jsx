import * as S from './Histogram.styled';

export const Histogram = () => {
	return (
		<S.HistogramBlock>
			<S.HistogramHead>
				<S.HistogramSumm>9 581 ₽</S.HistogramSumm>
				<S.HistogramText>
					<S.ExpensesText>Расходы за</S.ExpensesText>
					<S.ExpensesBold>10 июля 2024</S.ExpensesBold>
				</S.HistogramText>
			</S.HistogramHead>
			<S.HistogramMainContent>
				<S.ColumnAndExpenses>
					<S.ColumnSumm>3 590 ₽</S.ColumnSumm>
					<S.ColumnGraphicksFood></S.ColumnGraphicksFood>
					<S.ColumnTitle>Еда</S.ColumnTitle>
				</S.ColumnAndExpenses>
				<S.ColumnAndExpenses>
					<S.ColumnSumm>1 835 ₽</S.ColumnSumm>
					<S.ColumnGraphicksTransport></S.ColumnGraphicksTransport>
					<S.ColumnTitle>Транспорт</S.ColumnTitle>
				</S.ColumnAndExpenses>
				<S.ColumnAndExpenses>
					<S.ColumnSumm>0 ₽</S.ColumnSumm>
					<S.ColumnGraphicksHousing></S.ColumnGraphicksHousing>
					<S.ColumnTitle>Жилье</S.ColumnTitle>
				</S.ColumnAndExpenses>
				<S.ColumnAndExpenses>
					<S.ColumnSumm>1 250 ₽</S.ColumnSumm>
					<S.ColumnGraphicksEntertainment></S.ColumnGraphicksEntertainment>
					<S.ColumnTitle>Развлечения</S.ColumnTitle>
				</S.ColumnAndExpenses>
				<S.ColumnAndExpenses>
					<S.ColumnSumm>600 ₽</S.ColumnSumm>
					<S.ColumnGraphicksEducation></S.ColumnGraphicksEducation>
					<S.ColumnTitle>Образование</S.ColumnTitle>
				</S.ColumnAndExpenses>
				<S.ColumnAndExpenses>
					<S.ColumnSumm>2 306 ₽</S.ColumnSumm>
					<S.ColumnGraphicksOthers></S.ColumnGraphicksOthers>
					<S.ColumnTitle>Другое</S.ColumnTitle>
				</S.ColumnAndExpenses>
			</S.HistogramMainContent>
		</S.HistogramBlock>
	);
};
