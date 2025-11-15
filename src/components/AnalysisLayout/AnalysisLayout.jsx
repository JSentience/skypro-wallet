import { Calendar } from '../Calendar/Calendar';
import { Histogram } from '../Histogram/Histogram';

export const AnalysisLayout = () => {
	return (
		<>
			<h2>Анализ расходов</h2>
			<Calendar />
			<Histogram />
		</>
	);
};
