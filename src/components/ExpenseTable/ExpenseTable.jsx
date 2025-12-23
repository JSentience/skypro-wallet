// noinspection NonAsciiCharacters

import { useCallback, useMemo, useState } from 'react';
import * as S from './ExpenseTable.styled';
import { FilterCategory } from './FilterCategory';
import { Filter } from './Filter';
import { deleteTransaction as deleteTransactionAPI } from '../../api/expensesApi';
import { useTransactions } from '../../hooks/useTransactions';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../../breakpoints';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../Button/Button';

// Маппинг категорий с английских на русские (вынесено наружу для предотвращения пересоздания)
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

export const ExpenseTable = ({
	transactions,
	onEdit,
	filters,
	onFiltersChange,
}) => {
	const { deleteTransaction } = useTransactions();
	const [isCategoryOpen, setIsCategoryOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [deletingId, setDeletingId] = useState(null);
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
	const navigate = useNavigate();
	const handleAddExpenseRoute = () => {
		navigate('/new-expense');
	};
	const toggleCategory = useCallback(() => {
		setIsCategoryOpen((prev) => {
			const newState = !prev;
			if (!newState && isFilterOpen) {
				setIsFilterOpen(false);
			}
			return newState;
		});
	}, [isFilterOpen]);

	const toggleFilter = useCallback(() => {
		setIsFilterOpen((prev) => {
			const newState = !prev;
			if (!newState && isCategoryOpen) {
				setIsCategoryOpen(false);
			}
			return newState;
		});
	}, [isCategoryOpen]);

	const closeAllModals = useCallback(() => {
		setIsCategoryOpen(false);
		setIsFilterOpen(false);
	}, []);

	const handleCategorySelect = useCallback(
		(categoryName) => {
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
		},
		[filters, onFiltersChange],
	);

	const handleSortSelect = useCallback(
		(sortType) => {
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
		},
		[filters, onFiltersChange],
	);

	const handleEditClick = useCallback(
		(transaction) => {
			if (isMobile) {
				// В мобильной версии переходим на страницу редактирования
				navigate('/edit-expense', { state: { expense: transaction } });
			} else {
				// В десктопной версии вызываем функцию редактирования
				onEdit(transaction);
			}
		},
		[isMobile, navigate, onEdit],
	);

	const handleDeleteClick = async (transaction) => {
		try {
			setDeletingId(transaction._id);

			// Вызываем API для удаления
			await deleteTransactionAPI(transaction._id);

			// Обновляем контекст локально без GET запроса
			deleteTransaction(transaction._id);

			// Сбрасываем выбор после удаления
			setSelectedTransaction(null);
		} catch (error) {
			alert('Не удалось удалить транзакцию: ' + error.message);
		} finally {
			setDeletingId(null);
		}
	};

	// Обработка клика по строке в мобильной версии
	const handleRowClick = useCallback(
		(transaction) => {
			if (isMobile) {
				// Если кликнули по уже выбранной строке, снимаем выделение
				if (selectedTransaction?._id === transaction._id) {
					setSelectedTransaction(null);
				} else {
					setSelectedTransaction(transaction);
				}
			}
		},
		[isMobile, selectedTransaction],
	);

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
		return isMobile ? `${formattedAmount} р.` : `${formattedAmount} руб.`;
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

	const displayTransactions = useMemo(
		() => (Array.isArray(transactions) ? transactions : []),
		[transactions],
	);

	return (
		<>
			<S.Container>
				<S.HeaderContainer>
					<S.HeaderWrapper>
						<S.Title>{isMobile ? 'Мои расходы' : 'Таблица расходов'}</S.Title>
						{isMobile && (
							<S.AddExpenseButton onClick={handleAddExpenseRoute}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 14 14"
									fill="none"
								>
									<path
										d="M6.99996 1.16675C3.78579 1.16675 1.16663 3.78591 1.16663 7.00008C1.16663 10.2142 3.78579 12.8334 6.99996 12.8334C10.2141 12.8334 12.8333 10.2142 12.8333 7.00008C12.8333 3.78591 10.2141 1.16675 6.99996 1.16675ZM9.33329 7.43758H7.43746V9.33342C7.43746 9.57258 7.23913 9.77092 6.99996 9.77092C6.76079 9.77092 6.56246 9.57258 6.56246 9.33342V7.43758H4.66663C4.42746 7.43758 4.22913 7.23925 4.22913 7.00008C4.22913 6.76092 4.42746 6.56258 4.66663 6.56258H6.56246V4.66675C6.56246 4.42758 6.76079 4.22925 6.99996 4.22925C7.23913 4.22925 7.43746 4.42758 7.43746 4.66675V6.56258H9.33329C9.57246 6.56258 9.77079 6.76092 9.77079 7.00008C9.77079 7.23925 9.57246 7.43758 9.33329 7.43758Z"
										fill="black"
									/>
								</svg>
								Добавить расход
							</S.AddExpenseButton>
						)}
					</S.HeaderWrapper>

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
						<S.FilterSection
							$marginleft={isMobile ? '16px' : '24px'}
							$marginright={isMobile ? '0px' : '34px'}
						>
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
					<S.HeaderItem>Категория</S.HeaderItem>
					<S.HeaderItem>Дата</S.HeaderItem>
					<S.HeaderItem>Сумма</S.HeaderItem>
				</S.TableHeader>
				<S.Divider />
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
							<S.TableRow
								key={transaction._id}
								onClick={() => handleRowClick(transaction)}
								$isSelected={
									isMobile && selectedTransaction?._id === transaction._id
								}
							>
								<S.RowItem>{transaction.description}</S.RowItem>
								<S.RowItem>{getCategoryName(transaction.category)}</S.RowItem>
								<S.RowItem>{formatDate(transaction.date)}</S.RowItem>
								<S.RowItem>{formatAmount(transaction.sum)}</S.RowItem>
								<S.ActionsContainer>
									<S.ActionIcon
										src="/img_edit.svg"
										alt="Редактировать"
										onClick={() => handleEditClick(transaction)}
									/>
									<S.ActionIcon
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
				{isMobile && selectedTransaction && (
					<S.ButtonWrapper>
						<MainButton onClick={() => handleEditClick(selectedTransaction)}>
							Редактировать расход
						</MainButton>
						<S.DeleteExpenseButton
							onClick={() => handleDeleteClick(selectedTransaction)}
						>
							Удалить расход
						</S.DeleteExpenseButton>
					</S.ButtonWrapper>
				)}
			</S.Container>
		</>
	);
};
