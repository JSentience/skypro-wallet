import { LinkContainer, NavLinks } from './HeaderLink.styled';
import { useLocation } from 'react-router-dom';

export const HeaderLink = () => {
	const { pathname } = useLocation();
	const isExpensesActive = pathname === '/' || pathname.startsWith('/expenses');

	return (
		<>
			<LinkContainer>
				<NavLinks to="/expenses" $isActive={isExpensesActive}>
					Мои расходы
				</NavLinks>
				<NavLinks to="/analysis" $isActive={pathname.startsWith('/analysis')}>
					Анализ расходов
				</NavLinks>
			</LinkContainer>
		</>
	);
};
