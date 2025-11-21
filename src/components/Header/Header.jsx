import { HeaderLink } from '../HeaderLink/HeaderLink';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import * as S from './Header.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
	const { isAuthenticated, logout, user } = useAuth();
	const location = useLocation();
	const isAuthPage =
		location.pathname === '/signin' || location.pathname === '/signup';
	const showLinks = !isAuthPage && isAuthenticated;

	const navigate = useNavigate();

	const handleClickMain = () => {
		navigate('/expenses');
	};
	const handleClickLogout = () => {
		logout();
		navigate('/signin');
	};

	return (
		<S.HeaderStyled>
			<S.HeaderWrapper>
				<HeaderLogo handleClickMain={handleClickMain} />
				{showLinks && <HeaderLink />}
				{isAuthenticated && user && <div>Привет, {user.name}!</div>}
				<S.ExitLinkA onClick={handleClickLogout}>Выйти</S.ExitLinkA>
			</S.HeaderWrapper>
		</S.HeaderStyled>
	);
};
