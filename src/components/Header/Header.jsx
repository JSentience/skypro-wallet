import { HeaderLink } from '../HeaderLink/HeaderLink';
import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import * as S from './Header.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../../breakpoints';
import { useState, useCallback, useMemo } from 'react';

export const Header = () => {
	const { isAuthenticated, logout, user } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const isAuthPage = useMemo(
		() => location.pathname === '/signin' || location.pathname === '/signup',
		[location.pathname],
	);
	const showLinks = !isAuthPage && isAuthenticated;
	const pathname = location?.pathname || '';

	const handleClickMain = useCallback(() => {
		navigate('/expenses');
	}, [navigate]);

	const handleClickLogout = useCallback(() => {
		logout();
		navigate('/signin');
		setIsMenuOpen(false);
	}, [logout, navigate]);

	const toggleMenu = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);

	const handleNavigate = useCallback(
		(path) => {
			navigate(path);
			setIsMenuOpen(false);
		},
		[navigate],
	);

	const isExpensesPath = useMemo(
		() => pathname === '/' || pathname.startsWith('/expenses'),
		[pathname],
	);

	const currentPageName = useMemo(() => {
		if (pathname === '/' || pathname.startsWith('/expenses')) return 'Мои расходы';
		if (pathname.startsWith('/analysis')) return 'Анализ расходов';
		if (pathname.startsWith('/new-expense')) return 'Новый расход';
		return 'Мои расходы';
	}, [pathname]);
	return (
		<S.HeaderStyled>
			<S.HeaderWrapper $isMobile={isMobile}>
				<HeaderLogo handleClickMain={handleClickMain} />
				{showLinks && !isMobile && <HeaderLink />}
				{isAuthenticated && user && !isMobile && (
					<div>Привет, {user.name}!</div>
				)}
				{!isMobile && isAuthenticated && (
					<S.ExitLinkA onClick={handleClickLogout}>Выйти</S.ExitLinkA>
				)}
				{(showLinks || isAuthenticated) && isMobile && (
					<S.RightContainer>
						{showLinks && (
							<S.MenuButton onClick={toggleMenu}>
								{currentPageName} <S.TriangleIcon src="/Polygon 3.svg" alt="" />
							</S.MenuButton>
						)}
						{isAuthenticated && (
							<S.ExitLinkA onClick={handleClickLogout}>Выйти</S.ExitLinkA>
						)}
					</S.RightContainer>
				)}
				{isMenuOpen && isMobile && (
					<S.MobileMenu>
						<S.MenuItem
							$isActive={isExpensesPath}
							onClick={() => handleNavigate('/expenses')}
						>
							Мои расходы
						</S.MenuItem>
						<S.MenuItem
							$isActive={pathname.startsWith('/new-expense')}
							onClick={() => handleNavigate('/new-expense')}
						>
							Новый расход
						</S.MenuItem>
						<S.MenuItem
							$isActive={pathname.startsWith('/analysis')}
							onClick={() => handleNavigate('/analysis')}
						>
							Анализ расходов
						</S.MenuItem>
					</S.MobileMenu>
				)}
			</S.HeaderWrapper>
		</S.HeaderStyled>
	);
};
