import { Calendar } from '../Calendar/Calendar';
import { Histogram } from '../Histogram/Histogram';
import * as S from './AnalysisLayout.styled';

export const AnalysisLayout = () => {
	return (
		<S.AnalyticsWrapper>
			<S.AnalyticsTitle>Анализ расходов</S.AnalyticsTitle>
			<S.AnalyticsContent>
				<Calendar />
				<Histogram />
			</S.AnalyticsContent>
		</S.AnalyticsWrapper>
	);
};
