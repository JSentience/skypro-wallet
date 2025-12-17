import { Calendar } from '../Calendar/Calendar';
import { Histogram } from '../Histogram/Histogram';
import * as S from './AnalysisLayout.styled';
import { useState } from 'react';
import { useExpensesData } from '../../hooks/useExpensesData';
import { useAuth } from '../../hooks/useAuth';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const AnalysisLayout = () => {
	const { isAuthenticated } = useAuth();

	const isMobile = useMediaQuery('(max-width: 549px)');

	const [showCalendarOnMobile, setShowCalendarOnMobile] = useState(false);

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
				{showCalendarOnMobile ? (
					<S.AnalyticsTitleMobileBlock>
						<svg
							style={{ position: 'absolute', top: '22px' }}
							viewBox="0 0 14 14"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							width="14.000000"
							height="14.000000"
							fill="none"
						>
							<g id="vuesax/bold/arrow-left">
								<g id="arrow-left">
									<path
										id="Vector"
										d="M9.44425 1.16675L4.55591 1.16675C2.43258 1.16675 1.16675 2.43258 1.16675 4.55591L1.16675 9.43841C1.16675 11.5676 2.43258 12.8334 4.55591 12.8334L9.43841 12.8334C11.5617 12.8334 12.8276 11.5676 12.8276 9.44425L12.8276 4.55591C12.8334 2.43258 11.5676 1.16675 9.44425 1.16675ZM10.5001 7.43758L4.55591 7.43758L6.31175 9.19341C6.48091 9.36258 6.48091 9.64258 6.31175 9.81175C6.22425 9.89925 6.11341 9.94008 6.00258 9.94008C5.89175 9.94008 5.78091 9.89925 5.69341 9.81175L3.19091 7.30925C3.10925 7.22758 3.06258 7.11675 3.06258 7.00008C3.06258 6.88341 3.10925 6.77258 3.19091 6.69091L5.69341 4.18841C5.86258 4.01925 6.14258 4.01925 6.31175 4.18841C6.48091 4.35758 6.48091 4.63758 6.31175 4.80675L4.55591 6.56258L10.5001 6.56258C10.7392 6.56258 10.9376 6.76091 10.9376 7.00008C10.9376 7.23925 10.7392 7.43758 10.5001 7.43758Z"
										fill="rgb(153,153,153)"
										fillRule="nonzero"
									/>
									<path
										id="Vector"
										opacity="0"
										transform="matrix(-1,-1.22465e-16,1.22465e-16,-1,14,14)"
									/>
								</g>
							</g>
						</svg>
						<S.AnalyticsTitleMobile
							onClick={() => setShowCalendarOnMobile(false)}
						>
							Анализ расходов
						</S.AnalyticsTitleMobile>
					</S.AnalyticsTitleMobileBlock>
				) : (
					<S.AnalyticsTitle>Анализ расходов</S.AnalyticsTitle>
				)}

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
