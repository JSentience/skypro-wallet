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

const isMobile = window.innerWidth <= 549;

const categoryNames = {
	food: 'Еда',
	transport: isMobile ? 'Трансп.' : 'Транспорт',
	housing: 'Жилье',
	joy: isMobile ? 'Развлеч.' : 'Развлечения',
	education: isMobile ? 'Образов.' : 'Образование',
	other: 'Другое',
};

export const Histogram = ({ dateRange, expensesData, loading, error }) => {
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
				<S.PlaceholderText>
					<p>Выберите период в календаре</p>
					<p>
						При выборе одного дня или месяца нажмите на нужный период{' '}
						<span style={{ color: '#1fa46c', fontWeight: '600' }}>дважды</span>
					</p>
				</S.PlaceholderText>
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
					<S.ColumnTitle>{categoryNames.food}</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.transport.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksTransport
						$height={calculateColumnHeight(expensesData.transport, maxAmount)}
					/>
					<S.ColumnTitle>{categoryNames.transport}</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.housing.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksHousing
						$height={calculateColumnHeight(expensesData.housing, maxAmount)}
					/>
					<S.ColumnTitle>{categoryNames.housing}</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.joy.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksEntertainment
						$height={calculateColumnHeight(expensesData.joy, maxAmount)}
					/>
					<S.ColumnTitle>{categoryNames.joy}</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.education.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksEducation
						$height={calculateColumnHeight(expensesData.education, maxAmount)}
					/>
					<S.ColumnTitle>{categoryNames.education}</S.ColumnTitle>
				</S.ColumnAndExpenses>

				<S.ColumnAndExpenses>
					<S.ColumnSumm>
						{expensesData.other.toLocaleString('ru-RU')} ₽
					</S.ColumnSumm>
					<S.ColumnGraphicksOthers
						$height={calculateColumnHeight(expensesData.other, maxAmount)}
					/>
					<S.ColumnTitle>{categoryNames.other}</S.ColumnTitle>
				</S.ColumnAndExpenses>
			</S.HistogramMainContent>
		</S.HistogramBlock>
	);
};
