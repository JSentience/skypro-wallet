import * as S from './Filter.styled';

export const Filter = ({ onSortSelect, isSortActive }) => {
	const sortOptions = ['Дате', 'Сумме'];

	const handleSortClick = (sortType) => {
		onSortSelect(sortType);
	};

	return (
		<S.FilterContainer>
			<S.FilterContent>
				{sortOptions.map((sortType) => (
					<S.FilterItem
						key={sortType}
						$active={isSortActive(sortType)}
						onClick={() => handleSortClick(sortType)}
					>
						<S.FilterText $active={isSortActive(sortType)}>
							{sortType}
						</S.FilterText>
					</S.FilterItem>
				))}
			</S.FilterContent>
		</S.FilterContainer>
	);
};

export default Filter;
