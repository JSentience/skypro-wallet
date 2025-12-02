import * as S from './Histogram.styled';

const formatDateRange = (start, end) => {
	if (!start || !end) return 'период';

	const isSingleDay = start.toDateString() === end.toDateString();

	if (isSingleDay) {
		return start.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	}

	return `${start.toLocaleDateString('ru-RU')} - ${end.toLocaleDateString('ru-RU')}`;
};

const calculateColumnHeight = (amount, maxAmount) => {
	if (!maxAmount || amount === 0) return 5;
	return Math.max((amount / maxAmount) * 100, 5);
};

export const Histogram = ({ dateRange, expensesData, loading, error }) => {
	console.log('📊 Histogram получил данные:', { expensesData, loading, error });

	if (loading) {
		return (
			<S.HistogramBlock>
				<S.LoadingText>Загрузка данных...</S.LoadingText>
				<S.DebugInfo>
					Период: {dateRange.start?.toLocaleDateString()} -{' '}
					{dateRange.end?.toLocaleDateString()}
				</S.DebugInfo>
			</S.HistogramBlock>
		);
	}

	if (error) {
		return (
			<S.HistogramBlock>
				<S.ErrorText>Ошибка: {error}</S.ErrorText>
				<S.DebugInfo>
					Период: {dateRange.start?.toLocaleDateString()} -{' '}
					{dateRange.end?.toLocaleDateString()}
				</S.DebugInfo>
			</S.HistogramBlock>
		);
	}

	if (!dateRange.start || !dateRange.end) {
		return (
			<S.HistogramBlock>
				<S.PlaceholderText>Выберите период в календаре</S.PlaceholderText>
			</S.HistogramBlock>
		);
	}

	if (!expensesData || expensesData.total === 0) {
		return (
			<S.HistogramBlock>
				<S.HistogramHead>
					<S.HistogramSumm>0 ₽</S.HistogramSumm>
					<S.HistogramText>
						<S.ExpensesText>Расходы за</S.ExpensesText>
						<S.ExpensesBold>
							{formatDateRange(dateRange.start, dateRange.end)}
						</S.ExpensesBold>
					</S.HistogramText>
				</S.HistogramHead>
				<S.NoDataText>
					{expensesData
						? 'Нет расходов за выбранный период'
						: 'Данные не получены'}
				</S.NoDataText>
			</S.HistogramBlock>
		);
	}

	const maxAmount = Math.max(
		expensesData.food,
		expensesData.transport,
		expensesData.housing,
		expensesData.joy,
		expensesData.education,
		expensesData.other,
	);

	const formattedTotal = expensesData.total.toLocaleString('ru-RU');

	return (
		<S.HistogramBlock>
			<S.HistogramHead>
				<S.HistogramSumm>{formattedTotal} ₽</S.HistogramSumm>
				<S.HistogramText>
					<S.ExpensesText>Расходы за</S.ExpensesText>
					<S.ExpensesBold>
						{formatDateRange(dateRange.start, dateRange.end)}
					</S.ExpensesBold>
				</S.HistogramText>
			</S.HistogramHead>

			<S.HistogramMainContent>
				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.food.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksFood
						$height={calculateColumnHeight(expensesData.food, maxAmount)}
					/>
					<S.ColumnTitle>Еда</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.transport.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksTransport
						$height={calculateColumnHeight(expensesData.transport, maxAmount)}
					/>
					<S.ColumnTitle>Транспорт</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.housing.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksHousing
						$height={calculateColumnHeight(expensesData.housing, maxAmount)}
					/>
					<S.ColumnTitle>Жилье</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.joy.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksEntertainment
						$height={calculateColumnHeight(expensesData.joy, maxAmount)}
					/>
					<S.ColumnTitle>Развлечения</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.education.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksEducation
						$height={calculateColumnHeight(expensesData.education, maxAmount)}
					/>
					<S.ColumnTitle>Образование</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.other.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksOthers
						$height={calculateColumnHeight(expensesData.other, maxAmount)}
					/>
					<S.ColumnTitle>Другое</S.ColumnTitle>
				</S.ColumnAndExpenses>
			</S.HistogramMainContent>
		</S.HistogramBlock>
	);
};
