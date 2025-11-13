import { Button } from '../Button/Button.styled';
import { LoginContainer, LoginTitle, LoginWrapper } from './Login.styled';

export const Login = () => {
	return (
		<>
			<LoginContainer>
				<LoginWrapper>
					<LoginTitle>Вход</LoginTitle>
					<Button>Войти</Button>
				</LoginWrapper>
			</LoginContainer>
		</>
	);
};
