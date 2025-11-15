import { useAuth } from '../../hooks/useAuth';
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
import { Container } from '../../Container.styled.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainButton } from '../Button/Button';

export const Login = () => {
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const isSignIn = location.pathname === '/signin';

	const handleLogin = () => {
		setAuth(true);
		navigate('/');
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
							<InputForm>
								{!isSignIn && <InputName type="text" placeholder="Имя" />}
								<InputEmail type="text" placeholder="Почта" />
								<InputPassword type="password" placeholder="Пароль" />
							</InputForm>
							<MainButton onClick={handleLogin}>
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
