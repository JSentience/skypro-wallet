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
		navigate('/');
	};
	return (
		<HeaderStyled>
			<HeaderWrapper>
				<HeaderLogo handleClickMain={handleClickMain} />
				<HeaderLink
					handleClickExpenses={handleClickExpenses}
					handleClickAnalytics={handleClickAnalytics}
				/>
				<ExitLinkA>Выйти</ExitLinkA>
			</HeaderWrapper>
		</HeaderStyled>
	);
};
