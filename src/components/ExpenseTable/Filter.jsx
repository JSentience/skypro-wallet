import * as S from './Filter.styled';

export const Filter = ({ selectedSort, onSortSelect }) => {
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
						$active={selectedSort === sortType}
						onClick={() => handleSortClick(sortType)}
					>
						<S.FilterText $active={selectedSort === sortType}>
							{sortType}
						</S.FilterText>
					</S.FilterItem>
				))}
			</S.FilterContent>
		</S.FilterContainer>
	);
};

export default Filter;
