import { HeaderLink } from '../HeaderLink/HeaderLink';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import { ExitLinkA, HeaderStyled, HeaderWrapper } from './Header.styled';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
	const navigate = useNavigate();
	const handleClickExpenses = () => {
		navigate('/expenses');
	};
	const handleClickAnalytics = () => {
		navigate('/analysis');
	};
	const handleClickMain = () => {
		navigate('/expenses');
	};
	const handleClickLogout = () => {
		navigate('/signin');
	};
	return (
		<HeaderStyled>
			<HeaderWrapper>
				<HeaderLogo handleClickMain={handleClickMain} />
				<HeaderLink
					handleClickExpenses={handleClickExpenses}
					handleClickAnalytics={handleClickAnalytics}
				/>
				<ExitLinkA onClick={handleClickLogout}>Выйти</ExitLinkA>
			</HeaderWrapper>
		</HeaderStyled>
	);
};
