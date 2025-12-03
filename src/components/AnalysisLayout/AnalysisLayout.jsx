// import { Calendar } from '../Calendar/Calendar';
// import { Histogram } from '../Histogram/Histogram';
// import * as S from './AnalysisLayout.styled';
// import { useState } from 'react';
// import { useExpensesData } from '../../hooks/useExpensesData';
// import { useAuth } from '../../hooks/useAuth';

// export const AnalysisLayout = () => {
// 	const { user, isAuthenticated } = useAuth();

// 	console.log('🔐 AnalysisLayout статус авторизации:', {
// 		user,
// 		isAuthenticated,
// 		token: user?.token ? 'есть' : 'нет',
// 	});

// 	const [selectedRange, setSelectedRange] = useState({
// 		start: null,
// 		end: null,
// 	});

// 	const { data: expensesData, loading, error } = useExpensesData(selectedRange);

// 	if (!isAuthenticated) {
// 		return (
// 			<S.AnalyticsWrapper>
// 				<S.AnalyticsTitle>Анализ расходов</S.AnalyticsTitle>
// 				<S.AnalyticsContent>
// 					<div style={{ textAlign: 'center', padding: '20px' }}>
// 						<p>Для просмотра аналитики необходимо авторизоваться</p>
// 					</div>
// 				</S.AnalyticsContent>
// 			</S.AnalyticsWrapper>
// 		);
// 	}

// 	return (
// 		<S.AnalyticsWrapper>
// 			<S.AnalyticsTitle>Анализ расходов</S.AnalyticsTitle>
// 			<S.AnalyticsContent>
// 				<Calendar
// 					selectedRange={selectedRange}
// 					onSelectionChange={setSelectedRange}
// 				/>
// 				<Histogram
// 					dateRange={selectedRange}
// 					expensesData={expensesData}
// 					loading={loading}
// 					error={error}
// 				/>
// 			</S.AnalyticsContent>
// 		</S.AnalyticsWrapper>
// 	);
// };

// AnalysisLayout.jsx
import { Calendar } from '../Calendar/Calendar';
import { Histogram } from '../Histogram/Histogram';
import * as S from './AnalysisLayout.styled';
import { useState } from 'react';
import { useExpensesData } from '../../hooks/useExpensesData';
import { useAuth } from '../../hooks/useAuth';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const AnalysisLayout = () => {
	const { user, isAuthenticated } = useAuth();

	// Определяем мобильную версию
	const isMobile = useMediaQuery('(max-width: 549px)');

	// Состояние для управления отображением на мобилке
	const [showCalendarOnMobile, setShowCalendarOnMobile] = useState(false);

	console.log('📱 Мобильная версия:', isMobile);
	console.log('📅 Показывать календарь на мобилке:', showCalendarOnMobile);

	const [selectedRange, setSelectedRange] = useState({
		start: null,
		end: null,
	});

	const { data: expensesData, loading, error } = useExpensesData(selectedRange);

	// // Функция для сброса выбранного периода
	// const handleResetPeriod = () => {
	// 	setSelectedRange({ start: null, end: null });
	// 	setShowCalendarOnMobile(false);
	// };

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

	// Рендер для мобильной версии
	if (isMobile) {
		return (
			<S.AnalyticsWrapper>
				<S.AnalyticsTitle>Анализ расходов</S.AnalyticsTitle>

				<S.MobileContent>
					{showCalendarOnMobile ? (
						// Показываем только календарь на мобилке
						<>
							<Calendar
								selectedRange={selectedRange}
								onSelectionChange={setSelectedRange}
							/>

							{/* Кнопка "Выбрать период" под календарем */}
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
						</>
					) : (
						// Показываем только диаграмму на мобилке
						<>
							<Histogram
								dateRange={selectedRange}
								expensesData={expensesData}
								loading={loading}
								error={error}
							/>

							<div
								className="div"
								style={{ marginTop: '24px', background: 'white' }}
							>
								{/* Кнопка "Выбрать другой период" под диаграммой */}
								<S.MobileButton onClick={() => setShowCalendarOnMobile(true)}>
									Выбрать другой период
								</S.MobileButton>
							</div>
							{/* Кнопка "Выбрать другой период" под диаграммой
							<S.MobileButton onClick={() => setShowCalendarOnMobile(true)}>
								Выбрать другой период
							</S.MobileButton> */}
						</>
					)}
				</S.MobileContent>
			</S.AnalyticsWrapper>
		);
	}

	// Рендер для десктопной версии (прежний код)
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
