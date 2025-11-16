import { Calendar } from '../Calendar/Calendar';
import { Histogram } from '../Histogram/Histogram';

import {
	AnalyticsTitle,
	AnalyticsWrapper,
	AnalyticsContent,
} from './AnalysisLayout.styled';

export const AnalysisLayout = () => {
	return (
		<AnalyticsWrapper>
			<AnalyticsTitle>Анализ расходов</AnalyticsTitle>
			<AnalyticsContent>
				<Calendar />
				<Histogram />
			</AnalyticsContent>
		</AnalyticsWrapper>
	);
};
