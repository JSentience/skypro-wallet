import { MainStyled } from './Hero.styled';
import { Container } from '../../Container.styled.js';
import { Outlet } from 'react-router-dom';

export const Hero = () => {
	return (
		<MainStyled>
			<Container>
				<Outlet />
			</Container>
		</MainStyled>
	);
};
