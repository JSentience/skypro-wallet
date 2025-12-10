import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, register } from '../../api/authApi';
import { Container } from '../../Container.styled.js';
import { useAuth } from '../../hooks/useAuth';
import { MainButton } from '../Button/Button';
import * as S from './Login.styled';

export const Login = () => {
	const { login: authLogin } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [loginValue, setLoginValue] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const isMobile = useMediaQuery({ maxWidth: 480 });

	const isSignIn = location.pathname === '/signin';

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		const trimmedLogin = loginValue.trim();
		const trimmedPassword = password.trim();
		if (!trimmedLogin || !trimmedPassword) {
			setError('Поле не может быть пустым или содержать только пробелы');
			return;
		}
		try {
			let response;
			if (isSignIn) {
				response = await login(trimmedLogin, trimmedPassword);
			} else {
				const trimmedName = name.trim();
				if (!trimmedName) {
					setError('Имя не может быть пустым');
					return;
				}
				response = await register(trimmedName, trimmedLogin, trimmedPassword);
			}
			authLogin(response.user);
			setSuccess(
				isSignIn ? 'Вход выполнен успешно!' : 'Регистрация выполнена успешно!',
			);
			navigate('/');
		} catch (err) {
			setError(err.message);
		}
	};

	const handleSwitchForm = () => {
		navigate(isSignIn ? '/signup' : '/signin');
	};

	return (
		<>
			<S.Wrapper $isMobile={isMobile}>
				{isMobile ? (
					<S.LoginContainer $isMobile={isMobile}>
						<S.LoginWrapper $isMobile={isMobile}>
							<S.LoginTitle>{isSignIn ? 'Вход' : 'Регистрация'}</S.LoginTitle>
							{error && <S.ErrorStyle>{error}</S.ErrorStyle>}
							{success && <S.SuccessStyle>{success}</S.SuccessStyle>}
							<S.InputForm>
								{!isSignIn && (
									<S.InputName
										type="text"
										placeholder="Имя"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								)}
								<S.InputEmail
									type="text"
									placeholder="Эл. почта"
									value={loginValue}
									onChange={(e) => setLoginValue(e.target.value)}
								/>
								<S.InputPassword
									type="password"
									placeholder="Пароль"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</S.InputForm>
							<MainButton type="submit" onClick={handleSubmit}>
								{isSignIn ? 'Войти' : 'Зарегистрироваться'}
							</MainButton>
							<S.ChangeForm>
								<S.ChangeFormText>
									{isSignIn ? 'Нужно зарегистрироваться?' : 'Уже есть аккаунт?'}
								</S.ChangeFormText>
								<S.ChangeFormLink onClick={handleSwitchForm}>
									{isSignIn ? 'Регистрируйтесь здесь' : 'Войдите здесь'}
								</S.ChangeFormLink>
							</S.ChangeForm>
						</S.LoginWrapper>
					</S.LoginContainer>
				) : (
					<Container>
						<S.LoginContainer $isMobile={isMobile}>
							<S.LoginWrapper $isMobile={isMobile}>
								<S.LoginTitle>{isSignIn ? 'Вход' : 'Регистрация'}</S.LoginTitle>
								{error && <S.ErrorStyle>{error}</S.ErrorStyle>}
								{success && <S.SuccessStyle>{success}</S.SuccessStyle>}
								<S.InputForm>
									{!isSignIn && (
										<S.InputName
											type="text"
											placeholder="Имя"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									)}
									<S.InputEmail
										type="text"
										placeholder="Эл. почта"
										value={loginValue}
										onChange={(e) => setLoginValue(e.target.value)}
									/>
									<S.InputPassword
										type="password"
										placeholder="Пароль"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</S.InputForm>
								<MainButton type="submit" onClick={handleSubmit}>
									{isSignIn ? 'Войти' : 'Зарегистрироваться'}
								</MainButton>
								<S.ChangeForm>
									<S.ChangeFormText>
										{isSignIn
											? 'Нужно зарегистрироваться?'
											: 'Уже есть аккаунт?'}
									</S.ChangeFormText>
									<S.ChangeFormLink onClick={handleSwitchForm}>
										{isSignIn ? 'Регистрируйтесь здесь' : 'Войдите здесь'}
									</S.ChangeFormLink>
								</S.ChangeForm>
							</S.LoginWrapper>
						</S.LoginContainer>
					</Container>
				)}
			</S.Wrapper>
		</>
	);
};
