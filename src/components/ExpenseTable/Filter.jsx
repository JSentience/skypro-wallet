import * as S from './Filter.styled';

export const Filter = () => (
	<S.FilterContainer>
		<S.FilterContent>
			<S.FilterItem $active>
				<S.FilterText $active>Дате</S.FilterText>
			</S.FilterItem>
			<S.FilterItem>
				<S.FilterText>Сумме</S.FilterText>
			</S.FilterItem>
		</S.FilterContent>
	</S.FilterContainer>
);

export default Filter;
