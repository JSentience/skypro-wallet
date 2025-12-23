import { useCallback, useEffect, useMemo, useState } from 'react';
import { ExpenseTable } from '../ExpenseTable/ExpenseTable';
import { NewExpense } from '../NewExpense/NewExpense';
import { getTransactions } from '../../api/expensesApi';
import { useTransactions } from '../../hooks/useTransactions';
import * as S from './ExpensesLayout.styled';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../../breakpoints';

export const ExpensesLayout = () => {
	const {
		transactions,
		setAllTransactions,
		setLoading,
		setError,
		loading,
		error,
	} = useTransactions();

	const [isEditing, setIsEditing] = useState(false);
	const [editingExpense, setEditingExpense] = useState(null);
	const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });

	// Состояния для фильтров
	const [filters, setFilters] = useState({
		sortBy: null,
		filterBy: [],
	});

	// Мемоизация параметров для API
	const apiFilters = useMemo(() => {
		const result = {};
		if (filters.sortBy) {
			result.sortBy = filters.sortBy;
		}
		if (filters.filterBy && filters.filterBy.length > 0) {
			result.filterBy = filters.filterBy;
		}
		return result;
	}, [filters.sortBy, filters.filterBy]);

	// Используем useCallback для стабильной ссылки на функцию
	const fetchTransactions = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const data = await getTransactions(apiFilters);
			setAllTransactions(data);
		} catch {
			setError('Не удалось загрузить транзакции');
			setAllTransactions([]);
		} finally {
			setLoading(false);
		}
	}, [apiFilters, setAllTransactions, setLoading, setError]);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	const handleEdit = useCallback((expense) => {
		setIsEditing(true);
		setEditingExpense(expense);
	}, []);

	const handleSave = useCallback(() => {
		// Больше не нужен GET запрос - контекст уже обновлен
		setIsEditing(false);
		setEditingExpense(null);
	}, []);

	const handleFiltersChange = useCallback((newFilters) => {
		setFilters(newFilters);
	}, []);

	if (loading) {
		return (
			<>
				<S.PageTitle>Мои расходы</S.PageTitle>
				<S.LoadingText>Загрузка транзакций...</S.LoadingText>
			</>
		);
	}

	if (error) {
		return (
			<>
				<S.PageTitle>Мои расходы</S.PageTitle>
				<S.ErrorText>{error}</S.ErrorText>
			</>
		);
	}

	return (
		<>
			<S.ExpensesWrapper>
				{isMobile ? '' : <S.PageTitle>Мои расходы</S.PageTitle>}

				{isMobile ? (
					// Мобильная версия: только таблица
					<ExpenseTable
						transactions={transactions}
						onEdit={handleEdit}
						filters={filters}
						onFiltersChange={handleFiltersChange}
					/>
				) : (
					// Десктопная версия: таблица + форма
					<S.MainContent>
						<ExpenseTable
							transactions={transactions}
							onEdit={handleEdit}
							filters={filters}
							onFiltersChange={handleFiltersChange}
						/>
						<NewExpense
							isEditing={isEditing}
							editingExpense={editingExpense}
							onSave={handleSave}
						/>
					</S.MainContent>
				)}
			</S.ExpensesWrapper>
		</>
	);
};
