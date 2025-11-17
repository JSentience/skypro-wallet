import { useState } from 'react';
import * as S from './ExpenseTable.styled';
import { FilterCategory } from './FilerCategory';
import { Filter } from './Filter';

export const ExpenseTable = () => {
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
	return (
		<div>
			<S.Container>
				<S.HeaderWrapper>
					<S.HeaderContainer>
						<S.Title>Таблица расходов</S.Title>
						<S.ItemsContainer>
							<S.FilterSection marginleft="130px">
								<S.FilterText>Фильтровать по категории</S.FilterText>
								<S.FilterButton onClick={toggleCategory}>
									<S.FilterValue>еда</S.FilterValue>
									<S.FilterIcon src="/polygon 3.svg" alt="" />
								</S.FilterButton>
								{isCategoryOpen && <FilterCategory onClose={closeAllModals} />}
							</S.FilterSection>
							<S.FilterSection marginleft="24px" marginright="34px">
								<S.FilterText>Сортировать по</S.FilterText>
								<S.FilterButton onClick={toggleFilter}>
									<S.FilterValue marginleft="4px">дате</S.FilterValue>
									<S.FilterIcon src="/polygon 3.svg" alt="" />
								</S.FilterButton>
								{isFilterOpen && <Filter onClose={closeAllModals} />}
							</S.FilterSection>
						</S.ItemsContainer>
					</S.HeaderContainer>
					<S.TableHeader>
						<S.HeaderItem>Описание</S.HeaderItem>
						<S.HeaderItem marginleft="32px">Категория</S.HeaderItem>
						<S.HeaderItem marginleft="32px">Дата</S.HeaderItem>
						<S.HeaderItem marginleft="32px">Сумма</S.HeaderItem>
					</S.TableHeader>
					<S.Divider />
				</S.HeaderWrapper>
				<S.TableContent>
					<S.TableRow>
						<S.RowItem>Пятерочка</S.RowItem>
						<S.RowItem marginleft="32px">Еда</S.RowItem>
						<S.RowItem marginleft="32px">03.07.2024</S.RowItem>
						<S.RowItem marginleft="32px">3 500р</S.RowItem>
						<S.ActionsContainer>
							<S.ActionIcon
								marginright="12px"
								src="/img_edit.svg"
								alt="Редактировать"
							/>
							<S.ActionIcon
								marginright="1px"
								src="/img_del.svg"
								alt="Удалить"
							/>
						</S.ActionsContainer>
					</S.TableRow>
					<S.TableRow>
						<S.RowItem>Яндекс такси</S.RowItem>
						<S.RowItem marginleft="32px">Транспорт</S.RowItem>
						<S.RowItem marginleft="32px">03.07.2024</S.RowItem>
						<S.RowItem marginleft="32px">750р</S.RowItem>
						<S.ActionsContainer>
							<S.ActionIcon
								marginright="12px"
								src="/img_edit.svg"
								alt="Редактировать"
							/>
							<S.ActionIcon
								marginright="1px"
								src="/img_del.svg"
								alt="Удалить"
							/>
						</S.ActionsContainer>
					</S.TableRow>
					<S.TableRow>
						<S.RowItem>Пятерочка</S.RowItem>
						<S.RowItem marginleft="32px">Еда</S.RowItem>
						<S.RowItem marginleft="32px">03.07.2024</S.RowItem>
						<S.RowItem marginleft="32px">3 500р</S.RowItem>
						<S.ActionsContainer>
							<S.ActionIcon
								marginright="12px"
								src="/img_edit.svg"
								alt="Редактировать"
							/>
							<S.ActionIcon
								marginright="1px"
								src="/img_del.svg"
								alt="Удалить"
							/>
						</S.ActionsContainer>
					</S.TableRow>
				</S.TableContent>
			</S.Container>
		</div>
	);
};

export default ExpenseTable;
