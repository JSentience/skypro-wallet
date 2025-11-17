import {
	LinkContainer,
	NavLinks
} from './HeaderLink.styled';

export const HeaderLink = () => {

	return (
		<>
			<LinkContainer>
				<NavLinks to='/expenses'>
					Мои расходы
				</NavLinks>
				<NavLinks to="/analysis">
					Анализ расходов
				</NavLinks>
			</LinkContainer>
		</>
	);
};
