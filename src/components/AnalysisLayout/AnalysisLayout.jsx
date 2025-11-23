import { Calendar } from '../Calendar/Calendar';
import { Histogram } from '../Histogram/Histogram';
import * as S from './AnalysisLayout.styled';
import { useState, useEffect } from 'react';

export const AnalysisLayout = () => {
	const [selectedRange, setSelectedRange] = useState({
		start: null,
		end: null,
	});

	useEffect(() => {
		if (selectedRange.start && selectedRange.end) {
			console.log('Запрос к API для периода:', selectedRange);
			// fetchDataForPeriod(selectedRange);
		}
	}, [selectedRange]);

	return (
		<S.AnalyticsWrapper>
			<S.AnalyticsTitle>Анализ расходов</S.AnalyticsTitle>
			<S.AnalyticsContent>
				<Calendar
					selectedRange={selectedRange}
					onSelectionChange={setSelectedRange}
				/>
				<Histogram dateRange={selectedRange} />
			</S.AnalyticsContent>
		</S.AnalyticsWrapper>
	);
};
