import { Calendar } from '../Calendar/Calendar';
import { Histogram } from '../Histogram/Histogram';
import * as S from './AnalysisLayout.styled';
import { useState } from 'react';
import { useExpensesData } from '../../hooks/useExpensesData';
import { useAuth } from '../../hooks/useAuth';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const AnalysisLayout = () => {
	const { user, isAuthenticated } = useAuth();

	const isMobile = useMediaQuery('(max-width: 549px)');

	const [showCalendarOnMobile, setShowCalendarOnMobile] = useState(false);

	console.log('📱 Мобильная версия:', isMobile);
	console.log('📅 Показывать календарь на мобилке:', showCalendarOnMobile);

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

	if (isMobile) {
		return (
			<S.AnalyticsWrapper>
				<S.AnalyticsTitle>Анализ расходов</S.AnalyticsTitle>

				<S.MobileContent>
					{showCalendarOnMobile ? (
						<>
							<S.CalendarContainer>
								<Calendar
									selectedRange={selectedRange}
									onSelectionChange={setSelectedRange}
								/>
							</S.CalendarContainer>

							<S.MobileButtonContainer>
								<S.MobileButton
									onClick={() => {
										if (selectedRange.start && selectedRange.end) {
											setShowCalendarOnMobile(false);
										} else {
											alert('Пожалуйста, выберите период в календаре');
										}
									}}
									disabled={!selectedRange.start || !selectedRange.end}
								>
									{selectedRange.start && selectedRange.end
										? 'Выбрать период'
										: 'Выберите период в календаре'}
								</S.MobileButton>
							</S.MobileButtonContainer>
						</>
					) : (
						<>
							<S.HistogramContainer>
								<Histogram
									dateRange={selectedRange}
									expensesData={expensesData}
									loading={loading}
									error={error}
								/>
							</S.HistogramContainer>

							<S.MobileButtonContainer>
								<S.MobileButton onClick={() => setShowCalendarOnMobile(true)}>
									Выбрать другой период
								</S.MobileButton>
							</S.MobileButtonContainer>
						</>
					)}
				</S.MobileContent>
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
