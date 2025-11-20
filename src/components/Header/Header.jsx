import { HeaderLink } from '../HeaderLink/HeaderLink';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import { ExitLinkA, HeaderStyled, HeaderWrapper } from './Header.styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
	const { auth } = useAuth();
	const location = useLocation();
	const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
	const showLinks = !isAuthPage && auth;

	const navigate = useNavigate();

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
				{showLinks && <HeaderLink />}
				<ExitLinkA onClick={handleClickLogout}>Выйти</ExitLinkA>
			</HeaderWrapper>
		</HeaderStyled>
	);
};