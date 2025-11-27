import * as S from './FilterCategory.styled';

export const FilterCategory = ({ onCategorySelect, isCategoryActive }) => {
	const categories = [
		{ name: 'Еда', icon: '/bag.svg' },
		{ name: 'Транспорт', icon: '/car.svg' },
		{ name: 'Жилье', icon: '/house.svg' },
		{ name: 'Развлечения', icon: '/gameboy.svg' },
		{ name: 'Образование', icon: '/vuesax_bold_teacher.svg' },
		{ name: 'Другое', icon: '/message-text.svg' },
	];

	const handleCategoryClick = (categoryName) => {
		onCategorySelect(categoryName);
	};

	return (
		<S.FilterContainer>
			<S.FilterContent>
				{categories.map((category) => (
					<S.CategoryItem
						key={category.name}
						$active={isCategoryActive(category.name)}
						onClick={() => handleCategoryClick(category.name)}
					>
						<S.CategoryIcon
							src={category.icon}
							alt={category.name}
							$active={isCategoryActive(category.name)}
						/>
						<S.CategoryText $active={isCategoryActive(category.name)}>
							{category.name}
						</S.CategoryText>
					</S.CategoryItem>
				))}
			</S.FilterContent>
		</S.FilterContainer>
	);
};

export default FilterCategory;
