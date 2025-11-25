import { Calendar } from '../Calendar/Calendar';
import { Histogram } from '../Histogram/Histogram';
import * as S from './AnalysisLayout.styled';
import { useState } from 'react';
import { useExpensesData } from '../../hooks/useExpensesData';
import { useAuth } from '../../hooks/useAuth';

export const AnalysisLayout = () => {
	const { user, isAuthenticated } = useAuth();

	console.log('🔐 AnalysisLayout статус авторизации:', {
		user,
		isAuthenticated,
		token: user?.token ? 'есть' : 'нет',
	});

	const [selectedRange, setSelectedRange] = useState({
		start: null,
		end: null,
	});

	const { data: expensesData, loading, error } = useExpensesData(selectedRange);

	if (!isAuthenticated) {
		return (
			<S.AnalyticsWrapper>
				<S.AnalyticsTitle>Анализ расходов</S.AnalyticsTitle>
				<S.AnalyticsContent>
					<div style={{ textAlign: 'center', padding: '20px' }}>
						<p>Для просмотра аналитики необходимо авторизоваться</p>
					</div>
				</S.AnalyticsContent>
			</S.AnalyticsWrapper>
		);
	}

	return (
		<S.AnalyticsWrapper>
			<S.AnalyticsTitle>Анализ расходов</S.AnalyticsTitle>
			<S.AnalyticsContent>
				<Calendar
					selectedRange={selectedRange}
					onSelectionChange={setSelectedRange}
				/>
				<Histogram
					dateRange={selectedRange}
					expensesData={expensesData}
					loading={loading}
					error={error}
				/>
			</S.AnalyticsContent>
		</S.AnalyticsWrapper>
	);
};
