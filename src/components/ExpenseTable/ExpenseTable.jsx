import { useState } from 'react';
import * as S from './ExpenseTable.styled';
import { FilterCategory } from './FilterCategory';
import { Filter } from './Filter';
import { expenses } from '../../data';

export const ExpenseTable = ({ onEdit }) => {
	const [isCategoryOpen, setIsCategoryOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const toggleCategory = () => {
		setIsCategoryOpen(!isCategoryOpen);
		if (!isCategoryOpen && isFilterOpen) {
			setIsFilterOpen(false);
		}
	};

	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen);
		if (!isFilterOpen && isCategoryOpen) {
			setIsCategoryOpen(false);
		}
	};

	const closeAllModals = () => {
		setIsCategoryOpen(false);
		setIsFilterOpen(false);
	};

	const handleEditClick = (expense) => {
		onEdit(expense);
	};

	return (
		<div>
			<S.Container>
				<S.HeaderWrapper>
					<S.HeaderContainer>
						<S.Title>Таблица расходов</S.Title>
						<S.ItemsContainer>
							<S.FilterSection $marginleft="100px">
								<S.FilterText>Фильтровать по категории</S.FilterText>
								<S.FilterButton onClick={toggleCategory}>
									<S.FilterValue>еда</S.FilterValue>
									<S.FilterIcon src="/Polygon 3.svg" alt="" />
								</S.FilterButton>
								{isCategoryOpen && <FilterCategory onClose={closeAllModals} />}
							</S.FilterSection>
							<S.FilterSection $marginleft="24px" $marginright="34px">
								<S.FilterText>Сортировать по</S.FilterText>
								<S.FilterButton onClick={toggleFilter}>
									<S.FilterValue $marginleft="4px">дате</S.FilterValue>
									<S.FilterIcon src="/Polygon 3.svg" alt="" />
								</S.FilterButton>
								{isFilterOpen && <Filter onClose={closeAllModals} />}
							</S.FilterSection>
						</S.ItemsContainer>
					</S.HeaderContainer>
					<S.TableHeader>
						<S.HeaderItem>Описание</S.HeaderItem>
						<S.HeaderItem $marginleft="32px">Категория</S.HeaderItem>
						<S.HeaderItem $marginleft="32px">Дата</S.HeaderItem>
						<S.HeaderItem $marginleft="32px">Сумма</S.HeaderItem>
					</S.TableHeader>
					<S.Divider />
				</S.HeaderWrapper>
				<S.TableContent>
					{expenses.map((expense) => (
						<S.TableRow key={expense.id}>
							<S.RowItem>{expense.description}</S.RowItem>
							<S.RowItem $marginleft="32px">{expense.category}</S.RowItem>
							<S.RowItem $marginleft="32px">{expense.date}</S.RowItem>
							<S.RowItem $marginleft="32px">{expense.amount}</S.RowItem>
							<S.ActionsContainer>
								<S.ActionIcon
									$marginright="12px"
									src="/img_edit.svg"
									alt="Редактировать"
									onClick={() => handleEditClick(expense)}
								/>
								<S.ActionIcon
									$marginright="1px"
									src="/img_del.svg"
									alt="Удалить"
								/>
							</S.ActionsContainer>
						</S.TableRow>
					))}
				</S.TableContent>
			</S.Container>
		</div>
	);
};

export default ExpenseTable;
