import { useState } from 'react';
import * as S from './ExpenseTable.styled';
import { FilterCategory } from './FilterCategory';
import { Filter } from './Filter';
import { deleteTransaction } from '../../api/expensesApi';

export const ExpenseTable = ({
	transactions,
	onEdit,
	onTransactionUpdate,
	filters,
	onFiltersChange,
}) => {
	const [isCategoryOpen, setIsCategoryOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [deletingId, setDeletingId] = useState(null);

	// Маппинг категорий с английских на русские
	const CATEGORY_NAMES = {
		food: 'Еда',
		transport: 'Транспорт',
		housing: 'Жилье',
		joy: 'Развлечения',
		education: 'Образование',
		others: 'Другое',
	};

	// Обратный маппинг для фильтрации
	const REVERSE_CATEGORY_NAMES = {
		Еда: 'food',
		Транспорт: 'transport',
		Жилье: 'housing',
		Развлечения: 'joy',
		Образование: 'education',
		Другое: 'others',
	};

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

	const handleCategorySelect = (categoryName) => {
		const categoryKey = REVERSE_CATEGORY_NAMES[categoryName];
		let newFilterBy = [];

		if (filters.filterBy && filters.filterBy.includes(categoryKey)) {
			newFilterBy = filters.filterBy.filter((cat) => cat !== categoryKey);
		} else {
			newFilterBy = [...(filters.filterBy || []), categoryKey];
		}

		onFiltersChange({
			...filters,
			filterBy: newFilterBy,
		});
		setIsCategoryOpen(false);
	};

	const handleSortSelect = (sortType) => {
		let newSortBy = null;

		// Маппинг русских названий на английские для API
		const sortMapping = {
			Дате: 'date',
			Сумме: 'sum',
		};

		const sortKey = sortMapping[sortType];

		// Если сортировка уже выбрана - снимаем, иначе устанавливаем
		if (filters.sortBy === sortKey) {
			newSortBy = null;
		} else {
			newSortBy = sortKey;
		}

		onFiltersChange({
			...filters,
			sortBy: newSortBy,
		});
		setIsFilterOpen(false);
	};

	const handleEditClick = (transaction) => {
		onEdit(transaction);
	};

	const handleDeleteClick = async (transaction) => {
		try {
			setDeletingId(transaction._id);
			const updatedTransactions = await deleteTransaction(transaction._id);

			if (onTransactionUpdate) {
				onTransactionUpdate(updatedTransactions);
			}
		} catch (error) {
			alert('Не удалось удалить транзакцию: ' + error.message);
		} finally {
			setDeletingId(null);
		}
	};

	//  Функция для получения русского названия категории
	const getCategoryName = (category) => {
		return CATEGORY_NAMES[category] || category;
	};

	// Функция для форматирования даты
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('ru-RU');
	};

	// Функция для форматирования суммы в формате "2 500 руб."
	const formatAmount = (amount) => {
		// Проверяем, что amount - число
		const numberAmount = typeof amount === 'number' ? amount : Number(amount);

		// Форматируем с пробелами как тысячи и добавляем "руб."
		if (isNaN(numberAmount)) {
			return '0 руб.';
		}

		const formattedAmount = numberAmount.toLocaleString('ru-RU');
		return `${formattedAmount} руб.`;
	};

	// Функция для отображения текста в кнопке фильтра категории
	const getCategoryButtonText = () => {
		if (!filters.filterBy || filters.filterBy.length === 0) {
			return '';
		}

		// Показываем первую выбранную категорию или количество выбранных
		if (filters.filterBy.length === 1) {
			return CATEGORY_NAMES[filters.filterBy[0]] || '';
		} else {
			return `выбрано (${filters.filterBy.length})`;
		}
	};

	// Функция для отображения текста в кнопке сортировки
	const getSortButtonText = () => {
		const sortMapping = {
			date: 'Дате',
			sum: 'Сумме',
		};

		return filters.sortBy ? sortMapping[filters.sortBy] : '';
	};

	// Функция для проверки активной категории в фильтре
	const isCategoryActive = (categoryName) => {
		const categoryKey = REVERSE_CATEGORY_NAMES[categoryName];
		return filters.filterBy && filters.filterBy.includes(categoryKey);
	};

	// Функция для проверки активной сортировки
	const isSortActive = (sortType) => {
		const sortMapping = {
			Дате: 'date',
			Сумме: 'sum',
		};

		return filters.sortBy === sortMapping[sortType];
	};

	const displayTransactions = Array.isArray(transactions) ? transactions : [];

	return (
		<div>
			<S.Container>
				<S.HeaderWrapper>
					<S.HeaderContainer>
						<S.Title>Таблица расходов</S.Title>
						<S.ItemsContainer>
							<S.FilterSection>
								<S.FilterText>Фильтровать по категории</S.FilterText>
								<S.FilterButton onClick={toggleCategory}>
									<S.FilterValue>{getCategoryButtonText()}</S.FilterValue>
									<S.FilterIcon src="/Polygon 3.svg" alt="" />
								</S.FilterButton>
								{isCategoryOpen && (
									<FilterCategory
										onClose={closeAllModals}
										selectedCategories={filters.filterBy || []}
										onCategorySelect={handleCategorySelect}
										isCategoryActive={isCategoryActive}
									/>
								)}
							</S.FilterSection>
							<S.FilterSection $marginleft="24px" $marginright="34px">
								<S.FilterText>Сортировать по</S.FilterText>
								<S.FilterButton onClick={toggleFilter}>
									<S.FilterValue $marginleft="4px">
										{getSortButtonText()}
									</S.FilterValue>
									<S.FilterIcon src="/Polygon 3.svg" alt="" />
								</S.FilterButton>
								{isFilterOpen && (
									<Filter
										onClose={closeAllModals}
										selectedSort={filters.sortBy}
										onSortSelect={handleSortSelect}
										isSortActive={isSortActive}
									/>
								)}
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
					{displayTransactions.length === 0 ? (
						<S.EmptyState>
							<S.EmptyText>
								{transactions.length === 0
									? 'Транзакций пока нет'
									: 'Нет транзакций по выбранному фильтру'}
							</S.EmptyText>
						</S.EmptyState>
					) : (
						displayTransactions.map((transaction) => (
							<S.TableRow key={transaction._id}>
								<S.RowItem>{transaction.description}</S.RowItem>
								<S.RowItem $marginleft="32px">
									{getCategoryName(transaction.category)}
								</S.RowItem>
								<S.RowItem $marginleft="32px">
									{formatDate(transaction.date)}
								</S.RowItem>
								<S.RowItem $marginleft="32px">
									{formatAmount(transaction.sum)}
								</S.RowItem>
								<S.ActionsContainer>
									<S.ActionIcon
										$marginright="12px"
										src="/img_edit.svg"
										alt="Редактировать"
										onClick={() => handleEditClick(transaction)}
									/>
									<S.ActionIcon
										$marginright="1px"
										src="/img_del.svg"
										alt="Удалить"
										onClick={() => handleDeleteClick(transaction)}
										disabled={deletingId === transaction._id}
									/>
								</S.ActionsContainer>
							</S.TableRow>
						))
					)}
				</S.TableContent>
			</S.Container>
		</div>
	);
};

export default ExpenseTable;
