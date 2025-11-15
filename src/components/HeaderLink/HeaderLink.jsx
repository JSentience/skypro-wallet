import {
	LinkContainer,
	NavLinkAnalytics,
	NavLinkExpense,
} from './HeaderLink.styled';

export const HeaderLink = (props) => {
	const { handleClickExpenses, handleClickAnalytics } = props;

	return (
		<>
			<LinkContainer>
				<NavLinkExpense onClick={handleClickExpenses}>
					Мои расходы
				</NavLinkExpense>
				<NavLinkAnalytics onClick={handleClickAnalytics}>
					Анализ расходов
				</NavLinkAnalytics>
			</LinkContainer>
		</>
	);
};
