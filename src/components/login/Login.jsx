import { useAuth } from '../../hooks/useAuth';
import { login, register } from '../../api/authApi';
import { Container } from '../../Container.styled.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainButton } from '../Button/Button';
import { useEffect, useState } from 'react';
import {
	ChangeForm,
	ChangeFormLink,
	ChangeFormText,
	InputEmail,
	InputForm,
	InputName,
	InputPassword,
	LoginContainer,
	LoginTitle,
	LoginWrapper,
	Wrapper,
} from './Login.styled';

export const Login = () => {
	const { login: authLogin } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [loginValue, setLoginValue] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const isSignIn = location.pathname === '/signin';

	useEffect(() => {
		const storedData = localStorage.getItem('auth');
		if (storedData) {
			const parsed = JSON.parse(storedData);
			setLoginValue(parsed.userLogin || '');
			setName(parsed.userName || '');
		}
	}, []);

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
			<Wrapper>
				<Container>
					<LoginContainer>
						<LoginWrapper>
							<LoginTitle>{isSignIn ? 'Вход' : 'Регистрация'}</LoginTitle>
							{error && <div style={{ color: 'red' }}>{error}</div>}
							{success && <div style={{ color: 'green' }}>{success}</div>}
							<InputForm>
								{!isSignIn && (
									<InputName
										type="text"
										placeholder="Имя"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								)}
								<InputEmail
									type="text"
									placeholder="Почта"
									value={loginValue}
									onChange={(e) => setLoginValue(e.target.value)}
								/>
								<InputPassword
									type="password"
									placeholder="Пароль"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</InputForm>
							<MainButton
								type="submit"
								onSubmit={handleSubmit}
								onClick={handleSubmit}
							>
								{isSignIn ? 'Войти' : 'Зарегистрироваться'}
							</MainButton>
							<ChangeForm>
								<ChangeFormText>
									{isSignIn ? 'Нужно зарегистрироваться?' : 'Уже есть аккаунт?'}
								</ChangeFormText>
								<ChangeFormLink onClick={handleSwitchForm}>
									{isSignIn ? 'Регистрируйтесь здесь' : 'Войдите здесь'}
								</ChangeFormLink>
							</ChangeForm>
						</LoginWrapper>
					</LoginContainer>
				</Container>
			</Wrapper>
		</>
	);
};
