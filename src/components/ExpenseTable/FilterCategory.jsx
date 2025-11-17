import * as S from './FilterCategory.styled';

export const FilterCategory = () => {
	return (
		<S.FilterContainer>
			<S.FilterContent>
				<S.CategoryItem $active>
					<S.CategoryIcon src="/bag.svg" alt="" />
					<S.CategoryText $active>Еда</S.CategoryText>
				</S.CategoryItem>
				<S.CategoryItem>
					<S.CategoryIcon src="/car.svg" alt="" />
					<S.CategoryText>Транспорт</S.CategoryText>
				</S.CategoryItem>
				<S.CategoryItem>
					<S.CategoryIcon src="/house.svg" alt="" />
					<S.CategoryText>Жилье</S.CategoryText>
				</S.CategoryItem>
				<S.CategoryItem>
					<S.CategoryIcon src="/gameboy.svg" alt="" />
					<S.CategoryText>Развлечения</S.CategoryText>
				</S.CategoryItem>
				<S.CategoryItem>
					<S.CategoryIcon src="/vuesax_bold_teacher.svg" alt="" />
					<S.CategoryText>Образование</S.CategoryText>
				</S.CategoryItem>
				<S.CategoryItem>
					<S.CategoryIcon src="/message-text.svg" alt="" />
					<S.CategoryText>Другое</S.CategoryText>
				</S.CategoryItem>
			</S.FilterContent>
		</S.FilterContainer>
	);
};

export default FilterCategory;
