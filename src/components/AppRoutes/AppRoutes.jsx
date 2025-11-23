import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage';
import { SignInPage } from '../../pages/SignInPage';
import { SignUpPage } from '../../pages/SignUpPage';
import { CostAnalysisPage } from '../../pages/CostAnalysisPage';
import { MyExpensesPage } from '../../pages/MyExpensesPage';
import { NewExpensePage } from '../../pages/NewExpensePage';
import { PrivatePage } from '../../pages/PrivatePage';

export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<PrivatePage />}>
				<Route path="/" element={<MainPage />} />
				<Route path="/analysis" element={<CostAnalysisPage />} />
				<Route path="/expenses" element={<MyExpensesPage />} />
				<Route path="/new-expense" element={<NewExpensePage />} />
			</Route>
			<Route path="/signin" element={<SignInPage />} />
			<Route path="/signup" element={<SignUpPage />} />
		</Routes>
	);
};
