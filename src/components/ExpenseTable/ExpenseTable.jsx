import { useState } from 'react';
import * as S from './ExpenseTable.styled';
import { FilterCategory } from './FilterCategory';
import { Filter } from './Filter';
import { deleteTransaction } from '../../api/expensesApi';

export const ExpenseTable = ({ transactions, onEdit, onTransactionUpdate }) => {
	const [isCategoryOpen, setIsCategoryOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [deletingId, setDeletingId] = useState(null);

	// Состояния для фильтров
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedSort, setSelectedSort] = useState(null);

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
		// Если нажали на уже выбранную категорию - снимаем выбор
		if (selectedCategory === categoryName) {
			setSelectedCategory(null);
		} else {
			setSelectedCategory(categoryName);
		}
		setIsCategoryOpen(false);
	};

	const handleSortSelect = (sortType) => {
		// Если нажали на уже выбранную сортировку - снимаем выбор
		if (selectedSort === sortType) {
			setSelectedSort(null);
		} else {
			setSelectedSort(sortType);
		}
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
			console.error('Ошибка при удалении:', error);
			alert('Не удалось удалить транзакцию: ' + error.message);
		} finally {
			setDeletingId(null);
		}
	};

	// Функция для получения русского названия категории
	const getCategoryName = (category) => {
		return CATEGORY_NAMES[category] || category;
	};

	// Функция для форматирования даты
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('ru-RU');
	};

	// Функция для форматирования суммы
	const formatAmount = (amount) => {
		return `${amount} руб.`;
	};

	// Функция для отображения текста в кнопке фильтра категории
	const getCategoryButtonText = () => {
		return selectedCategory || '';
	};

	// Функция для отображения текста в кнопке сортировки
	const getSortButtonText = () => {
		return selectedSort || '';
	};

	// Фильтрация и сортировка транзакций
	const filteredAndSortedTransactions = () => {
		let result = Array.isArray(transactions) ? [...transactions] : [];

		// Фильтрация по категории (только если категория выбрана)
		if (selectedCategory) {
			const categoryKey = REVERSE_CATEGORY_NAMES[selectedCategory];
			result = result.filter(
				(transaction) => transaction.category === categoryKey,
			);
		}

		// Сортировка (только если сортировка выбрана)
		if (selectedSort === 'Дате') {
			result.sort((a, b) => new Date(b.date) - new Date(a.date)); // от новых к старым
		} else if (selectedSort === 'Сумме') {
			result.sort((a, b) => b.sum - a.sum); // от больших к маленьким
		}

		return result;
	};

	const displayTransactions = filteredAndSortedTransactions();

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
									<S.FilterValue>{getCategoryButtonText()}</S.FilterValue>
									<S.FilterIcon src="/Polygon 3.svg" alt="" />
								</S.FilterButton>
								{isCategoryOpen && (
									<FilterCategory
										onClose={closeAllModals}
										selectedCategory={selectedCategory}
										onCategorySelect={handleCategorySelect}
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
										selectedSort={selectedSort}
										onSortSelect={handleSortSelect}
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
