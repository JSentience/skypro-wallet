import { useState, useEffect } from 'react';
import * as S from './ExpenseTable.styled';
import { FilterCategory } from './FilterCategory';
import { Filter } from './Filter';
import { getTransactions } from '../../api/expensesApi';

export const ExpenseTable = ({ onEdit }) => {
	const [isCategoryOpen, setIsCategoryOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Загрузка транзакций при монтировании компонента
	useEffect(() => {
		fetchTransactions();
	}, []);

	const fetchTransactions = async () => {
		try {
			setLoading(true);
			const data = await getTransactions();
			setTransactions(data);
			setError(null);
		} catch (err) {
			console.error('Ошибка загрузки транзакций:', err);
			setError('Не удалось загрузить транзакции');
		} finally {
			setLoading(false);
		}
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

	const handleEditClick = (transaction) => {
		onEdit(transaction);
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

	if (loading) {
		return (
			<S.Container>
				<S.LoadingText>Загрузка транзакций...</S.LoadingText>
			</S.Container>
		);
	}

	if (error) {
		return (
			<S.Container>
				<S.ErrorText>{error}</S.ErrorText>
				<S.RetryButton onClick={fetchTransactions}>
					Повторить попытку
				</S.RetryButton>
			</S.Container>
		);
	}

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
					{transactions.length === 0 ? (
						<S.EmptyState>
							<S.EmptyText>Транзакций пока нет</S.EmptyText>
						</S.EmptyState>
					) : (
						transactions.map((transaction) => (
							<S.TableRow key={transaction._id}>
								<S.RowItem>{transaction.description}</S.RowItem>
								<S.RowItem $marginleft="32px">{transaction.category}</S.RowItem>
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
